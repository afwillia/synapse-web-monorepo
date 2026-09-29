import { createWrapper } from '@/testutils/TestingLibraryUtils'
import { GridReplica, GridSession } from '@sage-bionetworks/synapse-client'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { s } from 'json-joy/lib/json-crdt-patch'
import { Model } from 'json-joy/lib/json-crdt'
import { createRef } from 'react'
import { GridModel, gridSchema } from './DataGridTypes'
import SynapseGrid, { SynapseGridHandle } from './SynapseGrid'
import { useCRDTModelView } from './useCRDTModelView'
import { useDataGridWebSocket } from './useDataGridWebsocket'
import useInitializeGridConnection from './useInitializeGridConnection'
import { useListGridReplicas } from '@/synapse-queries/grid/useGridSession'

vi.mock('./useDataGridWebsocket')
vi.mock('./useInitializeGridConnection')
// The spreadsheet and the chat are not part of the column-ordering flow under test
vi.mock('./DataGrid', () => ({ default: () => null }))
vi.mock('../SynapseChat/GridAgentChat', () => ({ default: () => null }))
vi.mock('@/synapse-queries/user/useUserBundle', async importActual => ({
  ...(await importActual<
    typeof import('@/synapse-queries/user/useUserBundle')
  >()),
  useGetCurrentUserBundle: vi.fn(() => ({
    data: { isCertified: true },
    isLoading: false,
  })),
}))
vi.mock('@/synapse-queries/grid/useGridSession', async importActual => ({
  ...(await importActual<
    typeof import('@/synapse-queries/grid/useGridSession')
  >()),
  useListGridReplicas: vi.fn(),
}))

const mockUseDataGridWebSocket = vi.mocked(useDataGridWebSocket)
const mockUseInitializeGridConnection = vi.mocked(useInitializeGridConnection)
const mockUseListGridReplicas = vi.mocked(useListGridReplicas)

const mockSession: GridSession = { sessionId: 'test-session' }
const mockReplica: GridReplica = { replicaId: 7 }

/** Builds a grid model whose columnNames line up with the given identity indices. */
function createModelWithColumns(
  columnNames: string[],
  columnOrder: number[],
): GridModel {
  const model = Model.create(gridSchema)
  setColumnNames(model, columnNames)
  model.api.arr(['columnOrder']).ins(
    0,
    columnOrder.map(index => s.con(index)),
  )
  return model
}

function setColumnNames(model: GridModel, columnNames: string[], offset = 0) {
  model.api
    .vec(['columnNames'])
    .set(columnNames.map((name, index) => [index + offset, s.con(name)]))
}

/**
 * Drives the component off a real CRDT model, so assertions can read the column order the grid
 * actually wrote back.
 */
function mockWebsocketWithModel(model: GridModel) {
  mockUseDataGridWebSocket.mockImplementation(() => ({
    isConnected: true,
    websocketInstance: {
      sendPatch: vi.fn(),
    } as unknown as ReturnType<
      typeof useDataGridWebSocket
    >['websocketInstance'],
    hasCompletedInitialSync: true,
    isSyncing: false,
    model,
    modelSnapshot: useCRDTModelView(model),
    connect: vi.fn(),
    presignedUrl: 'https://example.com/presigned-url',
    errorEstablishingWebsocketConnection: null,
    websocketError: null,
    hasSufficientData: true,
  }))
}

function renderGridWithSession(model: GridModel) {
  mockWebsocketWithModel(model)
  const user = userEvent.setup()
  const ref = createRef<SynapseGridHandle>()

  render(<SynapseGrid ref={ref} />, { wrapper: createWrapper() })
  act(() => {
    ref.current!.loadExistingSession(mockSession.sessionId!)
  })

  return user
}

describe('SynapseGrid', () => {
  beforeEach(() => {
    mockUseInitializeGridConnection.mockImplementation(
      options =>
        ({
          mutate: () =>
            options?.onSuccess?.(
              { session: mockSession, replica: mockReplica },
              { sessionId: mockSession.sessionId },
              undefined,
            ),
        }) as unknown as ReturnType<typeof useInitializeGridConnection>,
    )
    mockUseListGridReplicas.mockReturnValue({
      data: [],
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof useListGridReplicas>)
  })

  describe('saving the Reorder Columns dialog', () => {
    // The hub patches columnNames and columnOrder independently, so identity index 2 can reach
    // columnOrder before its name reaches columnNames. The reorder dialog only ever lists named
    // columns, so it opens knowing nothing about index 2 -- and REORDER_COLUMNS replaces the whole
    // order, so the save must not take the column with it.
    const createModelWithUnnamedColumn = () =>
      createModelWithColumns(['a', 'b'], [0, 1, 2])

    it('keeps a column the dialog never listed', async () => {
      const model = createModelWithUnnamedColumn()
      const user = renderGridWithSession(model)

      await user.click(
        await screen.findByRole('button', { name: /reorder columns/i }),
      )
      // The name arrives while the dialog is open, so the grid now has a third column
      act(() => {
        setColumnNames(model, ['c'], 2)
      })
      await user.click(screen.getByRole('button', { name: 'Save' }))

      expect(model.api.getSnapshot().columnOrder).toEqual([0, 1, 2])
    })

    it('applies the reorder the user made, and still keeps the unlisted column', async () => {
      const model = createModelWithUnnamedColumn()
      const user = renderGridWithSession(model)

      await user.click(
        await screen.findByRole('button', { name: /reorder columns/i }),
      )
      await user.click(screen.getByRole('button', { name: 'Move b up' }))
      await user.click(screen.getByRole('button', { name: 'Save' }))

      expect(model.api.getSnapshot().columnOrder).toEqual([1, 0, 2])
    })

    it('does not bring back a column removed elsewhere while the dialog was open', async () => {
      const model = createModelWithColumns(['a', 'b', 'c'], [0, 1, 2])
      const user = renderGridWithSession(model)

      await user.click(
        await screen.findByRole('button', { name: /reorder columns/i }),
      )
      // Another replica removes column b from the display order
      act(() => {
        model.api.arr(['columnOrder']).del(1, 1)
      })
      // The dialog still lists b, so c has to pass it to reach the front
      await user.click(screen.getByRole('button', { name: 'Move c up' }))
      await user.click(screen.getByRole('button', { name: 'Move c up' }))
      await user.click(screen.getByRole('button', { name: 'Save' }))

      // The move is honored, and b stays removed instead of coming back
      expect(model.api.getSnapshot().columnOrder).toEqual([2, 0])
    })

    it('writes the reordered columns when nothing is missing from the order', async () => {
      const model = createModelWithColumns(['a', 'b', 'c'], [0, 1, 2])
      const user = renderGridWithSession(model)

      await user.click(
        await screen.findByRole('button', { name: /reorder columns/i }),
      )
      await user.click(screen.getByRole('button', { name: 'Move c up' }))
      await user.click(screen.getByRole('button', { name: 'Save' }))

      expect(model.api.getSnapshot().columnOrder).toEqual([0, 2, 1])
    })
  })
})
