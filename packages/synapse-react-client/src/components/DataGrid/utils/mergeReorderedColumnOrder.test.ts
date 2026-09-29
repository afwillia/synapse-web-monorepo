import {
  ColumnOrderChange,
  mergeReorderedColumnOrder,
} from './mergeReorderedColumnOrder'

/** A change where the UI listed, and had active, exactly the columns it reordered. */
function changeCovering(columnOrder: number[]): ColumnOrderChange {
  return {
    columnOrder,
    listedColumnIndices: columnOrder,
    activeColumnIndices: columnOrder,
  }
}

describe('mergeReorderedColumnOrder', () => {
  it('uses the new order as-is when it covers the whole order', () => {
    expect(
      mergeReorderedColumnOrder([0, 1, 2], changeCovering([2, 0, 1])),
    ).toEqual([2, 0, 1])
  })

  describe('columns the UI never listed', () => {
    it('keeps one that the grid gained while the UI was open', () => {
      expect(
        mergeReorderedColumnOrder([0, 1, 2], {
          columnOrder: [1, 0],
          listedColumnIndices: [0, 1],
          activeColumnIndices: [0, 1],
        }),
      ).toEqual([1, 0, 2])
    })

    it('keeps all of them, in the order the grid has them', () => {
      expect(
        mergeReorderedColumnOrder([0, 3, 1, 2], {
          columnOrder: [1, 0],
          listedColumnIndices: [0, 1],
          activeColumnIndices: [0, 1],
        }),
      ).toEqual([1, 0, 3, 2])
    })

    it('does not duplicate one that the new order restored', () => {
      // 'Reset to Default Order' can pull in a column that was not listed at open
      expect(
        mergeReorderedColumnOrder([0, 1, 2], {
          columnOrder: [0, 1, 2],
          listedColumnIndices: [0, 1],
          activeColumnIndices: [0, 1],
        }),
      ).toEqual([0, 1, 2])
    })

    it('keeps a column whose name has not arrived yet', () => {
      // The UI only lists named columns, so index 2 is absent from the change entirely
      expect(
        mergeReorderedColumnOrder([0, 1, 2], changeCovering([0, 1])),
      ).toEqual([0, 1, 2])
    })
  })

  describe('columns removed deliberately', () => {
    it('drops a listed column left out of the new order', () => {
      expect(
        mergeReorderedColumnOrder([0, 1, 2], {
          columnOrder: [0, 2],
          listedColumnIndices: [0, 1, 2],
          activeColumnIndices: [0, 1, 2],
        }),
      ).toEqual([0, 2])
    })

    it('drops it while still keeping an unlisted column', () => {
      expect(
        mergeReorderedColumnOrder([0, 1, 2], {
          columnOrder: [0],
          listedColumnIndices: [0, 1],
          activeColumnIndices: [0, 1],
        }),
      ).toEqual([0, 2])
    })
  })

  describe('columns removed elsewhere while the UI was open', () => {
    it('does not resurrect one the user left in place', () => {
      // Index 1 was in the order at open and is gone now: another replica removed it
      expect(
        mergeReorderedColumnOrder([0, 2], {
          columnOrder: [1, 0, 2],
          listedColumnIndices: [0, 1, 2],
          activeColumnIndices: [0, 1, 2],
        }),
      ).toEqual([0, 2])
    })

    it('still restores a column the UI offered as already removed', () => {
      // Index 1 was listed but not active -- the greyed-out row the user clicked Restore on
      expect(
        mergeReorderedColumnOrder([0, 2], {
          columnOrder: [0, 2, 1],
          listedColumnIndices: [0, 2, 1],
          activeColumnIndices: [0, 2],
        }),
      ).toEqual([0, 2, 1])
    })
  })

  it('collapses entries duplicated by an earlier concurrent reorder', () => {
    expect(
      mergeReorderedColumnOrder([0, 1, 0, 1, 2], {
        columnOrder: [1, 0],
        listedColumnIndices: [0, 1],
        activeColumnIndices: [0, 1],
      }),
    ).toEqual([1, 0, 2])
  })
})
