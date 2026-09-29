import { GridModel, gridSchema } from '@/components/DataGrid/DataGridTypes'
import { Model } from 'json-joy/lib/json-crdt'
import { s } from 'json-joy/lib/json-crdt-patch'
import { writeColumnOrder } from './writeColumnOrder'

function createModelWithColumnOrder(columnOrder: number[]): GridModel {
  const model = Model.create(gridSchema)
  model.api.arr(['columnOrder']).ins(
    0,
    columnOrder.map(index => s.con(index)),
  )
  // Discard the setup patch so assertions only see what writeColumnOrder did
  model.api.flush()
  return model
}

function getColumnOrder(model: GridModel) {
  return model.api.getSnapshot().columnOrder
}

/** The CRDT identity of each entry, which survives only if the entry is left in place. */
function getEntryIds(model: GridModel) {
  const entryIds: string[] = []
  for (const chunk of model.api.arr(['columnOrder']).node.chunks()) {
    if (chunk.del) continue
    for (let offset = 0; offset < chunk.span; offset++) {
      entryIds.push(`${chunk.id.sid}.${chunk.id.time + offset}`)
    }
  }
  return entryIds
}

function permutations<T>(items: T[]): T[][] {
  if (items.length <= 1) return [items]
  return items.flatMap((item, i) =>
    permutations([...items.slice(0, i), ...items.slice(i + 1)]).map(rest => [
      item,
      ...rest,
    ]),
  )
}

describe('writeColumnOrder', () => {
  it.each(permutations([0, 1, 2, 3]))(
    'writes the order %j',
    (...targetOrder: number[]) => {
      const model = createModelWithColumnOrder([0, 1, 2, 3])

      writeColumnOrder(model, targetOrder)

      expect(getColumnOrder(model)).toEqual(targetOrder)
    },
  )

  it('writes an order onto an empty columnOrder', () => {
    const model = createModelWithColumnOrder([])

    writeColumnOrder(model, [0, 1])

    expect(getColumnOrder(model)).toEqual([0, 1])
  })

  it('removes entries left out of the new order', () => {
    const model = createModelWithColumnOrder([0, 1, 2, 3])

    writeColumnOrder(model, [3, 1])

    expect(getColumnOrder(model)).toEqual([3, 1])
  })

  it('collapses entries duplicated by an earlier concurrent reorder', () => {
    const model = createModelWithColumnOrder([1, 0, 1, 0])

    writeColumnOrder(model, [0, 1])

    expect(getColumnOrder(model)).toEqual([0, 1])
  })

  describe('minimality', () => {
    it('emits no operations when the order is unchanged', () => {
      const model = createModelWithColumnOrder([0, 1, 2, 3])

      writeColumnOrder(model, [0, 1, 2, 3])

      expect(model.api.flush().ops).toEqual([])
    })

    it('leaves the entries that did not move untouched', () => {
      const model = createModelWithColumnOrder([0, 1, 2, 3])
      const idsBeforeWrite = getEntryIds(model)

      // Only the last column moves, to the front
      writeColumnOrder(model, [3, 0, 1, 2])

      // Entries 0, 1 and 2 keep their CRDT identity; only the moved one is rewritten
      expect(getEntryIds(model).slice(1)).toEqual(idsBeforeWrite.slice(0, 3))
    })
  })

  describe('when two replicas reorder at the same time', () => {
    it('converges without duplicating or losing a column', () => {
      const base = createModelWithColumnOrder([0, 1, 2, 3])
      const replicaA = base.fork(2)
      const replicaB = base.fork(3)

      writeColumnOrder(replicaA, [1, 0, 2, 3])
      writeColumnOrder(replicaB, [0, 1, 3, 2])
      const patchFromA = replicaA.api.flush()
      const patchFromB = replicaB.api.flush()
      replicaA.applyBatch([patchFromB])
      replicaB.applyBatch([patchFromA])

      expect(getColumnOrder(replicaA)).toEqual(getColumnOrder(replicaB))
      expect([...getColumnOrder(replicaA)].sort()).toEqual([0, 1, 2, 3])
    })
  })
})
