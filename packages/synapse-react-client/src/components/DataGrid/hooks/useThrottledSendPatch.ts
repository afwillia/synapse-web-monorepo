import { useEffect, useMemo, useRef } from 'react'
import throttle from 'lodash-es/throttle'
import type { DebouncedFunc } from 'lodash-es'
import type { DataGridWebSocket } from '../DataGridWebSocket'

export function useThrottledSendPatch(
  websocketInstance: DataGridWebSocket | null,
  wait = 250,
): DebouncedFunc<() => void> {
  const websocketInstanceRef = useRef<DataGridWebSocket | null>(null)

  useEffect(() => {
    websocketInstanceRef.current = websocketInstance
    return () => {
      websocketInstanceRef.current = null
    }
  }, [websocketInstance])

  const throttledSendPatch = useMemo(
    () =>
      throttle(() => {
        const socket = websocketInstanceRef.current
        if (!socket) {
          return
        }
        try {
          socket.sendPatch()
        } catch (error) {
          console.error('Failed to send patch', error)
        }
      }, wait),
    [wait],
  )

  useEffect(() => {
    return () => {
      throttledSendPatch.cancel()
    }
  }, [throttledSendPatch])

  return throttledSendPatch
}

export default useThrottledSendPatch
