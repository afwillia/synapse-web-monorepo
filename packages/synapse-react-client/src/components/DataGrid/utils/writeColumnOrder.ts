import { GridModel } from '@/components/DataGrid/DataGridTypes'
import { s } from 'json-joy/lib/json-crdt-patch'

/**
 * Rewrites the model's `columnOrder` to `newColumnOrder`, touching only the entries that move.
 *
 * `columnOrder` is a CRDT sequence shared with every other replica, so replacing it wholesale turns a
 * single-column move into "delete every entry, insert every entry". Two replicas reordering at the
 * same time then merge into a list holding both sets of insertions, duplicating every column, and
 * every column selection stored as a CRDT element id is invalidated. Editing in place keeps a
 * replica's patch limited to what it actually changed, so concurrent reorders only collide over
 * columns they both moved, and an unchanged order produces no patch at all.
 *
 * Entries that are unwanted or repeated are dropped on the way, so a list that already merged badly
 * heals the next time anyone saves.
 */
export function writeColumnOrder(model: GridModel, newColumnOrder: number[]) {
  const columnOrderArr = model.api.arr(['columnOrder'])
  if (!columnOrderArr) {
    return
  }

  const targetOrder = Array.from(new Set(newColumnOrder))
  const targetPositions = new Map(
    targetOrder.map((index, position) => [index, position]),
  )
  // Mirrors the CRDT array as edits are applied, so positions stay correct without re-reading it
  const workingOrder: number[] = [...model.api.getSnapshot().columnOrder]

  const deleteEntryAt = (position: number) => {
    columnOrderArr.del(position, 1)
    workingOrder.splice(position, 1)
  }

  // Drop entries the new order doesn't want, along with any repeat of one kept earlier in the list
  for (let position = workingOrder.length - 1; position >= 0; position--) {
    const index = workingOrder[position]
    if (
      !targetPositions.has(index) ||
      workingOrder.indexOf(index) !== position
    ) {
      deleteEntryAt(position)
    }
  }

  // Of what remains, the longest run already in the target's relative order can stay where it is;
  // every other entry has to be deleted and re-inserted where it belongs.
  const entriesToKeep = new Set(
    longestRunInTargetOrder(workingOrder, targetPositions),
  )
  for (let position = workingOrder.length - 1; position >= 0; position--) {
    if (!entriesToKeep.has(workingOrder[position])) {
      deleteEntryAt(position)
    }
  }

  targetOrder.forEach((index, position) => {
    if (workingOrder[position] !== index) {
      columnOrderArr.ins(position, [s.con(index)])
      workingOrder.splice(position, 0, index)
    }
  })
}

/**
 * Returns the longest subsequence of `indices` that is already ordered according to
 * `targetPositions` -- the entries that can stay where they are.
 */
function longestRunInTargetOrder(
  indices: number[],
  targetPositions: Map<number, number>,
): number[] {
  // Quadratic, but a grid has tens of columns and this keeps the intent legible
  let longestRun: number[] = []
  const runsEndingAtIndex: number[][] = []

  indices.forEach((index, i) => {
    let longestPrecedingRun: number[] = []
    for (let j = 0; j < i; j++) {
      if (
        targetPositions.get(indices[j])! < targetPositions.get(index)! &&
        runsEndingAtIndex[j].length > longestPrecedingRun.length
      ) {
        longestPrecedingRun = runsEndingAtIndex[j]
      }
    }
    runsEndingAtIndex[i] = [...longestPrecedingRun, index]
    if (runsEndingAtIndex[i].length > longestRun.length) {
      longestRun = runsEndingAtIndex[i]
    }
  })

  return longestRun
}
