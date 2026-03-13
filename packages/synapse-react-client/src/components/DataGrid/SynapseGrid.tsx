import GridMenuButton from '@/components/DataGrid/components/GridMenuButton/GridMenuButton'
import UploadCsvToGridButton from '@/components/DataGrid/components/UploadCsvToGridButton'
import ExportCsvFromGridButton from '@/components/DataGrid/components/ExportCsvFromGridButton'
import useGetSchemaForGrid from '@/components/DataGrid/hooks/useGetSchemaForGrid'
import MergeGridWithSourceTableButton from '@/components/DataGrid/MergeGridWithSourceTableButton'
import computeReplicaSelectionModel from '@/components/DataGrid/utils/computeReplicaSelectionModel'
import {
  resolveRemoteSelections,
  RemotePresenceInfo,
} from '@/components/DataGrid/utils/resolveRemoteSelections'
import { getUserPaletteIndex } from '@/components/DataGrid/utils/getUserPaletteIndex'
import { useFlashTracker } from '@/components/DataGrid/hooks/useFlashTracker'
import { useActiveReplicas } from '@/components/DataGrid/hooks/useActiveReplicas'
import PresenceToolbar from '@/components/DataGrid/components/PresenceToolbar'
import modelRowsToGrid from '@/components/DataGrid/utils/modelRowsToGrid'
import { SkeletonTable } from '@/components/index'
import { useGetEntity } from '@/synapse-queries/index'
import { getSchemaPropertiesInfo } from '@/utils/jsonschema/getSchemaPropertyInfo'
import { SmartToyTwoTone } from '@mui/icons-material'
import { Stack } from '@mui/material'
import Grid from '@mui/material/Grid'
import {
  CreateGridRequest,
  GridSession,
} from '@sage-bionetworks/synapse-client'
import { useGetGridReplicas } from '@/synapse-queries/grid/useGridSession'
import { ClickableJsonCrdt } from 'clickable-json'
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { DataSheetGridRef } from '@sage-bionetworks/react-datasheet-grid'
import { SelectionWithId } from '@sage-bionetworks/react-datasheet-grid'
import GridAgentChat from '../SynapseChat/GridAgentChat'
import DataGrid from './DataGrid'
import { DataGridRow, GridModel, Operation } from './DataGridTypes'
import { useGridUndoRedo } from './hooks/useGridUndoRedo'
import { StartGridSession, StartGridSessionHandle } from './StartGridSession'
import { useDataGridWebSocket } from './useDataGridWebsocket'
import { applyModelChange, ModelChange } from './utils/applyModelChange'
import { removeNoOpOperations } from './utils/DataGridUtils'
import { mapOperationsToModelChanges } from './utils/mapOperationsToModelChanges'
import { useGetCurrentUserBundle } from '@/synapse-queries'
import CertificationRequirement from '@/components/AccessRequirementList/RequirementItem/CertificationRequirement'
import { ValidationAlert } from './components/ValidationAlert'

export type SynapseGridProps = {
  agentRegistrationId?: string
  showDebugInfo?: boolean
}

export type SynapseGridHandle = {
  initializeGrid: (request: CreateGridRequest) => void
  loadExistingSession: (sessionId: string) => void
}

