import parseFreeTextGivenJsonSchemaType from '@/components/DataGrid/utils/parseFreeTextUsingJsonSchemaType'
import { Autocomplete, TextField } from '@mui/material'
import { JSONSchema7Type } from 'json-schema'
import { useEffect, useRef, useState } from 'react'
import { CellComponent, CellProps, Column } from 'react-datasheet-grid'
import { isNil } from 'lodash-es'

export type AutocompleteOption =
  | string
  | number
  | boolean
  | null
  | Record<string, unknown>
  | Array<unknown>

export type AutocompleteCellProps = CellProps & {
  rowData: AutocompleteOption
  setRowData: (value: AutocompleteOption) => void
  choices: AutocompleteOption[]
  colType?: JSONSchema7Type
}

export function castCellValueToString(toCast: any): string {
  if (isNil(toCast)) {
    return ''
  }
  if (typeof toCast === 'object') {
    return JSON.stringify(toCast)
  }
  return String(toCast)
}

export function AutocompleteCell({
  rowData,
  setRowData,
  choices,
  colType,
  active,
  focus,
  stopEditing: _stopEditing,
}: AutocompleteCellProps) {
  const [localInputState, setLocalInputState] = useState<string>(
    castCellValueToString(rowData),
  )

  const [open, setOpen] = useState<boolean>(false)
  const inputRef = useRef<HTMLDivElement>(null)

  // Sync localInputState with rowData when rowData changes externally
  useEffect(() => {
    setLocalInputState(castCellValueToString(rowData))
  }, [rowData])

  // Sync the dropdown's open state with the grid's active state
  // This ensures the dropdown closes when clicking other cells in the grid
  useEffect(() => {
    if (active) {
      // Open the dropdown when cell becomes active
      setOpen(true)
      // Focus the input
      setTimeout(() => {
        inputRef.current?.querySelector('input')?.focus()
      }, 0)
    } else {
      // Cell became inactive - close the dropdown
      setOpen(false)
    }
  }, [active])

  const handleBlur = (event: unknown) => {
    console.log('%cfiring onBlur', 'color: purple', event)
    // Only update on blur if the input value differs from the current rowData
    // and no option was selected (which would have already updated via onChange)
    if (localInputState !== castCellValueToString(rowData)) {
      setRowData(parseFreeTextGivenJsonSchemaType(localInputState, colType))
    }
  }

  return (
    <div
      ref={inputRef}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Autocomplete
        freeSolo
        forcePopupIcon
        disablePortal={false}
        options={choices}
        getOptionLabel={option => castCellValueToString(option)}
        value={rowData as AutocompleteOption}
        inputValue={localInputState}
        onInputChange={(_, newInputValue) => {
          console.log('%cfiring onInputChange', 'color: orange', newInputValue)
          setLocalInputState(newInputValue)
        }}
        onChange={(_e, newVal, reason) => {
          console.log('%cfiring onChange', 'color: pink', { newVal, reason })
          if (reason === 'createOption') {
            // The user typed an option that wasn't a defined enum. Try to cast it to the correct type
            setRowData(
              parseFreeTextGivenJsonSchemaType(newVal as string, colType),
            )
          } else {
            // The value was selected, so explicitly set it
            setRowData(newVal)
          }
          // Don't manually update localInputState here - let the useEffect handle it when rowData changes
        }}
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        blurOnSelect={true}
        onBlur={handleBlur}
        renderInput={params => (
          <TextField
            {...params}
            slotProps={{
              input: {
                ...params.InputProps,
                disableUnderline: true,
                sx: {
                  height: '100%',
                  padding: '0 10px',
                  backgroundColor: 'inherit',
                  borderRadius: 0,
                },
              },
              htmlInput: { ...params.inputProps },
            }}
          />
        )}
        sx={{
          // Hide only the clear and popup icons when popper is closed
          '& .MuiAutocomplete-clearIndicator, & .MuiAutocomplete-popupIndicator':
            {
              visibility: 'hidden',
            },
          '&.Mui-focused .MuiAutocomplete-clearIndicator, &.Mui-focused .MuiAutocomplete-popupIndicator':
            {
              visibility: 'visible',
            },
          // on hover, show the icons
          '&:hover .MuiAutocomplete-clearIndicator, &:hover .MuiAutocomplete-popupIndicator':
            {
              visibility: 'visible',
            },
          width: '100%',
          height: '100%',
          '& .MuiAutocomplete-inputRoot': {
            padding: '0 10px',
            backgroundColor: 'inherit',
          },
          '& .MuiFormControl-root': { height: '100%' },
        }}
      />
    </div>
  )
}

export type AutocompleteColumnProps = {
  choices: AutocompleteOption[]
  colType?: JSONSchema7Type
}

export function autocompleteColumn({
  choices,
  colType,
}: AutocompleteColumnProps): Partial<Column> {
  return {
    component: ((props: Omit<AutocompleteCellProps, 'choices'>) => (
      <AutocompleteCell {...props} choices={choices} colType={colType} />
    )) as CellComponent,
    // If we update our enums to support labels, then we can update copy to copy the label and paste to lookup the mapping from label -> value
    copyValue: ({ rowData }) => rowData,
    pasteValue: ({ value }) => value,
    disableKeys: true,
    keepFocus: true,
  }
}
