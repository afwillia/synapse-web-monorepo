import GridMenuButton from '@/components/DataGrid/components/GridMenuButton/GridMenuButton'
import ReorderColumnsDialog from '@/components/DataGrid/components/ReorderColumnsDialog'
import { ColumnOrderChange } from '@/components/DataGrid/utils/mergeReorderedColumnOrder'
import { SwapHoriz } from '@mui/icons-material'
import { JSONSchema7 } from 'json-schema'
import { useState } from 'react'

export type ReorderColumnsButtonProps = {
  columnNames: string[]
  columnOrder: number[]
  jsonSchema: JSONSchema7 | undefined
  upsertKey?: string[]
  canRemoveColumns?: boolean
  onReorder: (change: ColumnOrderChange) => void
}

export default function ReorderColumnsButton(props: ReorderColumnsButtonProps) {
  const {
    columnNames,
    columnOrder,
    jsonSchema,
    upsertKey,
    canRemoveColumns,
    onReorder,
  } = props

  const [showDialog, setShowDialog] = useState(false)

  return (
    <>
      {showDialog && (
        // Explicitly unmount the dialog when it is closed so its working order resets
        <ReorderColumnsDialog
          open={showDialog}
          columnNames={columnNames}
          columnOrder={columnOrder}
          jsonSchema={jsonSchema}
          upsertKey={upsertKey}
          canRemoveColumns={canRemoveColumns}
          onSave={change => {
            onReorder(change)
            setShowDialog(false)
          }}
          onCancel={() => setShowDialog(false)}
        />
      )}
      <GridMenuButton
        variant="outlined"
        startIcon={<SwapHoriz />}
        onClick={() => setShowDialog(true)}
        disabled={columnOrder.length < 2}
      >
        Reorder Columns
      </GridMenuButton>
    </>
  )
}
