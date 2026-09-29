/**
 * What the reorder UI decided, scoped to the columns it had on screen.
 *
 * The grid's column order can change while the UI is open -- the hub, an agent, or another user can
 * add or remove a column at any time -- so a save cannot be read as a statement about the whole list.
 */
export type ColumnOrderChange = {
  /** The new display order, covering only the columns the UI listed. */
  columnOrder: number[]
  /** Every column the UI listed, whether the user kept it or removed it. */
  listedColumnIndices: number[]
  /** The listed columns that were part of the grid's column order when the UI opened. */
  activeColumnIndices: number[]
}

/**
 * Merges a reordered list of columns back into the grid's current column order.
 *
 * Two kinds of column fall outside what the user decided, and each is resolved in the direction that
 * doesn't destroy someone else's work:
 * - A column the UI never listed is appended, so saving cannot delete a column the user never saw.
 * - A column the UI listed as active but that has since left the order was removed elsewhere while
 *   the UI was open, so it stays out rather than being resurrected. Columns the UI offered as already
 *   removed are exempt: restoring one of those is a deliberate re-add.
 *
 * Repeated indices are collapsed, so a list that merged badly is normalized by this write.
 */
export function mergeReorderedColumnOrder(
  currentColumnOrder: number[],
  change: ColumnOrderChange,
): number[] {
  const current = new Set(currentColumnOrder)
  const active = new Set(change.activeColumnIndices)
  const listed = new Set(change.listedColumnIndices)

  const keptColumnIndices = change.columnOrder.filter(
    index => current.has(index) || !active.has(index),
  )
  const unlistedColumnIndices = currentColumnOrder.filter(
    index => !listed.has(index) && !change.columnOrder.includes(index),
  )

  return Array.from(new Set([...keptColumnIndices, ...unlistedColumnIndices]))
}
