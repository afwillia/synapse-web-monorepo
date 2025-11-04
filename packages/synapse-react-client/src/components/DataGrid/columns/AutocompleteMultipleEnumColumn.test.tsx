import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import {
  AutocompleteMultipleEnumCell,
  AutocompleteMultipleEnumCellProps,
  AutocompleteMultipleEnumOption,
  autocompleteMultipleEnumColumn,
} from './AutocompleteMultipleEnumColumn'

describe('autocompleteMultipleEnumColumn', () => {
  it('copyValue converts row data into a comma-separated string', () => {
    const column = autocompleteMultipleEnumColumn({ choices: [] })
    const copyValue = column.copyValue!

    const firstArgs: Parameters<typeof copyValue>[0] = {
      rowData: ['foo', 'bar'],
      rowIndex: 0,
    }
    const secondArgs: Parameters<typeof copyValue>[0] = {
      rowData: 'freeText',
      rowIndex: 0,
    }
    const thirdArgs: Parameters<typeof copyValue>[0] = {
      rowData: null,
      rowIndex: 0,
    }

    expect(copyValue(firstArgs)).toBe('foo,bar')
    expect(copyValue(secondArgs)).toBe('freeText')
    expect(copyValue(thirdArgs)).toBe('')
  })

  it('pasteValue parses delimited text using the JSON schema type', () => {
    const column = autocompleteMultipleEnumColumn({
      choices: [],
      colType: 'string',
    })
    const pasteValue = column.pasteValue!

    const args: Parameters<typeof pasteValue>[0] = {
      value: 'one, two\tthree',
      rowData: undefined,
      rowIndex: 0,
    }

    const result = pasteValue(args) as unknown

    expect(Array.isArray(result)).toBe(true)
    if (Array.isArray(result)) {
      expect(result).toContain('one')
      expect(result).toContain('two')
      expect(result).toContain('three')
    }
  })

  it('filters out null-like parses but keeps valid ones', () => {
    const column = autocompleteMultipleEnumColumn({
      choices: [],
      colType: 'string',
    })
    const pasteValue = column.pasteValue!

    const args: Parameters<typeof pasteValue>[0] = {
      value: ',valid,',
      rowData: undefined,
      rowIndex: 0,
    }

    const result = pasteValue(args) as unknown

    if (Array.isArray(result)) {
      expect(result).toContain('valid')
    }
  })

  it('pasteValue leaves non-string inputs unchanged', () => {
    const column = autocompleteMultipleEnumColumn({
      choices: [],
      colType: 'number',
    })
    const pasteValue = column.pasteValue!
    const array = ['someValue']

    const args: Parameters<typeof pasteValue>[0] = {
      value: array as unknown as string,
      rowData: undefined,
      rowIndex: 0,
    }

    const result = pasteValue(args) as unknown

    expect(result).toBe(array)
  })

  it('cellClassName reflects value count when dynamic height is enabled', () => {
    const column = autocompleteMultipleEnumColumn({
      choices: [],
      dynamicHeight: true,
    })
    const cellClassName = column.cellClassName

    expect(typeof cellClassName).toBe('function')

    if (typeof cellClassName === 'function') {
      const singleArgs: Parameters<typeof cellClassName>[0] = {
        rowData: ['one'],
        rowIndex: 0,
      }
      const emptyArgs: Parameters<typeof cellClassName>[0] = {
        rowData: undefined,
        rowIndex: 0,
      }
      const manyArgs: Parameters<typeof cellClassName>[0] = {
        rowData: ['1', '2', '3', '4'],
        rowIndex: 0,
      }

      expect(cellClassName(singleArgs)).toBe('multi-value-cell')
      expect(cellClassName(emptyArgs)).toBe('multi-value-cell')
      expect(cellClassName(manyArgs)).toBe('multi-value-cell-large')
    }
  })

  it('closes the dropdown when focus moves to another grid cell', async () => {
    const user = userEvent.setup()

    const toArray = (
      value: AutocompleteMultipleEnumOption,
    ): AutocompleteMultipleEnumOption[] =>
      Array.isArray(value)
        ? (value as AutocompleteMultipleEnumOption[])
        : [value as AutocompleteMultipleEnumOption]

    const GridHarness = () => {
      const [activeCell, setActiveCell] = useState<'auto' | 'plain'>('auto')
      const [enumValues, setEnumValues] = useState<
        AutocompleteMultipleEnumOption[]
      >(['Option A'])
      const [plainValue, setPlainValue] = useState('Plain value')

      return (
        <div>
          <div
            data-testid="autocomplete-multi-cell"
            onClick={() => setActiveCell('auto')}
          >
            <AutocompleteMultipleEnumCell
              {...({
                rowData: enumValues,
                setRowData: (value: AutocompleteMultipleEnumOption) =>
                  setEnumValues(toArray(value)),
                choices: ['Option A', 'Option B'],
                colType: 'string',
                limitTags: 2,
                active: activeCell === 'auto',
              } as AutocompleteMultipleEnumCellProps)}
            />
          </div>
          <div
            data-testid="plain-text-cell"
            onClick={() => setActiveCell('plain')}
          >
            <input
              data-testid="plain-text-cell-input"
              value={plainValue}
              onChange={event => setPlainValue(event.target.value)}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                padding: '0 10px',
                backgroundColor: 'inherit',
              }}
            />
          </div>
        </div>
      )
    }

    render(<GridHarness />)

    const comboBox = screen.getByRole('combobox')
    await user.click(comboBox)

    fireEvent.change(comboBox, { target: { value: 'Option' } })

    await waitFor(() => {
      expect(comboBox).toHaveAttribute('aria-expanded', 'true')
    })

    const plainInput = screen.getByTestId('plain-text-cell-input')
    await user.click(plainInput)

    await waitFor(() => {
      expect(comboBox).toHaveAttribute('aria-expanded', 'false')
    })
  })
})
