import { Box, Chip, Typography } from '@mui/material'
import { SelectionWithId } from 'react-datasheet-grid/dist/types'
import { GridOnOutlined } from '@mui/icons-material'

export type SelectionIndicatorProps = {
  selection: SelectionWithId | null
}

/**
 * Formats a cell range to display to the user
 * @param selection The current selection
 * @returns A formatted string like "A1:B5" or "A1" for single cells
 */
function formatCellRange(selection: SelectionWithId): string {
  const { min, max } = selection

  // Convert column index to letter (0 = A, 1 = B, etc.)
  const getColumnLetter = (colIndex: number): string => {
    let letter = ''
    let index = colIndex
    while (index >= 0) {
      letter = String.fromCharCode(65 + (index % 26)) + letter
      index = Math.floor(index / 26) - 1
    }
    return letter
  }

  const minCell = `${getColumnLetter(min.col)}${min.row + 1}`
  const maxCell = `${getColumnLetter(max.col)}${max.row + 1}`

  // If it's a single cell, just show the cell reference
  if (minCell === maxCell) {
    return minCell
  }

  // Otherwise show the range
  return `${minCell}:${maxCell}`
}

/**
 * Calculates the number of cells in the selection
 */
function getCellCount(selection: SelectionWithId): number {
  const { min, max } = selection
  const rows = max.row - min.row + 1
  const cols = max.col - min.col + 1
  return rows * cols
}

export function SelectionIndicator({ selection }: SelectionIndicatorProps) {
  if (!selection) {
    return null
  }

  const cellCount = getCellCount(selection)
  const cellRange = formatCellRange(selection)
  const isSingleCell = cellCount === 1

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        padding: '8px 12px',
        backgroundColor: 'grey.100',
        borderRadius: '8px',
        border: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <GridOnOutlined sx={{ fontSize: 20, color: 'primary.main' }} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
        <Typography variant="body2" fontWeight="600">
          Selected: {cellRange}
        </Typography>
        {!isSingleCell && (
          <Typography variant="caption" color="text.secondary">
            {cellCount} cell{cellCount !== 1 ? 's' : ''}
          </Typography>
        )}
      </Box>
      <Chip
        label={cellRange}
        size="small"
        color="primary"
        variant="outlined"
        sx={{ ml: 'auto' }}
      />
    </Box>
  )
}

export default SelectionIndicator