const SynapseGrid = forwardRef<SynapseGridHandle, SynapseGridProps>(
  ({ agentRegistrationId, showDebugInfo = false }, ref) => {
    const [session, setSession] = useState<GridSession | null>(null)
    const [replicaId, setReplicaId] = useState<number | null>(null)
    const [chatOpen, setChatOpen] = useState(false)
    const [lastSelection, setLastSelection] = useState<SelectionWithId | null>(
      null,
    )

    const startGridSessionRef = useRef<StartGridSessionHandle | null>(null)
    const gridRef = useRef<DataSheetGridRef | null>(null)

    const { data: userBundle, isLoading } = useGetCurrentUserBundle()

    useImperativeHandle(
      ref,
      () => ({
        initializeGrid: (request: CreateGridRequest) => {
          if (startGridSessionRef.current) {
            startGridSessionRef.current.handleStartSession(request)
          }
        },
        loadExistingSession: (sessionId: string) => {
          if (startGridSessionRef.current) {
            startGridSessionRef.current.handleLoadSession(sessionId)
          }
        },
      }),
      [],
    )

    // WebSocket state
    const {
      isConnected,
      websocketInstance,
      hasCompletedInitialSync,
      model,
      modelSnapshot,
      connect,
      presignedUrl,
      hasSufficientData,
    } = useDataGridWebSocket()

    const websocketInstanceRef = useRef<typeof websocketInstance | null>(null)

    useEffect(() => {
      websocketInstanceRef.current = websocketInstance
    }, [websocketInstance])

    // Track last connection parameters to avoid redundant connections
    const lastConnectParamsRef = useRef<{
      replicaId: number
      sessionId: string
    } | null>(null)

    useEffect(() => {
      if (
        replicaId === null ||
        replicaId === undefined ||
        !session?.sessionId
      ) {
        lastConnectParamsRef.current = null
        return
      }

      const nextParams = {
        replicaId,
        sessionId: session.sessionId,
      }

      const prevParams = lastConnectParamsRef.current

      if (
        prevParams &&
        prevParams.replicaId === nextParams.replicaId &&
        prevParams.sessionId === nextParams.sessionId
      ) {
        return
      }

      lastConnectParamsRef.current = nextParams
      connect(replicaId, session.sessionId)
    }, [replicaId, session?.sessionId, connect])

    // Reset grid state when model is reset (new session/replica)
    useEffect(() => {
      if (model === null) {
        // Clear any grid-specific state when starting a new session
        setLastSelection(null)
        // Clear active cell if grid exists
        if (gridRef.current) {
          gridRef.current.setActiveCell(null)
        }
      }
    }, [model])

    const jsonSchema = useGetSchemaForGrid(session)

    // Grid behaves differently for views vs recordSets
    // Note for future: can get modifiedOn to refresh grid when view changes
    const { data: entityData } = useGetEntity(
      session?.sourceEntityId,
      undefined,
      {
        enabled: !!session?.sourceEntityId,
      },
    )

    const entityIsView =
      entityData?.concreteType ===
      'org.sagebionetworks.repo.model.table.EntityView'

    // Process schema properties once
    const schemaPropertiesInfo = useMemo(() => {
      return getSchemaPropertiesInfo(jsonSchema ?? null)
    }, [jsonSchema])

    const connectionStatus = isConnected ? 'Connected' : 'Disconnected'

    // Transform the model view rows and columns to DataSheetGrid format
    const rowValues = useMemo(
      () => (modelSnapshot ? modelRowsToGrid(model, modelSnapshot) : []),
      [model, modelSnapshot],
    )

    // Only show replicas that have made changes since the current user connected
    const activeReplicaIds = useActiveReplicas(
      modelSnapshot,
      hasCompletedInitialSync,
      replicaId,
      model,
    )

    // Fetch GridReplica metadata (isAgentReplica) for each active remote replica
    const replicaMetadata = useGetGridReplicas(
      session?.sessionId,
      activeReplicaIds,
    )

    const allRemotePresence = useMemo(
      () =>
        model && modelSnapshot && replicaId != null
          ? resolveRemoteSelections(
              model,
              modelSnapshot,
              replicaId,
              replicaMetadata,
            )
          : [],
      [model, modelSnapshot, replicaId, replicaMetadata],
    )

    const remotePresence = useMemo(
      () => allRemotePresence.filter(p => activeReplicaIds.has(p.replicaId)),
      [allRemotePresence, activeReplicaIds],
    )

    // Build presence entries for bots that have made changes (they never have a
    // selection, so they don't appear in remotePresence via resolveRemoteSelections).
    const botPresence = useMemo(() => {
      const result: RemotePresenceInfo[] = []
      for (const replicaIdStr of activeReplicaIds) {
        const meta = replicaMetadata.get(replicaIdStr)
        if (!meta?.isAgentReplica) continue
        if (remotePresence.some(p => p.replicaId === replicaIdStr)) continue
        result.push({
          replicaId: replicaIdStr,
          createdBy: meta.createdBy,
          isHuman: false,
          paletteIndex: getUserPaletteIndex(meta.createdBy),
          rowIndices: [],
          colIndices: [],
          rowSelectAll: false,
          columnSelectAll: false,
        })
      }
      return result
    }, [activeReplicaIds, replicaMetadata, remotePresence])

    const allPresence = useMemo(
      () => [...remotePresence, ...botPresence],
      [remotePresence, botPresence],
    )

    // Tracks the most recent local operations so useFlashTracker can exclude own edits
    // Declared here (before useFlashTracker) so it's in scope for both
    const lastLocalOpsRef = useRef<Operation[] | null>(null)

    const recentlyChangedCells = useFlashTracker(
      rowValues,
      hasCompletedInitialSync,
      lastLocalOpsRef,
      model,
      replicaMetadata,
    )

    const commit = useCallback(() => {
      if (!isConnected || !websocketInstanceRef.current) {
        return
      }

      websocketInstanceRef.current.sendPatch()
    }, [isConnected, websocketInstanceRef])

    useEffect(() => {
      if (isConnected) {
        commit()
      }
    }, [isConnected, commit])

    const applyAndCommitChanges = useCallback(
      (model: GridModel, modelChanges: ModelChange[]) => {
        // Apply each change to the model
        modelChanges.forEach(change => {
          applyModelChange(model, change, schemaPropertiesInfo)
        })

        commit()
      },
      [commit, schemaPropertiesInfo],
    )

    const applyModelChangeFromUndoRedo = useCallback(
      (change: ModelChange) => {
        if (!model) {
          console.error('Model is not initialized')
          return
        }

        if (change.type === 'DELETE' && gridRef.current) {
          // The user may have set a cell as active that we are removing with an 'undo'. In that case, clear the active state
          gridRef.current.setActiveCell(null)
        }

        applyAndCommitChanges(model, [change])
      },
      [model, applyAndCommitChanges],
    )

    const { undoUI, redoUI, addOperationsToUndoStack, clearRedoStack } =
      useGridUndoRedo(applyModelChangeFromUndoRedo)

    const handleChange = useCallback(
      (newValue: DataGridRow[], operations: Operation[]) => {
        if (!model) {
          console.error('Model is not initialized')
          return
        }

        // Check that something changed before updating the model
        operations = removeNoOpOperations(newValue, rowValues, operations)

        if (operations.length > 0) {
          // Record local ops before applying so useFlashTracker can filter them out
          lastLocalOpsRef.current = operations

          // Clear redo stack since new changes invalidate redo history
          clearRedoStack()

          // Track row creation, updates, and deletions to keep UI state and undo history in sync

          // Add all operations to the undo stack
          addOperationsToUndoStack(operations, rowValues, newValue)

          // Transform operations to model changes
          const modelChanges = mapOperationsToModelChanges(operations, newValue)

          applyAndCommitChanges(model, modelChanges)
        }
      },
      [
        model,
        rowValues,
        clearRedoStack,
        addOperationsToUndoStack,
        applyAndCommitChanges,
      ],
    )

    const handleSelectionChange = useCallback(
      (opts: { selection: SelectionWithId | null }) => {
        const { selection } = opts
        if (selection != null) {
          setLastSelection(selection)

          if (model != null && replicaId != null) {
            const replicaSelectionModel = computeReplicaSelectionModel(
              selection,
              model,
            )
            // insert it into the CRDT Model
            applyAndCommitChanges(model, [
              {
                type: 'SET_SELECTION',
                replicaId: replicaId.toString(),
                selection: replicaSelectionModel,
              },
            ])
          }
        }
      },
      [applyAndCommitChanges, model, replicaId],
    )

    // Track selected row index for validation display
    const selectedRowIndexRef = useRef<number | null>(null)
    const [, forceUpdate] = useState({})

    const handleSelectedRowChange = useCallback(
      (rowIndex: number | null, _row: DataGridRow | null) => {
        selectedRowIndexRef.current = rowIndex
        forceUpdate({}) // Force re-render to update validation display
      },
      [],
    )

    if (!isLoading && !userBundle?.isCertified) {
      return <CertificationRequirement />
    }

    return (
      <div>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, xl: 8 }}>
            <StartGridSession
              ref={startGridSessionRef}
              onSessionChange={setSession}
              onReplicaChange={setReplicaId}
              show={showDebugInfo}
            />
          </Grid>
          {/* Debug Information */}
          <Grid size={{ xs: 12, xl: 4 }}>
            {showDebugInfo && (
              <div>
                <p>Session ID: {session?.sessionId || 'No session created'}</p>
                <p>Replica ID: {replicaId || 'No replica created'}</p>
                <p>
                  Source Entity ID:{' '}
                  {session?.sourceEntityId || 'No source entity'}
                </p>
                <p>
                  JSON Schema $id:{' '}
                  {session?.gridJsonSchema$Id ||
                    'No schema attached to session'}
                </p>
                <p>
                  Presigned URL:{' '}
                  {presignedUrl
                    ? presignedUrl.substring(0, 30) +
                      (presignedUrl.length > 30
                        ? ' ... ' +
                          presignedUrl.substring(presignedUrl.length - 10)
                        : '')
                    : 'No URL generated'}
                </p>
                <p>
                  WebSocket Status:{' '}
                  <span style={{ color: isConnected ? 'green' : 'red' }}>
                    {connectionStatus}
                  </span>
                </p>
              </div>
            )}
          </Grid>

          {session && (
            <>
              {/* Grid Loading State */}
              {!hasSufficientData && (
                <Grid size={12}>
                  <h3>Setting up grid...</h3>
                  <div style={{ marginBottom: '10px' }}>
                    {!session && <p>Creating grid session...</p>}
                    {session && !replicaId && (
                      <p>Setting up real-time sync...</p>
                    )}
                    {session && replicaId && !presignedUrl && (
                      <p>Establishing secure connection...</p>
                    )}
                    {session && replicaId && presignedUrl && !isConnected && (
                      <p>Connecting to server...</p>
                    )}
                    {isConnected && !hasCompletedInitialSync && (
                      <p>Loading table data...</p>
                    )}
                    <SkeletonTable numRows={4} numCols={1} />
                  </div>
                </Grid>
              )}
              {/* Grid */}
              {hasSufficientData && (
                <>
                  <Grid size={12}>
                    <Stack
                      direction={'row'}
                      spacing={1}
                      sx={{ justifyContent: 'flex-end' }}
                    >
                      <PresenceToolbar remotePresence={allPresence} />
                      {undoUI}
                      {redoUI}
                      <GridMenuButton
                        variant={'outlined'}
                        onClick={() => setChatOpen(true)}
                        startIcon={<SmartToyTwoTone />}
                      >
                        Open chat
                      </GridMenuButton>
                      <GridAgentChat
                        agentRegistrationId={agentRegistrationId}
                        open={chatOpen}
                        onClose={() => setChatOpen(false)}
                        gridSessionId={session.sessionId!}
                        usersReplicaId={replicaId!}
                        chatbotName="Grid Assistant"
                      />
                      {session.sourceEntityId && (
                        <UploadCsvToGridButton
                          sourceEntityId={session.sourceEntityId}
                          gridSessionId={session.sessionId!}
                        />
                      )}
                      {session.sessionId && (
                        <ExportCsvFromGridButton
                          gridSessionId={session.sessionId}
                          filename={
                            'grid-' + (session.sourceEntityId || 'export')
                          }
                        />
                      )}
                      {session.sourceEntityId && (
                        <MergeGridWithSourceTableButton
                          sourceEntityId={session.sourceEntityId}
                          gridSessionId={session.sessionId!}
                        />
                      )}
                    </Stack>
                  </Grid>
                  <Grid size={12}>
                    <DataGrid
                      gridRef={gridRef}
                      rowValues={rowValues}
                      columnNames={modelSnapshot?.columnNames ?? []}
                      columnOrder={modelSnapshot?.columnOrder ?? []}
                      schemaPropertiesInfo={schemaPropertiesInfo}
                      entityIsView={entityIsView}
                      jsonSchema={jsonSchema}
                      lastSelection={lastSelection}
                      handleChange={handleChange}
                      handleSelectionChange={handleSelectionChange}
                      onSelectedRowChange={handleSelectedRowChange}
                      remotePresence={remotePresence}
                      recentlyChangedCells={recentlyChangedCells}
                    />
                  </Grid>
                  <Grid size={12}>
                    <ValidationAlert
                      selectedRowIndex={selectedRowIndexRef.current}
                      rowValues={rowValues}
                    />
                  </Grid>
                </>
              )}
              {/* Debug Model Snapshot */}
              {showDebugInfo && (
                <Grid
                  size={12}
                  style={{
                    margin: '10px 0',
                    padding: '10px',
                    border: '1px solid #ccc',
                    maxHeight: '400px',
                    overflowY: 'auto',
                  }}
                >
                  <h3>Model</h3>
                  {model ? (
                    <ClickableJsonCrdt model={model} />
                  ) : (
                    'No model available'
                  )}
                </Grid>
              )}
            </>
          )}
        </Grid>
      </div>
    )
  },
)

export default SynapseGrid
