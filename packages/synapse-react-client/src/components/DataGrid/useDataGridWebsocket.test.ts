import { GridModel } from '@/components/DataGrid/DataGridTypes'
import { DataGridWebSocket } from '@/components/DataGrid/DataGridWebSocket'
import { mocked } from '@storybook/test'
import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { useDataGridWebSocket } from './useDataGridWebsocket'
import { Model } from 'json-joy/lib/json-crdt'
import { createWrapper } from '@/testutils/TestingLibraryUtils'

// Mock useCRDTModelView to just return the model passed in
vi.mock('./useCRDTModelView', () => ({
  useCRDTModelView: vi.fn(model =>
    model ? { snapshot: 'mockSnapshot', model } : undefined,
  ),
}))

const fetchPresignedUrlMock = vi.fn()

vi.mock('@/synapse-queries/grid/useGridPresignedUrl', () => ({
  useGridPresignedUrl: () => ({
    mutateAsync: fetchPresignedUrlMock,
  }),
}))

type DocumentVisibility =
  | 'visible'
  | 'hidden'
  | 'prerender'
  | 'unloaded'
  | undefined

let documentVisibilityState: DocumentVisibility = 'visible'

vi.mock('@react-hookz/web', () => ({
  useDocumentVisibility: vi.fn(() => documentVisibilityState === 'visible'),
}))

// Mock DataGridWebSocket
vi.mock('./DataGridWebSocket', () => ({
  DataGridWebSocket: vi
    .fn()
    .mockImplementation((config: any, _instance?: any) => ({
      ...config,
      socket: { readyState: WebSocket.OPEN },
      sendPatch: vi.fn(),
      disconnect: vi.fn(),
      getModel: vi.fn().mockReturnValue(null), // Add getModel method
    })),
}))

const MockDataGridWebSocket = mocked(DataGridWebSocket)

