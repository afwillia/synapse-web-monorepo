import { GridReplica } from '@sage-bionetworks/synapse-client'
import { CellEditInfo, GridModel, GridModelSnapshot } from '../DataGridTypes'

/**
 * Scans every cell in the model and returns a map of cell keys
 * ("rowIndex:columnName") to CellEditInfo, classifying the writer into one of
 * four categories:
 *   - 'own-human'  — the current user's own human replica (sid === ownReplicaId)
 *   - 'own-bot'    — a bot replica owned by the current user
 *   - 'other-human' — a human replica from another user
 *   - 'other-bot'  — a bot replica from another user
 *
 * Cells with an unrecognized SID (e.g. system-initialized cells) are skipped.
 * This relies on applyModelChange only writing cells whose value actually
 * changed, so that the SID accurately reflects which cell was last edited.
 */
export function computeCellEditMap(
  model: GridModel,
  modelSnapshot: GridModelSnapshot,
  replicaMetadata: Map<string, GridReplica>,
  ownReplicaId: number | null,
  currentUserId: string | undefined,
): Map<string, CellEditInfo> {
  const result = new Map<string, CellEditInfo>()
  const { columnNames, rows } = modelSnapshot

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let colIndex = 0; colIndex < columnNames.length; colIndex++) {
      try {
        const sid = model.api
          .vec(['rows', String(rowIndex), 'data'])
          ?.node.val(colIndex)?.sid
        if (sid === undefined) continue

        let writerType: CellEditInfo['writerType'] | null = null

        if (sid === ownReplicaId) {
          writerType = 'own-human'
        } else {
          const meta = replicaMetadata.get(String(sid))
          if (meta !== undefined) {
            if (meta.isAgentReplica) {
              writerType =
                meta.createdBy === currentUserId ? 'own-bot' : 'other-bot'
            } else {
              writerType = 'other-human'
            }
          }
        }

        if (writerType !== null) {
          result.set(`${rowIndex}:${columnNames[colIndex]}`, {
            writerType,
            sid,
          })
        }
      } catch {
        // Cell path not found — skip
      }
    }
  }

  return result
}
