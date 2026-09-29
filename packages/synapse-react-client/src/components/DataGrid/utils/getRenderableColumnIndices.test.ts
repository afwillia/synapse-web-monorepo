import { getRenderableColumnIndices } from './getRenderableColumnIndices'

describe('getRenderableColumnIndices', () => {
  it('keeps every index, in the given order, when all of them resolve to a name', () => {
    expect(getRenderableColumnIndices(['a', 'b', 'c'], [2, 0, 1])).toEqual([
      2, 0, 1,
    ])
  })

  it('drops indices past the end of columnNames', () => {
    expect(getRenderableColumnIndices(['a'], [0, 1, 2])).toEqual([0])
  })

  it('drops indices whose name slot is unset', () => {
    const columnNames = ['a', undefined, 'c'] as unknown as string[]

    expect(getRenderableColumnIndices(columnNames, [0, 1, 2])).toEqual([0, 2])
  })

  it('drops indices whose name is empty, matching how rows are keyed by column name', () => {
    expect(getRenderableColumnIndices(['a', '', 'c'], [0, 1, 2])).toEqual([
      0, 2,
    ])
  })

  it('keeps the first occurrence of a repeated index', () => {
    expect(getRenderableColumnIndices(['a', 'b'], [1, 0, 1, 0])).toEqual([1, 0])
  })

  it('returns nothing when no columns are named yet', () => {
    expect(getRenderableColumnIndices([], [0, 1])).toEqual([])
  })
})
