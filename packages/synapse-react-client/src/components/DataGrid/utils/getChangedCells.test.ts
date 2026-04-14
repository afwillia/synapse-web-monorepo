import { describe, it, expect } from 'vitest'
import { Model } from 'json-joy/lib/json-crdt'
import { s } from 'json-joy/lib/json-crdt-patch'
import { getChangedCells } from './getChangedCells'
import createTestModel from './createTestModel'
import type { ReplicaUserInfo } from '../hooks/useGridReplicaUsers'
import type { GridModel } from '../DataGridTypes'

// createTestModel structure note:
// - columnNames vec starts with a schema-default '' at index 0, then 'c0'..'c{n-1}'
//   pushed at indices 1..n. columnOrder pushes values [0,1,..,n-1], so
//   displayColIndex 0 → crdtDataIndex 0 → colName '' → skipped by getChangedCells.
//   The first visible column is at displayColIndex 1 (crdtDataIndex 1, name 'c0').
// - Each row's data vec is created fresh with [r{i}c0, r{i}c1, ...] at indices 0..n-1,
//   so data[crdtDataIndex] gives the expected value.

function makeReplicaUserInfo(
  replicaId: number,
  category: ReplicaUserInfo['category'] = 'other-user',
): ReplicaUserInfo {
  return {
    replicaInfo: {
      replicaId,
      replicaType: 'USER',
      createdBy: `user-${replicaId}`,
    } as ReplicaUserInfo['replicaInfo'],
    category,
    profile: {
      userName: `user${replicaId}`,
      displayName: `User ${replicaId}`,
    } as ReplicaUserInfo['profile'],
  }
}

describe('getChangedCells', () => {
  it('returns an empty array when replicaUserMap is empty', () => {
    const model = createTestModel(2, 3, 1)
    const snapshot = model.api.getSnapshot()
    const result = getChangedCells(model, snapshot, new Map())
    expect(result).toHaveLength(0)
  })

  it('returns entries only for named columns (schema-default empty column is excluded)', () => {
    const sid = 42
    // nCols=3 → columnOrder=[0,1,2] → 1 skipped (colName ''), 2 named ('c0','c1')
    const model = createTestModel(2, 3, sid)
    const snapshot = model.api.getSnapshot()
    const replicaUserMap = new Map([[sid, makeReplicaUserInfo(sid)]])

    const result = getChangedCells(model, snapshot, replicaUserMap)
    // 2 rows × 2 named columns = 4 entries
    expect(result).toHaveLength(4)
    // all entries should have a non-empty colName
    expect(result.every(e => e.colName !== '')).toBe(true)
  })

  it('excludes cells whose sid is not in replicaUserMap (e.g. SERVICE)', () => {
    const sid = 99
    const model = createTestModel(1, 2, sid)
    const snapshot = model.api.getSnapshot()
    const result = getChangedCells(model, snapshot, new Map())
    expect(result).toHaveLength(0)
  })

  it('returns correct rowIndex, displayColIndex, colName, and value per entry', () => {
    const sid = 10
    // nCols=3 → named cols: displayColIndex=1 ('c0', crdtDataIndex=1) and
    //                        displayColIndex=2 ('c1', crdtDataIndex=2)
    const model = createTestModel(1, 3, sid)
    const snapshot = model.api.getSnapshot()
    const replicaUserMap = new Map([[sid, makeReplicaUserInfo(sid)]])

    const result = getChangedCells(model, snapshot, replicaUserMap)
    expect(result).toHaveLength(2)

    const first = result.find(e => e.displayColIndex === 1)
    const second = result.find(e => e.displayColIndex === 2)

    // crdtDataIndex=1 → data[1] = 'r0c1', colName = 'c0'
    expect(first).toMatchObject({
      rowIndex: 0,
      displayColIndex: 1,
      colName: 'c0',
      value: 'r0c1',
      authorSid: sid,
    })
    // crdtDataIndex=2 → data[2] = 'r0c2', colName = 'c1'
    expect(second).toMatchObject({
      rowIndex: 0,
      displayColIndex: 2,
      colName: 'c1',
      value: 'r0c2',
      authorSid: sid,
    })
  })

  it('attributes cells to the correct replica after a peer overwrites one', () => {
    const originalSid = 10
    const peerSid = 20
    // nCols=3 → named columns at crdtDataIndex=1 ('c0') and crdtDataIndex=2 ('c1')
    const model = createTestModel(1, 3, originalSid)

    // Peer overwrites crdtDataIndex=1 (column 'c0')
    const peer = (model as unknown as Model).fork(
      peerSid,
    ) as unknown as GridModel
    peer.api.vec(['rows', '0', 'data']).set([[1, s.con('peer-value')]])
    const patch = peer.api.flush()
    ;(model as unknown as Model).applyPatch(patch)

    const snapshot = model.api.getSnapshot()
    const replicaUserMap = new Map([
      [originalSid, makeReplicaUserInfo(originalSid, 'self')],
      [peerSid, makeReplicaUserInfo(peerSid, 'other-user')],
    ])

    const result = getChangedCells(model, snapshot, replicaUserMap)
    expect(result).toHaveLength(2)

    const peerEntry = result.find(e => e.displayColIndex === 1)
    const selfEntry = result.find(e => e.displayColIndex === 2)

    expect(peerEntry?.authorSid).toBe(peerSid)
    expect(peerEntry?.replicaUserInfo.category).toBe('other-user')
    expect(peerEntry?.value).toBe('peer-value')

    expect(selfEntry?.authorSid).toBe(originalSid)
    expect(selfEntry?.replicaUserInfo.category).toBe('self')
  })

  it('orders results row-major (all named cols of row 0, then row 1, etc.)', () => {
    const sid = 5
    // nCols=3 → 2 named columns at displayColIndex 1 and 2
    const model = createTestModel(2, 3, sid)
    const snapshot = model.api.getSnapshot()
    const replicaUserMap = new Map([[sid, makeReplicaUserInfo(sid)]])

    const result = getChangedCells(model, snapshot, replicaUserMap)
    const indices = result.map(e => [e.rowIndex, e.displayColIndex])
    expect(indices).toEqual([
      [0, 1],
      [0, 2],
      [1, 1],
      [1, 2],
    ])
  })
})
