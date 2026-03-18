import classNames from 'classnames'
import { DataGridRow } from '../DataGridTypes'
import { SelectionWithId } from '@sage-bionetworks/react-datasheet-grid'
import { Column } from '@sage-bionetworks/react-datasheet-grid'
import { RemotePresenceInfo } from './resolveRemoteSelections'
import { CellFlashInfo } from '../hooks/useFlashTracker'

export function getCellClassName(params: {
  rowData: DataGridRow
  rowIndex: number
  columnId?: string
  selectedRowIndex: number | null
  lastSelection?: SelectionWithId | null
  colValues?: Column[]
  recentlyChangedCells?: Map<string, CellFlashInfo>
  remotePresence?: RemotePresenceInfo[]
  cellEditMap?: Map<string, 'human' | 'bot'>
}): string | undefined {
  const {
    rowData,
    rowIndex,
    columnId,
    selectedRowIndex,
    lastSelection,
    colValues,
    recentlyChangedCells,
    remotePresence,
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

  // Flash cells changed by remote users — color matches the writer's presence color
  if (recentlyChangedCells && columnId) {
    const flash = recentlyChangedCells.get(`${rowIndex}:${columnId}`)
    if (flash) {
      classList.push(`cell-flash-${flash.writerType}-${flash.paletteIndex}`)
    }
  }

  // Persistent corner-triangle decoration for cells edited by humans or bots
  if (cellEditMap && columnId) {
    const editType = cellEditMap.get(`${rowIndex}:${columnId}`)
    if (editType === 'human') classList.push('cell-edited-human')
    else if (editType === 'bot') classList.push('cell-edited-bot')
  }

  // Colored outline for remote users' selections
  if (remotePresence && columnId && colIndex !== -1) {
    for (const presence of remotePresence) {
      const rowInPresence =
        presence.rowSelectAll || presence.rowIndices.includes(rowIndex)
      const colInPresence =
        presence.columnSelectAll || presence.colIndices.includes(colIndex)

      if (rowInPresence && colInPresence) {
        classList.push(`presence-cell-user-${presence.paletteIndex}`)
        break // Only apply the first matching presence per cell
      }
    }
  }

  return classList.length ? classNames(classList) : undefined
}
