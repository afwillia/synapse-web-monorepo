import type { GridModel, GridModelSnapshot } from '../DataGridTypes'
import type { ReplicaUserInfo } from '../hooks/useGridReplicaUsers'

export interface ChangedCell {
  /** 0-based row index in the current model */
  rowIndex: number
  /** 0-based column index in display order (for use with setActiveCell) */
  displayColIndex: number
  /** Human-readable column name */
  colName: string
  /** Current cell value from the model snapshot */
  value: unknown
  authorSid: number
  /** Logical clock time of the last write — higher means more recent */
  authorTime: number
  replicaUserInfo: ReplicaUserInfo
}

/**
 * Returns all cells in the model whose last-write sid is present in
 * replicaUserMap (SERVICE replicas are absent from the map and are
 * therefore excluded automatically).
 *
 * Results are ordered row-major, column in display order.
 */
export function getChangedCells(
  model: GridModel,
  modelSnapshot: GridModelSnapshot,
  replicaUserMap: ReadonlyMap<number, ReplicaUserInfo>,
): ChangedCell[] {
  if (replicaUserMap.size === 0) return []

  const { columnNames, columnOrder, rows } = modelSnapshot
  const results: ChangedCell[] = []

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const rowData = rows[rowIndex]?.data
    if (!rowData) continue

    for (
      let displayColIndex = 0;
      displayColIndex < columnOrder.length;
      displayColIndex++
    ) {
      const crdtDataIndex = columnOrder[displayColIndex]
      if (crdtDataIndex === undefined) continue

      const colName = columnNames[crdtDataIndex]
      if (!colName) continue

      let authorSid: number
      let authorTime: number
      try {
        const nodeId = model.api
          .vec(['rows', String(rowIndex), 'data'])
          .get(crdtDataIndex).node.id
        authorSid = nodeId.sid
        authorTime = nodeId.time
      } catch {
        continue
      }

      const replicaUserInfo = replicaUserMap.get(authorSid)
      if (!replicaUserInfo) continue

      results.push({
        rowIndex,
        displayColIndex,
        colName,
        value: rowData[crdtDataIndex],
        authorSid,
        authorTime,
        replicaUserInfo,
      })
    }
  }

  return results
}
