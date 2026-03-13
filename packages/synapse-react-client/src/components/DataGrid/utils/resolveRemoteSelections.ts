import { ArrApi } from 'json-joy'
import {
  CrdtId,
  GridModel,
  GridModelSnapshot,
  ReplicaSelectionModel,
} from '../DataGridTypes'
import { GridReplica } from '@sage-bionetworks/synapse-client'
import { getUserPaletteIndex } from './getUserPaletteIndex'

export type RemotePresenceInfo = {
  replicaId: string
  createdBy: string | undefined
  isHuman: boolean
  paletteIndex: number // 0–7, deterministic based on replicaId
  rowIndices: number[]
  colIndices: number[]
  rowSelectAll: boolean
  columnSelectAll: boolean
}

function buildCrdtIdIndexMap(arr: ArrApi, length: number): Map<string, number> {
  const map = new Map<string, number>()
  for (let i = 0; i < length; i++) {
    const findChunkResult = arr.node.findChunk(i)
    if (findChunkResult) {
      const [chunk, offset] = findChunkResult
      map.set(`${chunk.id.sid}:${chunk.id.time + offset}`, i)
    }
  }
  return map
}

function resolveIds(
  crdtIds: CrdtId[] | undefined,
  indexMap: Map<string, number>,
): number[] {
  if (!crdtIds) return []
  const indices: number[] = []
  for (const id of crdtIds) {
    const index = indexMap.get(`${id.rep}:${id.seq}`)
    if (index !== undefined) {
      indices.push(index)
    }
  }
  return indices
}

/**
 * Inverse of computeReplicaSelectionModel. Given a model and snapshot, resolve
 * all remote replicas' CrdtId-based selections to concrete row/column indices.
 *
 * @param replicaMetadata - Map of replicaId string → GridReplica fetched from
 *   the REST API. Replicas absent from the map (metadata still loading) are
 *   treated as human until their data arrives.
 */
export function resolveRemoteSelections(
  model: GridModel,
  modelSnapshot: GridModelSnapshot,
  ownReplicaId: number,
  replicaMetadata: Map<string, GridReplica>,
): RemotePresenceInfo[] {
  const result: RemotePresenceInfo[] = []
  // json-joy returns undefined for an empty s.obj before any keys are set
  const selection =
    (modelSnapshot.selection as Record<string, ReplicaSelectionModel>) ?? {}

  const rowsArr = model.api.arr(['rows'])
  const columnOrderArr = model.api.arr(['columnOrder'])

  const rowCount = (modelSnapshot.rows as unknown[]).length
  const colCount = (modelSnapshot.columnOrder as unknown[]).length

  const rowIndexMap = buildCrdtIdIndexMap(rowsArr, rowCount)
  const colIndexMap = buildCrdtIdIndexMap(columnOrderArr, colCount)

  for (const [replicaIdStr, selectionModel] of Object.entries(selection)) {
    if (replicaIdStr === ownReplicaId.toString()) continue
    if (!selectionModel) continue

    const metadata = replicaMetadata.get(replicaIdStr)
    // isAgentReplica === true means bot; default to human while metadata loads
    const isHuman = !(metadata?.isAgentReplica ?? false)

    // Color is assigned per user (createdBy), so the same user's human and bot
    // replicas share a color. Slots 0–3 only.
    const paletteIndex = getUserPaletteIndex(metadata?.createdBy)

    const rowSelectAll = selectionModel.rowSelectAll ?? false
    const columnSelectAll = selectionModel.columnSelectAll ?? false

    const rowIndices = rowSelectAll
      ? Array.from({ length: rowCount }, (_, i) => i)
      : resolveIds(selectionModel.rowSelection, rowIndexMap)

    const colIndices = columnSelectAll
      ? Array.from({ length: colCount }, (_, i) => i)
      : resolveIds(selectionModel.columnSelection, colIndexMap)

    result.push({
      replicaId: replicaIdStr,
      createdBy: metadata?.createdBy,
      isHuman,
      paletteIndex,
      rowIndices,
      colIndices,
      rowSelectAll,
      columnSelectAll,
    })
  }

  return result
}
