import CuratorDashboardContent from './CuratorDashboard'
import { useGetCurationTasksInfinite } from '@/synapse-queries/curation/task/useCurationTask'
import { createMockTaskBundle } from '@/mocks/curation/mockCurationTask'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { RouterProvider, createMemoryRouter, RouteObject } from 'react-router'
import { beforeEach, describe, it, expect, vi } from 'vitest'

vi.mock('@/synapse-queries/curation/task/useCurationTask', () => ({
  useGetCurationTasksInfinite: vi.fn(),
}))

vi.mock(
  '@/features/team/invitation/components/OpenInvitationsToUserCard',
  () => ({
    default: () => <div data-testid="open-invitations">Open Invitations</div>,
  }),
)

vi.mock('./components/CurationTaskCard', () => ({
  default: ({ taskBundle }: { taskBundle: any }) => (
    <div data-testid={`task-card-${taskBundle.task.taskId}`}>
      Task: {taskBundle.task.taskId}
    </div>
  ),
}))

const mockUseGetCurationTasksInfinite = vi.mocked(useGetCurationTasksInfinite)

interface RenderOptions {
  initialEntry?: string
}

const renderWithRouter = (options: RenderOptions = {}) => {
  const { initialEntry = '/?taskIds=' } = options

  const routes: RouteObject[] = [
    {
      path: '/',
      element: <CuratorDashboardContent />,
    },
  ]

  const router = createMemoryRouter(routes, {
    initialEntries: [initialEntry],
  })

  return render(<RouterProvider router={router} />)
}

