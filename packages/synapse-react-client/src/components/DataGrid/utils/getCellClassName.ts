import classNames from 'classnames'
import { CellEditInfo, DataGridRow } from '../DataGridTypes'
import { SelectionWithId } from '@sage-bionetworks/react-datasheet-grid'
import { Column } from '@sage-bionetworks/react-datasheet-grid'

export function getCellClassName(params: {
  rowData: DataGridRow
  rowIndex: number
  columnId?: string
  selectedRowIndex: number | null
  lastSelection?: SelectionWithId | null
  colValues?: Column[]
  cellEditMap?: Map<string, CellEditInfo>
}): string | undefined {
  const {
    rowData,
    rowIndex,
    columnId,
    selectedRowIndex,
    lastSelection,
    colValues,
    cellEditMap,
  } = params

  const isSelected = selectedRowIndex === rowIndex
  const cellValidationResults = rowData.__cellValidationResults
  const isInvalid =
    cellValidationResults && columnId && cellValidationResults.has(columnId)

  const classList: string[] = []

  if (isSelected) {
    classList.push('cell-row-selected')
  }

  // Add selection styling based on lastSelection
  let colIndex = -1
  if (columnId && colValues) {
    colIndex = colValues.findIndex(col => col.id === columnId)
  }

  if (lastSelection && columnId && colValues && colIndex !== -1) {
    const isInSelection =
      rowIndex >= lastSelection.min.row &&
      rowIndex <= lastSelection.max.row &&
      colIndex >= lastSelection.min.col &&
      colIndex <= lastSelection.max.col

    if (isInSelection) {
      classList.push('cell-selected')
    }
  }

  if (isInvalid) {
    classList.push('cell-invalid')
  }

  // Persistent corner-triangle decoration for cells edited by own/other human/bot
  if (cellEditMap && columnId && colIndex !== -1) {
    const editInfo = cellEditMap.get(`${rowIndex}:${columnId}`)
    if (editInfo) {
      classList.push(`cell-edited-${editInfo.writerType}`)
    }
  }

  return classList.length ? classNames(classList) : undefined
}
