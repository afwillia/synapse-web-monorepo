import {
  DataGridRow,
  GridModel,
  ReplicaSelectionModel,
} from '@/components/DataGrid/DataGridTypes'
import { SchemaPropertiesMap } from '@/utils/jsonschema/getSchemaPropertyInfo'
import { s } from 'json-joy/lib/json-crdt-patch'

/**
 * Represents a change operation on the GridModel.
 */
export type ModelChange =
  | { type: 'CREATE'; rowIndex: number; rowData: DataGridRow }
  | { type: 'DELETE'; rowIndex: number; count?: number }
  | { type: 'UPDATE'; rowIndex: number; updatedData: DataGridRow }
  | {
      type: 'SET_SELECTION'
      replicaId: string
      selection: ReplicaSelectionModel
    }

export function getDefaultValueForProperty(
  row: DataGridRow,
  property: string,
  schemaPropertyInfo: SchemaPropertiesMap,
) {
  let value
  if (Object.hasOwn(row, property)) {
    value = row[property]
  } else {
    // Inspect the schema. If the property is required, it should be `null`
    // Otherwise, the property is optional. It should be undefined to be valid against the JSON Schema
    if (schemaPropertyInfo[property]?.isRequired) {
      value = null
    } else {
      value = undefined
    }
  }
  return value
}

/**
 * Applies a single change operation (create, delete, or update) to the GridModel.
 *
 * @param model - The grid model to modify
 * @param change - The change to apply
 */
export function applyModelChange(
  model: GridModel,
  change: ModelChange,
  schemaPropertyInfo: SchemaPropertiesMap,
) {
  const rowsArr = model.api.arr(['rows'])
  const { columnNames } = model.api.getSnapshot()

  switch (change.type) {
    case 'CREATE': {
      // Convert rowData object into a CRDT vector
      const rowData = columnNames.map(name =>
        s.con(
          getDefaultValueForProperty(change.rowData, name, schemaPropertyInfo),
        ),
      )
      // Insert a new row object at the specified index
      rowsArr?.ins(change.rowIndex, [
        s.obj({ data: s.vec(...rowData), metadata: s.obj({}) }),
      ])
      break
    }

    case 'DELETE':
      rowsArr?.del(change.rowIndex, change.count ?? 1)
      break

    case 'UPDATE': {
      const snapshot = model.api.getSnapshot()
      const currentRowData = snapshot.rows[change.rowIndex]?.data
      Object.entries(change.updatedData).forEach(([key, value]) => {
        if (key.startsWith('_')) return // Skip internal properties like _rowId
        const colIndex = columnNames.indexOf(key)
        if (colIndex !== -1) {
          // Only write cells whose value actually changed to avoid stamping
          // every cell in the row with the local replica's SID.
          const currentValue = currentRowData?.[colIndex]
          const isNullish = (v: unknown) =>
            v === null || v === undefined || v === ''
          const unchanged =
            isNullish(currentValue) && isNullish(value)
              ? true
              : typeof currentValue !== 'object' &&
                typeof value !== 'object' &&
                String(currentValue) === String(value)
          if (unchanged) return

          // Get the CRDT array of cell values for this row
          const rowVec = model.api.vec([
            'rows',
            String(change.rowIndex),
            'data',
          ])
          // Update the specific column with the new value
          rowVec?.set([[colIndex, s.con(value)]])
        }
      })
      break
    }
    case 'SET_SELECTION': {
      if (!model.api.obj().has('selection')) {
        // Create if not exists
        model.api.obj().add(['selection'], s.obj({}))
      }
      model.api
        .obj(['selection'])
        .set({ [change.replicaId]: s.con(change.selection) })

      break
    }
  }
}
