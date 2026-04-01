import { useEffect, useRef, useState } from 'react'
import {
  DelOp,
  InsArrOp,
  InsVecOp,
  type Patch,
} from 'json-joy/lib/json-crdt-patch'
import { GridReplica } from '@sage-bionetworks/synapse-client'
import { CellEditInfo, GridModel } from '../DataGridTypes'
import { computeCellEditMap } from '../utils/computeCellEditMap'

function nodeKey(id: { sid: number; time: number }): string {
  return `${id.sid}_${id.time}`
}

/**
 * Builds a map from the stable node ID of each row's `data` Vec to that row's
 * current index. Used to resolve InsVecOp.obj back to a row index without
 * scanning the full grid. O(rows).
 */
function buildDataVecNodeIdMap(
  model: GridModel,
  rowCount: number,
): Map<string, number> {
  const map = new Map<string, number>()
  for (let i = 0; i < rowCount; i++) {
    const vecNode = model.api.vec(['rows', String(i), 'data'])?.node
    if (vecNode) {
      map.set(nodeKey(vecNode.id), i)
    }
  }
  return map
}

/**
 * Maintains a map of cell keys ("rowIndex:columnName") to CellEditInfo,
 * updated incrementally via json-joy patch events rather than scanning all
 * cells on every snapshot change.
 *
 * Subscribes to model.api.onFlush (local edits) and model.api.onPatch
 * (remote edits) and processes only the InsVecOp operations that correspond
 * to cell writes. Falls back to a full rebuild when:
 *  - The initial sync completes (bootstrapping from existing CRDT state)
 *  - Classification parameters change (replica metadata, own identity)
 *  - A structural change to the rows array is detected (row insert/delete)
 */
export function useCellEditMap(
  model: GridModel | null,
  replicaMetadata: Map<string, GridReplica>,
  ownReplicaId: number | null,
  currentUserId: string | undefined,
  hasCompletedInitialSync: boolean,
): Map<string, CellEditInfo> {
  const [cellEditMap, setCellEditMap] = useState<Map<string, CellEditInfo>>(
    new Map(),
  )
  const mapRef = useRef<Map<string, CellEditInfo>>(new Map())

  // Refs so the patch listener always uses the latest classification params
  // without needing to re-subscribe on every change.
  const replicaMetadataRef = useRef(replicaMetadata)
  replicaMetadataRef.current = replicaMetadata
  const ownReplicaIdRef = useRef(ownReplicaId)
  ownReplicaIdRef.current = ownReplicaId
  const currentUserIdRef = useRef(currentUserId)
  currentUserIdRef.current = currentUserId

  // Full rebuild on initial sync or when classification params change.
  useEffect(() => {
    if (!hasCompletedInitialSync || !model) {
      if (!hasCompletedInitialSync) {
        const empty = new Map<string, CellEditInfo>()
        mapRef.current = empty
        setCellEditMap(empty)
      }
      return
    }

    const snapshot = model.api.getSnapshot()
    const newMap = computeCellEditMap(
      model,
      snapshot,
      replicaMetadata,
      ownReplicaId,
      currentUserId,
    )
    mapRef.current = newMap
    setCellEditMap(newMap)
  }, [
    hasCompletedInitialSync,
    model,
    replicaMetadata,
    ownReplicaId,
    currentUserId,
  ])

  // Incremental updates via patch events — re-subscribes only when model changes.
  useEffect(() => {
    if (!model) return

    const processPatch = (patch: Patch) => {
      // SET_SELECTION and other non-data patches contain no InsVecOp/InsArrOp/DelOp.
      // Short-circuit before the expensive getSnapshot() + buildDataVecNodeIdMap calls.
      const hasRelevantOps = patch.ops.some(
        op =>
          op instanceof InsVecOp ||
          op instanceof InsArrOp ||
          op instanceof DelOp,
      )
      if (!hasRelevantOps) return

      const snapshot = model.api.getSnapshot()
      const { columnNames, rows } = snapshot

      // Detect structural changes to the rows array (row insert / delete).
      // When row indices shift, a full rebuild is cheaper and simpler than
      // trying to remap all existing keys.
      const rowsNode = model.api.arr(['rows'])?.node
      const rowsNodeKey = rowsNode ? nodeKey(rowsNode.id) : null

      const hasStructuralChange =
        rowsNodeKey !== null &&
        patch.ops.some(
          op =>
            (op instanceof InsArrOp || op instanceof DelOp) &&
            nodeKey(op.obj) === rowsNodeKey,
        )

      if (hasStructuralChange) {
        const newMap = computeCellEditMap(
          model,
          snapshot,
          replicaMetadataRef.current,
          ownReplicaIdRef.current,
          currentUserIdRef.current,
        )
        mapRef.current = newMap
        setCellEditMap(newMap)
        return
      }

      // Incremental path: build nodeId → rowIndex once for this patch,
      // then update only the cells touched by InsVecOp operations.
      const dataVecNodeIdMap = buildDataVecNodeIdMap(model, rows.length)
      let updatedMap: Map<string, CellEditInfo> | null = null

      for (const op of patch.ops) {
        if (!(op instanceof InsVecOp)) continue

        const rowIndex = dataVecNodeIdMap.get(nodeKey(op.obj))
        if (rowIndex === undefined) continue // not a row data vec

        const writerSid = op.id.sid
        const replicaMeta = replicaMetadataRef.current.get(String(writerSid))
        const ownId = ownReplicaIdRef.current
        const userId = currentUserIdRef.current

        let writerType: CellEditInfo['writerType'] | null = null
        if (writerSid === ownId) {
          writerType = 'own-human'
        } else if (replicaMeta !== undefined) {
          if (replicaMeta.isAgentReplica) {
            writerType =
              replicaMeta.createdBy === userId ? 'own-bot' : 'other-bot'
          } else {
            writerType = 'other-human'
          }
        }

        if (writerType === null) continue

        for (const [colIndex] of op.data) {
          const colName = columnNames[colIndex]
          if (colName === undefined) continue
          const key = `${rowIndex}:${colName}`
          // Copy-on-first-write so we never mutate the map React is rendering.
          if (!updatedMap) updatedMap = new Map(mapRef.current)
          updatedMap.set(key, { writerType, sid: writerSid })
        }
      }

      if (updatedMap) {
        mapRef.current = updatedMap
        setCellEditMap(updatedMap)
      }
    }

    const unsubFlush = model.api.onFlush.listen(processPatch)

    const processPatchRemote = (patch: Patch) => {
      const ownId = ownReplicaIdRef.current
      if (ownId !== null && patch.ops.every(op => op.id.sid === ownId)) return
      processPatch(patch)
    }

    const unsubPatch = model.api.onPatch.listen(processPatchRemote)
    return () => {
      unsubFlush()
      unsubPatch()
    }
  }, [model])

  return cellEditMap
}
