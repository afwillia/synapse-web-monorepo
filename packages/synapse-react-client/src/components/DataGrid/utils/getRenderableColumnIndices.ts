/**
 * Filters column identity indices down to the ones the grid can render: each index must resolve to a
 * name in `columnNames`, and a repeated index is kept only the first time it appears.
 *
 * A column's header, width, and row data are all resolved through its name, so an index without one
 * cannot be rendered. The hub patches `columnNames` and `columnOrder` independently, and a render can
 * observe the state between those patches: an index whose name has not arrived yet, or one whose name
 * slot has been unset (a json-joy vector reports an unset slot as `undefined` rather than shortening
 * itself).
 *
 * Indices repeat when two replicas reorder the same list at the same time and the CRDT keeps both of
 * their insertions. Collapsing them here means the grid shows each column once until the next write
 * normalizes the stored order.
 */
export function getRenderableColumnIndices(
  columnNames: string[],
  columnIndices: number[],
): number[] {
  const seen = new Set<number>()
  return columnIndices.filter(index => {
    if (!columnNames[index] || seen.has(index)) {
      return false
    }
    seen.add(index)
    return true
  })
}
