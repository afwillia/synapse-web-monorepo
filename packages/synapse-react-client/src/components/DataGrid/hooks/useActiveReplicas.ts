import { useEffect, useRef, useState } from 'react'
import { GridModel, GridModelSnapshot } from '../DataGridTypes'

/**
 * Determines which remote replicas have been active since the current user
 * connected by tracking advances in model.clock.peers.
 *
 * Strategy: when `hasCompletedInitialSync` first becomes true, snapshot every
 * peer's clock time as a "baseline".  Any peer whose clock time increases past
 * that baseline has written at least one CRDT operation (cell edit, row
 * create/delete, selection update) and is considered active.
 *
 * This approach covers bots (isAgentReplica: true) which never call
 * SET_SELECTION but do write row/cell data via UPDATE operations.
 */
export function useActiveReplicas(
  modelSnapshot: GridModelSnapshot | null,
  hasCompletedInitialSync: boolean,
  ownReplicaId: number | null,
  model: GridModel | null,
): Set<string> {
  // Clock times recorded at the moment initial sync completes: sid → time
  const baselineRef = useRef<Map<number, number> | null>(null)
  const [activeReplicas, setActiveReplicas] = useState<Set<string>>(new Set())

  // Reset when sync state is cleared (new session)
  useEffect(() => {
    if (!hasCompletedInitialSync) {
      baselineRef.current = null
      setActiveReplicas(new Set())
    }
  }, [hasCompletedInitialSync])

  // modelSnapshot is used only as a change signal: the effect body reads from
  // model.clock.peers directly, but we need to re-run whenever the model
  // advances. modelSnapshot is the stable React-state value that updates on
  // every model change, so it serves as the trigger.
  useEffect(() => {
    if (!hasCompletedInitialSync || !model) return

    const ownKey = ownReplicaId

    if (baselineRef.current === null) {
      // First snapshot after sync completes — record baseline clock times
      const clockPeers = new Map<number, number>()
      for (const [sid, ts] of model.clock.peers) {
        clockPeers.set(sid, ts.time)
      }
      baselineRef.current = clockPeers
      return
    }

    // Find peers whose clock has advanced past baseline
    const newlyActive: string[] = []
    for (const [sid, ts] of model.clock.peers) {
      if (sid === ownKey) continue
      const baselineTime = baselineRef.current.get(sid)
      if (baselineTime === undefined || ts.time > baselineTime) {
        newlyActive.push(sid.toString())
      }
    }

    if (newlyActive.length === 0) return

    setActiveReplicas(prev => {
      const next = new Set(prev)
      let changed = false
      for (const id of newlyActive) {
        if (!next.has(id)) {
          next.add(id)
          changed = true
        }
      }
      return changed ? next : prev
    })
  }, [modelSnapshot, hasCompletedInitialSync, ownReplicaId, model])

  return activeReplicas
}
