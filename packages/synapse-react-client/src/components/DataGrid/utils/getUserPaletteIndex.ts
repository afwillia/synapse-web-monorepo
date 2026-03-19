const NUM_PALETTE_SLOTS = 4

/**
 * Deterministically maps a user ID (createdBy principal ID) to a palette slot
 * 0–3 by hashing the string. The same user always gets the same color
 * regardless of which replica they're using or whether it's a human or bot
 * replica.
 */
export function getUserPaletteIndex(userId: string | undefined): number {
  if (!userId) return 0
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = (hash * 31 + userId.charCodeAt(i)) >>> 0
  }
  return hash % NUM_PALETTE_SLOTS
}
