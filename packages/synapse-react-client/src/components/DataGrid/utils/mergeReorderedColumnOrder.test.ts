import { mergeReorderedColumnOrder } from './mergeReorderedColumnOrder'

describe('mergeReorderedColumnOrder', () => {
  it('uses the reordered list as-is when it covers the whole order', () => {
    expect(
      mergeReorderedColumnOrder({
        currentColumnOrder: [0, 1, 2],
        reorderedColumnIndices: [2, 0, 1],
        coveredColumnIndices: [0, 1, 2],
      }),
    ).toEqual([2, 0, 1])
  })

  it('keeps a column the reorder UI never listed', () => {
    // The hub added index 2 to columnOrder after the dialog opened with columns 0 and 1
    expect(
      mergeReorderedColumnOrder({
        currentColumnOrder: [0, 1, 2],
        reorderedColumnIndices: [1, 0],
        coveredColumnIndices: [0, 1],
      }),
    ).toEqual([1, 0, 2])
  })

  it('keeps every unlisted column, in the order the grid has them', () => {
    expect(
      mergeReorderedColumnOrder({
        currentColumnOrder: [0, 3, 1, 2],
        reorderedColumnIndices: [1, 0],
        coveredColumnIndices: [0, 1],
      }),
    ).toEqual([1, 0, 3, 2])
  })

  it('drops a listed column the user removed', () => {
    expect(
      mergeReorderedColumnOrder({
        currentColumnOrder: [0, 1, 2],
        reorderedColumnIndices: [0, 2],
        coveredColumnIndices: [0, 1, 2],
      }),
    ).toEqual([0, 2])
  })

  it('drops a listed column the user removed while keeping an unlisted one', () => {
    expect(
      mergeReorderedColumnOrder({
        currentColumnOrder: [0, 1, 2],
        reorderedColumnIndices: [0],
        coveredColumnIndices: [0, 1],
      }),
    ).toEqual([0, 2])
  })

  it('does not duplicate an unlisted column that the reordered list restored', () => {
    // 'Reset to Default Order' can pull in a column that was not part of the covered set
    expect(
      mergeReorderedColumnOrder({
        currentColumnOrder: [0, 1, 2],
        reorderedColumnIndices: [0, 1, 2],
        coveredColumnIndices: [0, 1],
      }),
    ).toEqual([0, 1, 2])
  })

  it('keeps a column whose name has not arrived yet, so the grid shows it once it does', () => {
    // The reorder UI only ever lists named columns, so index 2 is absent from both the reordered
    // list and the covered set while its name is in flight
    expect(
      mergeReorderedColumnOrder({
        currentColumnOrder: [0, 1, 2],
        reorderedColumnIndices: [0, 1],
        coveredColumnIndices: [0, 1],
      }),
    ).toEqual([0, 1, 2])
  })
})
