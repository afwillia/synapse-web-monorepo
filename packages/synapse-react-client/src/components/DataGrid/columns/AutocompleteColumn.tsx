import parseFreeTextGivenJsonSchemaType from '@/components/DataGrid/utils/parseFreeTextUsingJsonSchemaType'
import { Autocomplete, TextField } from '@mui/material'
import { JSONSchema7Type } from 'json-schema'
import { useEffect, useState } from 'react'
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

export function castCellValueToString(
  toCast: AutocompleteOption | undefined,
): string {
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
}: AutocompleteCellProps) {
  const [localInputState, setLocalInputState] = useState<string>(
    castCellValueToString(rowData as AutocompleteOption | undefined),
  )
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Sync localInputState with rowData when it changes externally (e.g., cut/paste)
  useEffect(() => {
    setLocalInputState(
      castCellValueToString(rowData as AutocompleteOption | undefined),
    )
  }, [rowData])

  useEffect(() => {
    if (!active && isDropdownOpen) {
      setIsDropdownOpen(false)
    }
  }, [active, isDropdownOpen])

  return (
    <Autocomplete
      freeSolo
      disablePortal={false}
      open={active && isDropdownOpen}
      options={choices}
      getOptionLabel={option =>
        castCellValueToString(option as AutocompleteOption | undefined)
      }
      value={rowData as AutocompleteOption}
      inputValue={localInputState}
      onInputChange={(_, newInputValue, reason) => {
        setLocalInputState(newInputValue)
        if (reason === 'input' && active) {
          setIsDropdownOpen(true)
        }
      }}
      onChange={(_e, newVal, reason) => {
        if (reason === 'createOption') {
          setRowData(
            parseFreeTextGivenJsonSchemaType(newVal as string, colType),
          )
        } else {
          setRowData(newVal as AutocompleteOption)
        }
        setLocalInputState(
          castCellValueToString(newVal as AutocompleteOption | undefined),
        )
        setIsDropdownOpen(false)
      }}
      onOpen={() => {
        if (active) {
          setIsDropdownOpen(true)
        }
      }}
      onClose={() => {
        setIsDropdownOpen(false)
      }}
      blurOnSelect={false}
      onBlur={_event => {
        if (
          localInputState !==
          castCellValueToString(rowData as AutocompleteOption | undefined)
        ) {
          setRowData(parseFreeTextGivenJsonSchemaType(localInputState, colType))
        }
        setIsDropdownOpen(false)
      }}
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
          }}
        />
      )}
      sx={{
        width: '100%',
        height: '100%',
        '& .MuiAutocomplete-inputRoot': {
          padding: '0 10px',
          backgroundColor: 'inherit',
        },
        '& .MuiFormControl-root': { height: '100%' },
      }}
    />
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
    copyValue: ({ rowData }) => {
      if (typeof rowData === 'string' || typeof rowData === 'number') {
        return rowData
      }
      if (rowData === null) {
        return null
      }
      return castCellValueToString(rowData as AutocompleteOption | undefined)
    },
    pasteValue: ({ value }) => value,
    disableKeys: true,
    keepFocus: true,
  }
}
