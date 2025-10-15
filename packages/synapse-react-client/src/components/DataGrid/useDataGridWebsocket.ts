import { GridModel } from '@/components/DataGrid/DataGridTypes'
import { useCRDTModelView } from '@/components/DataGrid/useCRDTModelView'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DataGridWebSocket } from './DataGridWebSocket'
import { useEstablishWebsocketConnection } from '@/synapse-queries/grid/useEstablishWebsocketConnection'
import { useDocumentVisibility } from '@react-hookz/web'

/**
 * Custom hook to manage a DataGrid WebSocket connection.
 * Handles:
 *   - Fetching presigned URLs via a mutation hook
 *   - Instantiating the DataGridWebSocket
 *   - Connection status tracking
 *   - Reconnection on disconnect
 *   - Grid model updates and snapshot tracking
 */
export function useDataGridWebSocket() {
  const [model, setModel] = useState<GridModel | null>(null)
  const [isGridReady, setIsGridReady] = useState(false)
  // TODO: Connection status could be derived from a `useSyncExternalStore` subscribed to the WebSocket instance
  const [isConnected, setIsConnected] = useState(false)
  const [connectionParams, setConnectionParams] = useState<{
    replicaId: number
    sessionId: string
  } | null>(null)
  // Track the last connection parameters to detect changes - use ref to avoid callback recreation
  const lastConnectionParamsRef = useRef<{
    replicaId: number
    sessionId: string
  } | null>(null)

  // Keep a ref to current model to avoid stale closures
  const currentModelRef = useRef<GridModel | null>(model)

  // Update the ref whenever model changes
  useEffect(() => {
    currentModelRef.current = model
  }, [model])

  const modelSnapshot = useCRDTModelView(model)
  const [websocketInstance, setWebSocketInstance] =
    useState<DataGridWebSocket | null>(null)

  const isVisible = useDocumentVisibility()

  const {
    mutateAsync: establishWebsocketConnection,
    isPending: isEstablishingWebsocketConnection,
    error: errorEstablishingWebsocketConnection,
    presignedUrl,
  } = useEstablishWebsocketConnection()

  // Update model creation handler - only set model, don't reset to null on disconnect
  const handleModelCreate = useCallback((newModel: GridModel) => {
    setModel(newModel)
  }, [])

  // Memoize websocket options to prevent unnecessary re-renders (excluding model to avoid circular deps)
  const websocketOptionsWithoutModel = useMemo(
    () => ({
      onGridReady: () => setIsGridReady(true),
      onStatusChange: (open: boolean) => setIsConnected(open),
      onModelCreate: handleModelCreate,
    }),
    [handleModelCreate],
  )

  // Initiate (or re-initiate) a connection
  const connect = useCallback((replicaId: number, sessionId: string) => {
    const newParams = { replicaId, sessionId }
    const lastParams = lastConnectionParamsRef.current

    // Check if we're connecting to a different session/replica
    if (
      lastParams &&
      (lastParams.replicaId !== replicaId || lastParams.sessionId !== sessionId)
    ) {
      // Different connection - reset model to start fresh
      setModel(null)
    }

    // Reset grid ready state when initiating any new connection
    setIsGridReady(false)
    setConnectionParams(newParams)
    lastConnectionParamsRef.current = newParams
  }, [])

  const shouldEstablishWebsocketConnection = useMemo(
    () =>
      !!connectionParams &&
      !isConnected &&
      !isEstablishingWebsocketConnection &&
      !errorEstablishingWebsocketConnection &&
      isVisible,
    [
      connectionParams,
      isConnected,
      isEstablishingWebsocketConnection,
      errorEstablishingWebsocketConnection,
      isVisible,
    ],
  )

  const establishConnectionCallback = useCallback(() => {
    if (!shouldEstablishWebsocketConnection || !connectionParams) return

    // Always use the current model at connection time for reconnections to same session
    const modelToUse = currentModelRef.current

    establishWebsocketConnection({
      replicaId: connectionParams.replicaId,
      sessionId: connectionParams.sessionId,
      websocketOptions: {
        ...websocketOptionsWithoutModel,
        model: modelToUse,
      },
    })
      .then(ws => setWebSocketInstance(ws))
      .catch(err => console.error('Failed to establish WebSocket', err))
  }, [
    shouldEstablishWebsocketConnection,
    connectionParams,
    establishWebsocketConnection,
    websocketOptionsWithoutModel,
  ])

  /**
   * Establish the WebSocket connection when conditions are met.
   * Delegates to the mutation hook for presigned URL fetch, WebSocket creation, and retry logic.
   */
  useEffect(() => {
    establishConnectionCallback()
  }, [establishConnectionCallback])

  useEffect(() => {
    return () => {
      websocketInstance?.disconnect()
    }
  }, [websocketInstance])

  return {
    isConnected,
    websocketInstance,
    isGridReady,
    model,
    modelSnapshot,
    connect,
    presignedUrl,
  }
}