describe('useDataGridWebSocket', () => {
  beforeEach(() => {
    fetchPresignedUrlMock.mockReset()
    fetchPresignedUrlMock.mockResolvedValue('ws://mocked-url')
    MockDataGridWebSocket.mockClear()
    documentVisibilityState = 'visible'
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })
    expect(result.current.model).toBeNull()
    expect(result.current.isConnected).toBe(false)
    expect(result.current.websocketInstance).toBeNull()
    expect(result.current.isGridReady).toBe(false)
    expect(result.current.modelSnapshot).toBeUndefined()
    expect(result.current.errorEstablishingWebsocketConnection).toBeNull()
  })

  it('should create websocket and update state via callbacks', async () => {
    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    // Trigger WebSocket creation
    act(() => {
      result.current.connect(123, 'ws://test')
    })

    // Wait for the websocket instance to be assigned
    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
    })

    // Simulate onGridReady
    act(() => {
      MockDataGridWebSocket.mock.lastCall![0].onGridReady!()
    })
    expect(result.current.isGridReady).toBe(true)

    // Simulate onStatusChange
    act(() => {
      MockDataGridWebSocket.mock.lastCall![0].onStatusChange!(
        true,
        result.current.websocketInstance!,
      )
    })
    expect(result.current.isConnected).toBe(true)

    // Simulate onModelCreate
    const fakeModel = { foo: 'bar' }
    act(() => {
      MockDataGridWebSocket.mock.lastCall![0].onModelCreate!(
        fakeModel as unknown as GridModel,
      )
    })
    expect(result.current.model).toEqual(fakeModel)
    // modelSnapshot should reflect mocked useCRDTModelView
    expect(result.current.modelSnapshot).toEqual({
      snapshot: 'mockSnapshot',
      model: fakeModel,
    })
  })

  it('should not re-request a websocket while the previous attempt is opening', async () => {
    let resolveFetch: ((value: string) => void) | undefined
    fetchPresignedUrlMock.mockImplementationOnce(
      () =>
        new Promise<string>(resolve => {
          resolveFetch = resolve
        }),
    )

    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.connect(999, 'session-pending')
    })

    await waitFor(() => expect(fetchPresignedUrlMock).toHaveBeenCalledTimes(1))
    expect(resolveFetch).toBeDefined()

    await act(async () => {
      resolveFetch?.('ws://pending-url')
      await Promise.resolve()
    })

    let initialWebsocketCallCount = 0
    let initialFetchCallCount = 0

    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
      initialWebsocketCallCount = MockDataGridWebSocket.mock.calls.length
      initialFetchCallCount = fetchPresignedUrlMock.mock.calls.length
      expect(initialWebsocketCallCount).toBeGreaterThanOrEqual(1)
      expect(initialFetchCallCount).toBeGreaterThanOrEqual(1)
    })

    expect(result.current.isConnected).toBe(false)

    await new Promise(resolve => setTimeout(resolve, 0))

    expect(fetchPresignedUrlMock).toHaveBeenCalledTimes(initialFetchCallCount)
    expect(MockDataGridWebSocket).toHaveBeenCalledTimes(
      initialWebsocketCallCount,
    )
  })

  it('should replace an existing websocket if connect is called again', async () => {
    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    // First connection
    act(() => {
      result.current.connect(1, 'ws://a')
    })

    // Wait for first websocket instance to be created
    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
    })

    const firstInstance = result.current.websocketInstance!

    // Second connection (should replace the first)
    act(() => {
      result.current.connect(2, 'ws://b')
    })

    // Wait for second websocket instance to be created
    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBe(firstInstance)
    })

    expect(firstInstance.disconnect).toHaveBeenCalled()
    expect(result.current.websocketInstance).not.toBe(firstInstance)
    // Second instance should not be disconnected yet
    expect(result.current.websocketInstance!.disconnect).not.toHaveBeenCalled()
  })

  it('should disconnect stale websocket results when superseded by a newer attempt', async () => {
    let resolveStale: ((value: string) => void) | undefined

    fetchPresignedUrlMock.mockImplementation(({ sessionId }) => {
      if (sessionId === 'session-stale') {
        return new Promise<string>(resolve => {
          resolveStale = resolve
        })
      }
      if (sessionId === 'session-active') {
        return Promise.resolve('ws://active-url')
      }
      return Promise.resolve('ws://mocked-url')
    })

    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.connect(1, 'session-stale')
    })

    await waitFor(() => expect(fetchPresignedUrlMock).toHaveBeenCalledTimes(1))
    expect(resolveStale).toBeDefined()

    act(() => {
      result.current.connect(1, 'session-active')
    })

    await waitFor(() => expect(fetchPresignedUrlMock).toHaveBeenCalledTimes(2))

    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
    })

    const activeInstance = result.current.websocketInstance!
    const callCountBeforeResolvingStale =
      MockDataGridWebSocket.mock.calls.length

    expect(activeInstance.disconnect).not.toHaveBeenCalled()

    await act(async () => {
      resolveStale?.('ws://stale-url')
      await Promise.resolve()
    })

    await waitFor(() =>
      expect(MockDataGridWebSocket.mock.calls.length).toBe(
        callCountBeforeResolvingStale + 1,
      ),
    )

    const staleInstance = MockDataGridWebSocket.mock.results.at(-1)!
      .value as ReturnType<typeof MockDataGridWebSocket>

    expect(staleInstance.disconnect).toHaveBeenCalledTimes(1)
    expect(result.current.websocketInstance).toBe(activeInstance)
  })

  it('should call disconnect on unmount', async () => {
    const { result, unmount } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    // Establish a websocket connection
    act(() => {
      result.current.connect(1, 'ws://a')
    })

    // Wait for the websocket instance to be created
    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
    })

    const websocketInstance = result.current.websocketInstance!

    // call under test
    act(() => {
      unmount()
    })

    // Verify disconnect was called (unmounting destroys all state, but cleanup ran)
    expect(websocketInstance.disconnect).toHaveBeenCalled()
  })

  it('should persist model across reconnections to same session/replica', async () => {
    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    const testModel = Model.create({ foo: 'bar' }) as unknown as GridModel

    // First connection
    act(() => {
      result.current.connect(1, 'session-123')
    })

    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
    })

    // Simulate model creation
    act(() => {
      MockDataGridWebSocket.mock.lastCall![0].onModelCreate!(testModel)
    })

    expect(result.current.model).toEqual(testModel)

    // Mock getModel to return the test model for cleanup
    const firstInstance = result.current.websocketInstance!
    firstInstance.getModel = vi.fn().mockReturnValue(testModel)

    // Simulate reconnection to same session/replica
    act(() => {
      result.current.connect(1, 'session-123')
    })

    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBe(firstInstance)
    })

    // Verify that the new WebSocket instance was created with the persisted model
    const lastCall = MockDataGridWebSocket.mock.lastCall![0]
    expect(lastCall.model).toEqual(testModel)
  })

  it('should reset model when connecting to different session/replica', async () => {
    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    const testModel = Model.create({ foo: 'bar' }) as unknown as GridModel

    // First connection to session-123, replica 1
    act(() => {
      result.current.connect(1, 'session-123')
    })

    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
    })

    // Simulate model creation
    act(() => {
      MockDataGridWebSocket.mock.lastCall![0].onModelCreate!(testModel)
    })

    expect(result.current.model).toEqual(testModel)

    // Connect to different session
    act(() => {
      result.current.connect(1, 'session-456')
    })

    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
    })

    // Model should be reset and new connection should start with null
    const lastCall = MockDataGridWebSocket.mock.lastCall![0]
    expect(lastCall.model).toBeNull()

    // Reset model for next test
    act(() => {
      MockDataGridWebSocket.mock.lastCall![0].onModelCreate!(testModel)
    })

    // Connect to different replica (same session)
    act(() => {
      result.current.connect(2, 'session-456')
    })

    await waitFor(() => {
      expect(result.current.websocketInstance).not.toBeNull()
    })

    // Model should be reset again
    const finalCall = MockDataGridWebSocket.mock.lastCall![0]
    expect(finalCall.model).toBeNull()
  })

  it('should not connect while document is hidden', async () => {
    documentVisibilityState = 'hidden'

    const { result, rerender } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.connect(1, 'session-visibility')
    })

    expect(fetchPresignedUrlMock).not.toHaveBeenCalled()

    documentVisibilityState = 'visible'

    act(() => {
      rerender()
    })

    await waitFor(() => expect(fetchPresignedUrlMock).toHaveBeenCalled())
  })

  it('should clear presignedUrl when switching to a new session', async () => {
    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })

    act(() => {
      result.current.connect(1, 'session-1')
    })

    await waitFor(() =>
      expect(result.current.presignedUrl).toBe('ws://mocked-url'),
    )

    fetchPresignedUrlMock.mockResolvedValue('ws://mocked-url-2')

    act(() => {
      result.current.connect(2, 'session-2')
    })

    expect(result.current.presignedUrl).toBeNull()

    await waitFor(() =>
      expect(result.current.presignedUrl).toBe('ws://mocked-url-2'),
    )
  })
})