describe('CuratorDashboard', () => {
  let mockTaskBundle1: any
  let mockTaskBundle2: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockTaskBundle1 = createMockTaskBundle({ projectId: 'syn123' })
    mockTaskBundle2 = createMockTaskBundle({ projectId: 'syn456' })
    // Ensure different taskIds to avoid key warnings
    if (mockTaskBundle1.task && mockTaskBundle2.task) {
      mockTaskBundle1.task.taskId = '123'
      mockTaskBundle2.task.taskId = '456'
    }
  })

  it('renders the page header', () => {
    mockUseGetCurationTasksInfinite.mockReturnValue({
      data: { pages: [] },
      isLoading: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    } as any)

    renderWithRouter()
    expect(screen.getByText('On Your Radar')).toBeInTheDocument()
  })

  describe('tabs', () => {
    beforeEach(() => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)
    })

    it('renders a tab for Tasks, Projects, Datasets, and Metrics', () => {
      renderWithRouter()

      expect(screen.getByRole('tab', { name: 'Tasks' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Projects' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Datasets' })).toBeInTheDocument()
      expect(screen.getByRole('tab', { name: 'Metrics' })).toBeInTheDocument()
    })

    it('shows the Tasks tab content by default', () => {
      renderWithRouter()

      expect(screen.getByRole('tab', { name: 'Tasks' })).toHaveAttribute(
        'aria-selected',
        'true',
      )
      expect(screen.getByText('On Your Radar')).toBeInTheDocument()
    })

    it('shows placeholder content and hides the Tasks content when another tab is selected', async () => {
      const user = userEvent.setup()
      renderWithRouter()

      await user.click(screen.getByRole('tab', { name: 'Projects' }))

      expect(screen.getByRole('tab', { name: 'Projects' })).toHaveAttribute(
        'aria-selected',
        'true',
      )
      expect(screen.queryByText('On Your Radar')).not.toBeInTheDocument()
      expect(screen.getByText('Projects coming soon.')).toBeInTheDocument()
    })
  })

  it('renders open invitations card', () => {
    mockUseGetCurationTasksInfinite.mockReturnValue({
      data: { pages: [] },
      isLoading: false,
      hasNextPage: false,
      isFetchingNextPage: false,
      fetchNextPage: vi.fn(),
    } as any)

    renderWithRouter()
    expect(screen.getByTestId('open-invitations')).toBeInTheDocument()
  })

  describe('taskId search parameter', () => {
    it('passes taskIds array from URL search params to the hook', async () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [{ bundlePage: [mockTaskBundle1] }] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/?taskIds=123' })

      await waitFor(() => {
        expect(mockUseGetCurationTasksInfinite).toHaveBeenCalledWith(
          expect.objectContaining({
            taskIds: [123],
            assignedToMe: true,
          }),
        )
      })
    })

    it('passes undefined when taskId param is not set', async () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/' })

      await waitFor(() => {
        expect(mockUseGetCurationTasksInfinite).toHaveBeenCalledWith(
          expect.objectContaining({
            taskIds: undefined,
            assignedToMe: true,
          }),
        )
      })
    })

    it('passes multiple taskIds as array when comma-separated', async () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: {
          pages: [{ bundlePage: [mockTaskBundle1, mockTaskBundle2] }],
        },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/?taskIds=123,456' })

      await waitFor(() => {
        expect(mockUseGetCurationTasksInfinite).toHaveBeenCalledWith(
          expect.objectContaining({
            taskIds: [123, 456],
            assignedToMe: true,
          }),
        )
      })
    })
  })

  describe('assignedToMe search parameter', () => {
    it('defaults to assignedToMe: true when not set in the URL', async () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/' })

      await waitFor(() => {
        expect(mockUseGetCurationTasksInfinite).toHaveBeenCalledWith(
          expect.objectContaining({ assignedToMe: true }),
        )
      })
    })

    it('respects assignedToMe: false when explicitly set in the URL', async () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/?assignedToMe=false' })

      await waitFor(() => {
        expect(mockUseGetCurationTasksInfinite).toHaveBeenCalledWith(
          expect.objectContaining({ assignedToMe: false }),
        )
      })
    })
  })

  describe('filtered task banner', () => {
    it('shows the banner when taskIds are present in the URL', async () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [{ bundlePage: [mockTaskBundle1] }] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/?taskIds=123' })

      expect(await screen.findByRole('alert')).toHaveTextContent(
        'Showing 1 filtered task',
      )
    })

    it('does not show the banner when taskIds are not present in the URL', () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/' })

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })

    it('removes the taskIds filter and hides the banner when "Clear filter" is clicked', async () => {
      const user = userEvent.setup()
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [{ bundlePage: [mockTaskBundle1] }] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/?taskIds=123' })

      await user.click(
        await screen.findByRole('button', { name: /clear filter/i }),
      )

      await waitFor(() => {
        expect(screen.queryByRole('alert')).not.toBeInTheDocument()
      })
      await waitFor(() => {
        expect(mockUseGetCurationTasksInfinite).toHaveBeenLastCalledWith(
          expect.objectContaining({ taskIds: undefined }),
        )
      })
    })
  })

  describe('state filter', () => {
    it('renders the "Filter Tasks By" button in the Tasks tab', () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter()

      expect(
        screen.getByRole('button', { name: /filter tasks by/i }),
      ).toBeInTheDocument()
    })

    it('adds the selected state to the stateFilter passed to the hook', async () => {
      const user = userEvent.setup()
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter()

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))
      await user.click(screen.getByRole('menuitem', { name: /completed/i }))

      await waitFor(() => {
        expect(mockUseGetCurationTasksInfinite).toHaveBeenLastCalledWith(
          expect.objectContaining({ stateFilter: ['COMPLETED'] }),
        )
      })
    })

    it('removes the state from the stateFilter when toggled off again', async () => {
      const user = userEvent.setup()
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/?stateFilter=COMPLETED' })

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))
      await user.click(screen.getByRole('menuitem', { name: /completed/i }))

      await waitFor(() => {
        expect(mockUseGetCurationTasksInfinite).toHaveBeenLastCalledWith(
          expect.objectContaining({ stateFilter: undefined }),
        )
      })
    })
  })

  describe('rendering tasks', () => {
    it('renders task cards when tasks are returned', async () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: {
          pages: [{ bundlePage: [mockTaskBundle1, mockTaskBundle2] }],
        },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/?taskIds=task123' })

      await waitFor(() => {
        expect(
          screen.getByTestId(`task-card-${mockTaskBundle1.task.taskId}`),
        ).toBeInTheDocument()
        expect(
          screen.getByTestId(`task-card-${mockTaskBundle2.task.taskId}`),
        ).toBeInTheDocument()
      })
    })

    it('shows empty message when no tasks are returned', async () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: false,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter({ initialEntry: '/?taskIds=nonexistent' })

      await waitFor(() => {
        expect(
          screen.getByText(
            'There are currently no curation tasks assigned to you.',
          ),
        ).toBeInTheDocument()
      })
    })

    it('shows loading state when isLoading is true', () => {
      mockUseGetCurationTasksInfinite.mockReturnValue({
        data: { pages: [] },
        isLoading: true,
        hasNextPage: false,
        isFetchingNextPage: false,
        fetchNextPage: vi.fn(),
      } as any)

      renderWithRouter()

      // The InfiniteTableLayout shows a loading state
      // Verify component renders without crashing
      expect(screen.getByText('On Your Radar')).toBeInTheDocument()
    })
  })
})
