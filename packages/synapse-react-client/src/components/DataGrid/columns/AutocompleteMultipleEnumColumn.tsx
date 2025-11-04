import parseFreeTextGivenJsonSchemaType from '@/components/DataGrid/utils/parseFreeTextUsingJsonSchemaType'
import { Autocomplete, TextField, Tooltip } from '@mui/material'
import { JSONSchema7Type } from 'json-schema'
import { useEffect, useRef, useState } from 'react'
import { CellComponent, Column } from 'react-datasheet-grid'
import {
  AutocompleteOption,
  AutocompleteCellProps,
  castCellValueToString,
} from './AutocompleteColumn'
import { GridAutocompleteChip } from './GridAutocompleteChip'
import isNil from 'lodash-es/isNil'
import isEqual from 'lodash-es/isEqual'

export type AutocompleteMultipleEnumOption = AutocompleteOption

export type AutocompleteMultipleEnumCellProps = Omit<
  AutocompleteCellProps,
  'choices'
> & {
  choices: AutocompleteMultipleEnumOption[]
  limitTags?: number
}

function isOptionArray(
  value:
    | AutocompleteMultipleEnumOption
    | AutocompleteMultipleEnumOption[]
    | null
    | undefined,
): value is AutocompleteMultipleEnumOption[] {
  return Array.isArray(value)
}

function createSafeRowData(
  rowData:
    | AutocompleteMultipleEnumOption
    | AutocompleteMultipleEnumOption[]
    | null
    | undefined,
): AutocompleteMultipleEnumOption[] {
  if (isOptionArray(rowData)) {
    return rowData
  }
  if (isNil(rowData)) {
    return []
  }
  return [rowData]
}

export function AutocompleteMultipleEnumCell({
  rowData,
  setRowData,
  choices,
  colType,
  limitTags = 2,
  active,
}: AutocompleteMultipleEnumCellProps) {
  const [localInputState, setLocalInputState] = useState<string>('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const inputContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!active && isDropdownOpen) {
      setIsDropdownOpen(false)
    }
  }, [active, isDropdownOpen])

  const safeRowData = createSafeRowData(
    rowData as
      | AutocompleteMultipleEnumOption
      | AutocompleteMultipleEnumOption[]
      | null
      | undefined,
  )
  const effectiveLimitTags = active ? -1 : limitTags

  // Create tooltip content showing all values
  const tooltipContent =
    safeRowData.length > 0
      ? safeRowData.map(item => castCellValueToString(item)).join(',')
      : ''

  return (
    <Tooltip
      title={tooltipContent}
      placement="top-start"
      arrow
      enterDelay={500}
      disableHoverListener={active || safeRowData.length <= limitTags}
    >
      <div
        ref={inputContainerRef}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        <Autocomplete
          multiple
          freeSolo
          disablePortal={false}
          limitTags={effectiveLimitTags}
          options={choices}
          getOptionLabel={option =>
            castCellValueToString(option as AutocompleteOption | undefined)
          }
          isOptionEqualToValue={(option, value) => {
            return isEqual(option, value)
          }}
          open={active && isDropdownOpen}
          onOpen={() => {
            if (active) {
              setIsDropdownOpen(true)
            }
          }}
          onClose={() => {
            setIsDropdownOpen(false)
          }}
          value={safeRowData}
          inputValue={localInputState}
          onInputChange={(_, newInputValue, reason) => {
            setLocalInputState(newInputValue)
            if (reason === 'input' && active) {
              setIsDropdownOpen(true)
            }
          }}
          onChange={(_event, newVal) => {
            // Handle both selection/deselection and free text creation the same way
            const parsedValues = (newVal || []).map(item => {
              return typeof item === 'string'
                ? parseFreeTextGivenJsonSchemaType(item, colType)
                : item
            })
            const filteredValues = parsedValues.filter(
              (value): value is AutocompleteMultipleEnumOption => !isNil(value),
            )
            setRowData(filteredValues)
            setLocalInputState('')
            // Don't close dropdown - allow multiple selections
          }}
          onBlur={_event => {
            if (localInputState.trim()) {
              const parsedValue = parseFreeTextGivenJsonSchemaType(
                localInputState,
                colType,
              )
              if (!isNil(parsedValue)) {
                setRowData([...safeRowData, parsedValue])
              }
              setLocalInputState('')
            }
            setIsDropdownOpen(false)
          }}
          renderValue={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index })
              return (
                <GridAutocompleteChip
                  key={key}
                  option={option}
                  active={active}
                  {...tagProps}
                />
              )
            })
          }
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
              // Allow tags to wrap and enable scrolling
              flexWrap: active ? 'wrap' : 'nowrap',
              minHeight: '100%',
              maxHeight: '100%',
              overflowY: active ? 'auto' : 'hidden',
              overflowX: 'hidden',
              '&::-webkit-scrollbar': {
                width: '6px',
                height: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'transparent',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#888',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#555',
              },
            },
            '& .MuiFormControl-root': {
              height: '100%',
            },
            '& .MuiAutocomplete-tag': {
              margin: '1px',
            },
          }}
        />
      </div>
    </Tooltip>
  )
}

export type AutocompleteMultipleEnumColumnProps = {
  choices: AutocompleteMultipleEnumOption[]
  colType?: JSONSchema7Type
  limitTags?: number
  dynamicHeight?: boolean
}

export function autocompleteMultipleEnumColumn({
  choices,
  colType,
  limitTags = 2,
  dynamicHeight = false,
}: AutocompleteMultipleEnumColumnProps): Partial<Column> {
  return {
    component: ((
      props: Omit<AutocompleteMultipleEnumCellProps, 'choices' | 'limitTags'>,
    ) => (
      <AutocompleteMultipleEnumCell
        {...props}
        choices={choices}
        colType={colType}
        limitTags={limitTags}
      />
    )) as CellComponent,
    copyValue: ({ rowData }) => {
      // Convert array to comma-separated string
      const safeRowData = createSafeRowData(
        rowData as
          | AutocompleteMultipleEnumOption
          | AutocompleteMultipleEnumOption[]
          | null
          | undefined,
      )
      return safeRowData.map(item => castCellValueToString(item)).join(',')
    },
    pasteValue: ({ value }) => {
      if (typeof value !== 'string') {
        return value
      }

      // Split by comma or tab and clean up values
      const delimiters = /[,\t]/
      const parsedValues = value
        .split(delimiters)
        .map(item => item.trim())
        .filter(item => item.length > 0)
        .map(item => parseFreeTextGivenJsonSchemaType(item, colType))
        .filter(item => item !== null && item !== undefined)

      return parsedValues.length > 0 ? parsedValues : []
    },
    disableKeys: true,
    keepFocus: true,
    ...(dynamicHeight && {
      cellClassName: ({ rowData }) => {
        const safeRowData = createSafeRowData(
          rowData as
            | AutocompleteMultipleEnumOption
            | AutocompleteMultipleEnumOption[]
            | null
            | undefined,
        )
        return safeRowData.length > 3
          ? 'multi-value-cell-large'
          : 'multi-value-cell'
      },
    }),
  }
}
