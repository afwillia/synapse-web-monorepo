import { RefObject, useEffect, useRef, useState } from 'react'
import { GridReplica } from '@sage-bionetworks/synapse-client'
import { DataGridRow, GridModel, Operation } from '../DataGridTypes'
import { getUserPaletteIndex } from '../utils/getUserPaletteIndex'
import { GRID_ROW_REACT_KEY_PROPERTY } from '../utils/DataGridUtils'

const FLASH_DURATION_MS = 2100

export type CellFlashInfo = {
  writerType: 'human' | 'bot'
  paletteIndex: number
}

/**
 * Detects cells that changed due to remote edits and returns a map of cell
 * keys ("rowIndex:columnName") to CellFlashInfo (writer type + palette index).
 *
 * Own edits (covered by the most recent local Operation range) are excluded.
 * Flash entries expire after FLASH_DURATION_MS.
 *
 * Rows are matched by their CRDT row key (__rowKey) rather than by array
 * index. This prevents false flashes when rows are inserted or deleted and
 * subsequent rows shift positions.
 */
export function useFlashTracker(
  rowValues: DataGridRow[],
  hasCompletedInitialSync: boolean,
  lastLocalOpsRef: RefObject<Operation[] | null>,
  model: GridModel | null,
  replicaMetadata: Map<string, GridReplica>,
): Map<string, CellFlashInfo> {
  const prevRowValuesRef = useRef<DataGridRow[] | null>(null)
  const [flashMap, setFlashMap] = useState<Map<string, CellFlashInfo>>(
    new Map(),
  )

  useEffect(() => {
    if (!hasCompletedInitialSync) {
      prevRowValuesRef.current = rowValues
      return
    }

    const prev = prevRowValuesRef.current
    prevRowValuesRef.current = rowValues

    if (!prev) return

    const localOps = lastLocalOpsRef.current ?? []
    const newlyFlashing = new Map<string, CellFlashInfo>()

    const columnNames = model ? model.api.getSnapshot().columnNames : null

    // Index prev rows by their stable CRDT key so comparisons survive row
    // insertions and deletions (which shift array indices).
    const prevByKey = new Map<string, DataGridRow>()
    for (const row of prev) {
      const key = row[GRID_ROW_REACT_KEY_PROPERTY] as string | undefined
      if (key) prevByKey.set(key, row)
    }

    for (let rowIndex = 0; rowIndex < rowValues.length; rowIndex++) {
      const currentRow = rowValues[rowIndex]
      const rowKey = currentRow[GRID_ROW_REACT_KEY_PROPERTY] as
        | string
        | undefined

      // Skip rows with no key, or rows that didn't exist before (newly created)
      if (!rowKey) continue
      const prevRow = prevByKey.get(rowKey)
      if (!prevRow) continue

      // Skip rows covered by a local operation.
      // toRowIndex is exclusive (matches react-datasheet-grid's Operation API).
      const isLocalRow = localOps.some(
        op => rowIndex >= op.fromRowIndex && rowIndex < op.toRowIndex,
      )
      if (isLocalRow) continue

      const dataColumnNames = Object.keys(currentRow).filter(
        k => !k.startsWith('__'),
      )
      for (const columnName of dataColumnNames) {
        if (currentRow[columnName] !== prevRow[columnName]) {
          const cellKey = `${rowIndex}:${columnName}`
          let writerType: 'human' | 'bot' = 'human'
          let paletteIndex = 0

          if (model && columnNames) {
            const colIndex = columnNames.indexOf(columnName)
            if (colIndex !== -1) {
              try {
                const sid = model.api
                  .vec(['rows', String(rowIndex), 'data'])
                  .node.val(colIndex)?.sid
                if (sid !== undefined) {
                  const meta = replicaMetadata.get(String(sid))
                  if (meta?.isAgentReplica) writerType = 'bot'
                  paletteIndex = getUserPaletteIndex(meta?.createdBy)
                }
              } catch {
                // SID lookup failure — default to human, palette 0
              }
            }
          }

          newlyFlashing.set(cellKey, { writerType, paletteIndex })
        }
      }
    }

    if (newlyFlashing.size === 0) return

    setFlashMap(prev => new Map([...prev, ...newlyFlashing]))

    const timer = setTimeout(() => {
      setFlashMap(prev => {
        const next = new Map(prev)
        for (const key of newlyFlashing.keys()) {
          next.delete(key)
        }
        return next
      })
    }, FLASH_DURATION_MS)

    return () => clearTimeout(timer)
  }, [
    rowValues,
    hasCompletedInitialSync,
    lastLocalOpsRef,
    model,
    replicaMetadata,
  ])

  return flashMap
}
