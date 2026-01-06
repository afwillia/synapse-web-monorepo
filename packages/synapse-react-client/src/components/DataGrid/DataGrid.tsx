import { modelColsToGrid } from '@/components/DataGrid/utils/modelColsToGrid'
import { SchemaPropertiesMap } from '@/utils/jsonschema/getSchemaPropertyInfo'
import classNames from 'classnames'
import { JSONSchema7 } from 'json-schema'
import { useEffect, useMemo, useRef } from 'react'
import { DataSheetGrid, DataSheetGridRef } from 'react-datasheet-grid'
import 'react-datasheet-grid/dist/style.css'
import '../../style/components/_data-grid-extra.scss'
import { SelectionWithId } from 'react-datasheet-grid/dist/types'
import {
  renderAddRowsComponent,
  renderRecordSetContextMenu,
  renderViewContextMenu,
} from './components/contextMenu'
import { DataGridRow, Operation } from './DataGridTypes'
import { GRID_ROW_REACT_KEY_PROPERTY } from './utils/DataGridUtils'
import { getCellClassName } from './utils/getCellClassName'
import { useColumnResizeHandles } from './hooks/useColumnResizeHandles'

type DataGridProps = {
  gridRef: React.RefObject<DataSheetGridRef | null>
  columnNames: string[]
  columnOrder: number[]
  schemaPropertiesInfo: SchemaPropertiesMap
  rowValues: DataGridRow[]
  entityIsView: boolean
  jsonSchema: JSONSchema7 | undefined
  selectedRowIndex: number | null
  lastSelection: SelectionWithId | null
  handleChange: (newValue: DataGridRow[], operations: Operation[]) => void
  setSelectedRowIndex: (
    value: ((prevState: number | null) => number | null) | number | null,
  ) => void
  handleSelectionChange: (opts: { selection: SelectionWithId | null }) => void
  columnWidths: Record<string, number>
  setColumnWidths: React.Dispatch<React.SetStateAction<Record<string, number>>>
}

/**
 * Component that renders a data grid/spreadsheet using react-datasheet-grid.
 * @param props
 * @constructor
 */
export default function DataGrid(props: DataGridProps) {
  const {
    gridRef,
    rowValues,
    columnNames,
    columnOrder,
    schemaPropertiesInfo,
    entityIsView,
    jsonSchema,
    selectedRowIndex,
    lastSelection,
    handleChange,
    setSelectedRowIndex,
    handleSelectionChange,
    columnWidths,
    setColumnWidths,
  } = props

  const colValues = useMemo(
    () =>
      modelColsToGrid(
        columnNames,
        columnOrder,
        schemaPropertiesInfo,
        columnWidths,
      ),
    [columnNames, columnOrder, schemaPropertiesInfo, columnWidths],
  )

  // Wrapper ref for the grid container
  const wrapperRef = useRef<HTMLDivElement | null>(null)

  // Store the active cell before column resize so we can restore it
  const activeCellBeforeResizeRef = useRef<{ col: number; row: number } | null>(
    null,
  )

  // Store the scroll position and resized column to navigate to it after remount
  const scrollStateRef = useRef<{
    scrollLeft: number
    scrollTop: number
    resizedColumnName: string
  } | null>(null)

  // Handle column resize callback
  const handleColumnResize = (columnName: string, newWidth: number) => {
    // Save the current active cell before updating widths (which will trigger remount)
    if (gridRef.current) {
      const activeCell = gridRef.current.activeCell
      if (activeCell) {
        activeCellBeforeResizeRef.current = {
          col: activeCell.col,
          row: activeCell.row,
        }
      } else {
        // Explicitly clear the ref if there's no active cell
        activeCellBeforeResizeRef.current = null
      }
    }

    // Save scroll position to restore it after remount
    const gridContainer = wrapperRef.current?.querySelector(
      '.dsg-container',
    ) as HTMLElement
    if (gridContainer) {
      scrollStateRef.current = {
        scrollLeft: gridContainer.scrollLeft,
        scrollTop: gridContainer.scrollTop,
        resizedColumnName: columnName,
      }
    }

    setColumnWidths(prev => ({
      ...prev,
      [columnName]: newWidth,
    }))
  }

  // Setup column resize handles
  useColumnResizeHandles({
    wrapperRef,
    colValues,
    onColumnResize: handleColumnResize,
  })

  // Force the grid to update when columns change by using a key
  const gridKey = useMemo(() => {
    return JSON.stringify(columnWidths)
  }, [columnWidths])

  // Restore the active cell and scroll position after the grid remounts due to column width changes
  useEffect(() => {
    // Track if component is still mounted to prevent memory leaks
    let isMounted = true

    const timer = setTimeout(() => {
      // Check if component unmounted before timer completed
      if (!isMounted) {
        return
      }

      const gridContainer = wrapperRef.current?.querySelector(
        '.dsg-container',
      ) as HTMLElement

      // Restore scroll position if we have it
      if (scrollStateRef.current && gridContainer) {
        gridContainer.scrollLeft = scrollStateRef.current.scrollLeft
        gridContainer.scrollTop = scrollStateRef.current.scrollTop
        scrollStateRef.current = null
      }

      // Restore active cell if we have one
      if (
        activeCellBeforeResizeRef.current &&
        gridRef.current &&
        rowValues.length > 0
      ) {
        const savedCell = activeCellBeforeResizeRef.current
        if (
          savedCell.row < rowValues.length &&
          savedCell.col < colValues.length
        ) {
          gridRef.current.setActiveCell(savedCell)
        }
        activeCellBeforeResizeRef.current = null
      }
    }, 0)

    return () => {
      // Mark component as unmounted to prevent timer callback from executing
      isMounted = false
      clearTimeout(timer)
    }
    // gridRef is a ref and doesn't need to be in the dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gridKey, rowValues.length, colValues.length])

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      <DataSheetGrid
        key={gridKey}
        ref={gridRef}
        value={rowValues}
        columns={colValues}
        autoAddRow={!entityIsView}
        disableSmartDelete
        addRowsComponent={entityIsView ? false : renderAddRowsComponent}
        contextMenuComponent={
          entityIsView ? renderViewContextMenu : renderRecordSetContextMenu
        }
        rowKey={GRID_ROW_REACT_KEY_PROPERTY}
        rowClassName={({ rowData, rowIndex }) =>
          classNames({
            'row-valid': !!jsonSchema && rowData.__validationStatus === 'valid',
            'row-invalid':
              !!jsonSchema && rowData.__validationStatus === 'invalid',
            'row-unknown':
              !!jsonSchema && rowData.__validationStatus === 'pending',
            'row-selected': selectedRowIndex === rowIndex,
          })
        }
        cellClassName={({ rowData, rowIndex, columnId }) => {
          return getCellClassName({
            rowData: rowData as DataGridRow,
            rowIndex,
            columnId,
            selectedRowIndex,
            lastSelection,
            colValues,
          })
        }}
        duplicateRow={({ rowData }) => ({
          ...rowData,
        })}
        onChange={handleChange}
        onActiveCellChange={({ cell }) => {
          if (cell) {
            setSelectedRowIndex(cell.row)
          }
        }}
        onSelectionChange={handleSelectionChange}
      />
    </div>
  )
}
