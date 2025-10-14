import { GridModel } from '@/components/DataGrid/DataGridTypes'
import { DataGridWebSocket } from '@/components/DataGrid/DataGridWebSocket'
import { mocked } from '@storybook/test'
import { act, renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useDataGridWebSocket } from './useDataGridWebsocket'
import { Model } from 'json-joy/lib/json-crdt'
import { createWrapper } from '@/testutils/TestingLibraryUtils'

// Mock useCRDTModelView to just return the model passed in
vi.mock('./useCRDTModelView', () => ({
  useCRDTModelView: vi.fn(model =>
    model ? { snapshot: 'mockSnapshot', model } : undefined,
  ),
}))

// Mock useGridPresignedUrl
vi.mock('@/synapse-queries/grid/useGridPresignedUrl', () => ({
  useGridPresignedUrl: () => ({
    mutateAsync: vi.fn().mockResolvedValue('ws://mocked-url'),
  }),
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
  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useDataGridWebSocket(), {
      wrapper: createWrapper(),
    })
    expect(result.current.model).toBeNull()
    expect(result.current.isConnected).toBe(false)
    expect(result.current.websocketInstance).toBeNull()
    expect(result.current.isGridReady).toBe(false)
    expect(result.current.modelSnapshot).toBeUndefined()
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
})
