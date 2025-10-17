import { renderHook, act } from '@testing-library/react'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { useThrottledSendPatch } from './useThrottledSendPatch'
import type { DataGridWebSocket } from '../DataGridWebSocket'

const createMockWebSocket = () =>
  ({
    sendPatch: vi.fn(),
  } as unknown as DataGridWebSocket)

describe('useThrottledSendPatch', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('uses the most recent websocket instance when executing a trailing call', () => {
    const firstWebSocket = createMockWebSocket()
    const secondWebSocket = createMockWebSocket()

    const { result, rerender } = renderHook(
      ({ socket }: { socket: DataGridWebSocket | null }) =>
        useThrottledSendPatch(socket, 500),
      {
        initialProps: { socket: firstWebSocket },
      },
    )

    act(() => {
      result.current()
    })

    expect(firstWebSocket.sendPatch).toHaveBeenCalledTimes(1)
    expect(secondWebSocket.sendPatch).not.toHaveBeenCalled()

    rerender({ socket: secondWebSocket })

    act(() => {
      result.current()
    })

    expect(secondWebSocket.sendPatch).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(firstWebSocket.sendPatch).toHaveBeenCalledTimes(1)
    expect(secondWebSocket.sendPatch).toHaveBeenCalledTimes(1)
  })

  it('cancels pending work when the hook is unmounted', () => {
    const webSocket = createMockWebSocket()

    const { result, unmount } = renderHook(() =>
      useThrottledSendPatch(webSocket, 500),
    )

    act(() => {
      result.current()
      result.current()
    })

    expect(webSocket.sendPatch).toHaveBeenCalledTimes(1)

    unmount()

    act(() => {
      vi.runAllTimers()
    })

    expect(webSocket.sendPatch).toHaveBeenCalledTimes(1)
  })
})
