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

type EnumOption = {
  label: string
  value: AutocompleteMultipleEnumOption
}

function createOptionFromValue(
  value: AutocompleteMultipleEnumOption,
): EnumOption {
  return {
    label: castCellValueToString(value),
    value: value,
  }
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
    let focusTimeoutId: number | undefined
    if (active) {
      setIsDropdownOpen(true)
      focusTimeoutId = window.setTimeout(() => {
        inputContainerRef.current?.querySelector('input')?.focus()
      }, 0)
    } else {
      setIsDropdownOpen(false)
    }

    return () => {
      if (focusTimeoutId !== undefined) {
        window.clearTimeout(focusTimeoutId)
      }
    }
  }, [active])

  const safeRowData = createSafeRowData(
    rowData as
      | AutocompleteMultipleEnumOption
      | AutocompleteMultipleEnumOption[]
      | null
      | undefined,
  )
  const optionsWithLabels = choices.map(createOptionFromValue)
  const selectedOptions = safeRowData.map(createOptionFromValue)
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
          options={optionsWithLabels}
          getOptionLabel={option => {
            // Handle both string (for freeSolo) and object options
            return typeof option === 'string' ? option : option.label
          }}
          isOptionEqualToValue={(option, value) => {
            // Compare the actual values, not labels
            const optionValue =
              typeof option === 'string' ? option : option.value
            const valueValue = typeof value === 'string' ? value : value.value
            return isEqual(optionValue, valueValue)
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
          value={selectedOptions}
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
                : item.value
            })
            const filteredValues = parsedValues.filter(
              (value): value is AutocompleteMultipleEnumOption => !isNil(value),
            )
            setRowData(filteredValues)
            setLocalInputState('')
            setIsDropdownOpen(false)
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
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index })
              const optionValue =
                typeof option === 'string' ? option : option.value
              return (
                <GridAutocompleteChip
                  key={key}
                  option={optionValue}
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
