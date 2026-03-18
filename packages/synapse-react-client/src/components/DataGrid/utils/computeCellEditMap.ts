import { GridReplica } from '@sage-bionetworks/synapse-client'
import { GridModel, GridModelSnapshot } from '../DataGridTypes'

/**
 * Scans every cell in the model and returns a map of cell keys
 * ("rowIndex:columnName") to the writer type ('human' | 'bot').
 *
 * A cell is decorated when its last writer is:
 *   - The local user's own replica (ownReplicaId) → 'human'
 *   - A remote replica in replicaMetadata with isAgentReplica → 'bot'
 *   - A remote replica in replicaMetadata without isAgentReplica → 'human'
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
): Map<string, 'human' | 'bot'> {
  const result = new Map<string, 'human' | 'bot'>()
  const { columnNames, rows } = modelSnapshot

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    for (let colIndex = 0; colIndex < columnNames.length; colIndex++) {
      try {
        const sid = model.api
          .vec(['rows', String(rowIndex), 'data'])
          ?.node.val(colIndex)?.sid
        if (sid === undefined) continue

        let writerType: 'human' | 'bot' | null = null

        if (sid === ownReplicaId) {
          writerType = 'human'
        } else {
          const meta = replicaMetadata.get(String(sid))
          if (meta !== undefined) {
            writerType = meta.isAgentReplica ? 'bot' : 'human'
          }
        }

        if (writerType !== null) {
          result.set(`${rowIndex}:${columnNames[colIndex]}`, writerType)
        }
      } catch {
        // Cell path not found — skip
      }
    }
  }

  return result
}
