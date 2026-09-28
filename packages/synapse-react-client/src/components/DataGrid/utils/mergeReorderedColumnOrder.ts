/**
 * Merges a reordered list of columns back into the grid's current column order.
 *
 * The reorder UI answers only for the columns it listed when it opened (`coveredColumnIndices`):
 * the model can gain columns while it is open, and a column it never showed was never the user's to
 * remove. Those unlisted indices are appended to the result so that saving a reorder cannot delete
 * them. Covered indices left out of `reorderedColumnIndices` were removed deliberately, so they
 * stay out.
 */
export function mergeReorderedColumnOrder({
  currentColumnOrder,
  reorderedColumnIndices,
  coveredColumnIndices,
}: {
  currentColumnOrder: number[]
  reorderedColumnIndices: number[]
  coveredColumnIndices: number[]
}): number[] {
  const covered = new Set(coveredColumnIndices)
  const reordered = new Set(reorderedColumnIndices)
  const unlistedColumnIndices = currentColumnOrder.filter(
    index => !covered.has(index) && !reordered.has(index),
  )
  return [...reorderedColumnIndices, ...unlistedColumnIndices]
}
