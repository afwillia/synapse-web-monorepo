import {
  CrdtId,
  GridModel,
  GridModelSnapshot,
  ReplicaSelectionModel,
} from '@/components/DataGrid/DataGridTypes'
import { SelectionWithId } from 'react-datasheet-grid/dist/types'

/**
 * Converts a ReplicaSelectionModel from the CRDT model back to a SelectionWithId
 * that can be displayed in the UI.
 *
 * @param replicaSelection - The selection model stored in the CRDT
 * @param model - The grid model
 * @param modelSnapshot - The current snapshot of the model
 * @returns A SelectionWithId object or null if the selection is invalid
 */
export function convertReplicaSelectionToSelectionWithId(
  replicaSelection: ReplicaSelectionModel,
  model: GridModel,
  modelSnapshot: GridModelSnapshot,
): SelectionWithId | null {
  // Determine row range
  let minRow = 0
  let maxRow = 0

  if (replicaSelection.rowSelectAll) {
    minRow = 0
    maxRow = modelSnapshot.rows.length - 1
  } else if (replicaSelection.rowSelection) {
    const rowIndices = getIndicesFromCrdtIds(
      replicaSelection.rowSelection,
      model.api.arr(['rows']),
    )
    if (rowIndices.length === 0) return null
    minRow = Math.min(...rowIndices)
    maxRow = Math.max(...rowIndices)
  } else {
    return null
  }

  // Determine column range
  let minCol = 0
  let maxCol = 0

  if (replicaSelection.columnSelectAll) {
    minCol = 0
    maxCol = modelSnapshot.columnOrder.length - 1
  } else if (replicaSelection.columnSelection) {
    const colIndices = getIndicesFromCrdtIds(
      replicaSelection.columnSelection,
      model.api.arr(['columnOrder']),
    )
    if (colIndices.length === 0) return null
    minCol = Math.min(...colIndices)
    maxCol = Math.max(...colIndices)
  } else {
    return null
  }

  // Get column IDs for the selection
  const minColId = `c${minCol}`
  const maxColId = `c${maxCol}`

  return {
    min: { col: minCol, row: minRow, colId: minColId },
    max: { col: maxCol, row: maxRow, colId: maxColId },
  }
}

/**
 * Helper function to find the array indices for given CRDT IDs
 */
function getIndicesFromCrdtIds(
  crdtIds: CrdtId[],
  arrayApi: ReturnType<GridModel['api']['arr']>,
): number[] {
  const indices: number[] = []
  const arrayLength = arrayApi.length()

  for (let i = 0; i < arrayLength; i++) {
    const element = arrayApi.get(i)
    const nodeCrdtId = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      rep: element.node.id.sid as number,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      seq: element.node.id.time as number,
    }

    // Check if this node's CRDT ID matches any in our selection
    if (
      crdtIds.some(id => id.rep === nodeCrdtId.rep && id.seq === nodeCrdtId.seq)
    ) {
      indices.push(i)
    }
  }

  return indices
}

export default convertReplicaSelectionToSelectionWithId
