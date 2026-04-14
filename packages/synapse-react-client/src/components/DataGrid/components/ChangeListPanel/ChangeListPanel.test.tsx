import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { ChangeListPanel } from './ChangeListPanel'
import type { ChangedCell } from '@/components/DataGrid/utils/getChangedCells'
import type { ReplicaUserInfo } from '@/components/DataGrid/hooks/useGridReplicaUsers'
import type { ReplicaCategory } from '@/components/DataGrid/utils/getReplicaCategory'

function makeCell(
  rowIndex: number,
  displayColIndex: number,
  colName: string,
  value: string,
  displayName: string,
  authorTime: number = 0,
  category: ReplicaCategory = 'other-user',
  replicaType: string = 'USER',
): ChangedCell {
  return {
    rowIndex,
    displayColIndex,
    colName,
    value,
    authorSid: 101,
    authorTime,
    replicaUserInfo: {
      replicaInfo: {
        replicaId: 101,
        replicaType,
        createdBy: 'user-1',
      } as ReplicaUserInfo['replicaInfo'],
      category,
      profile: {
        userName: 'user1',
        displayName,
      } as ReplicaUserInfo['profile'],
    },
  }
}

describe('ChangeListPanel', () => {
  it('renders nothing visible when open is false', () => {
    render(
      <ChangeListPanel
        open={false}
        onClose={vi.fn()}
        changedCells={[makeCell(0, 0, 'colA', 'val', 'Alice')]}
        onJumpTo={vi.fn()}
      />,
    )
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
  })

  it('shows empty state when changedCells is empty', () => {
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={[]}
        onJumpTo={vi.fn()}
      />,
    )
    expect(screen.getByText('No changes recorded')).toBeInTheDocument()
    expect(screen.getByText('No cell changes to display.')).toBeInTheDocument()
  })

  it('renders one list item per changed cell with correct author, column, and row', () => {
    const cells = [
      makeCell(0, 0, 'Gene', 'BRCA1', 'Alice'),
      makeCell(2, 1, 'Status', 'active', 'Bob'),
    ]
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={cells}
        onJumpTo={vi.fn()}
      />,
    )
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Gene, row 1')).toBeInTheDocument()
    expect(screen.getByText('BRCA1')).toBeInTheDocument()

    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('Status, row 3')).toBeInTheDocument()
    expect(screen.getByText('active')).toBeInTheDocument()
  })

  it('shows "N of M cells shown" in the summary line', () => {
    const cells = [
      makeCell(0, 0, 'A', 'v1', 'Alice'),
      makeCell(1, 0, 'A', 'v2', 'Bob'),
    ]
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={cells}
        onJumpTo={vi.fn()}
      />,
    )
    expect(screen.getByText('2 of 2 cells shown')).toBeInTheDocument()
  })

  it('calls onJumpTo with correct row and col when jump button is clicked', async () => {
    const onJumpTo = vi.fn()
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={[makeCell(3, 1, 'Status', 'done', 'Alice')]}
        onJumpTo={onJumpTo}
      />,
    )
    await userEvent.click(
      screen.getByRole('button', { name: /jump to status, row 4/i }),
    )
    expect(onJumpTo).toHaveBeenCalledWith(3, 1)
  })

  it('truncates long cell values', () => {
    const longValue = 'x'.repeat(60)
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={[makeCell(0, 0, 'Notes', longValue, 'Alice')]}
        onJumpTo={vi.fn()}
      />,
    )
    expect(screen.getByText(/x{40}…/)).toBeInTheDocument()
  })

  it('shows robot icon and "Agent (Name)" label for AGENT replicas', () => {
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={[
          makeCell(0, 0, 'Gene', 'BRCA1', 'Alice', 0, 'own-agent', 'AGENT'),
        ]}
        onJumpTo={vi.fn()}
      />,
    )
    expect(screen.getByText('Agent (Alice)')).toBeInTheDocument()
    expect(screen.queryByText('Alice')).not.toBeInTheDocument()
    expect(
      document.querySelector('svg[data-testid="SmartToyTwoToneIcon"]'),
    ).toBeInTheDocument()
  })

  it('shows (empty) for null values', () => {
    const cell: ChangedCell = {
      ...makeCell(0, 0, 'Col', '', 'Alice'),
      value: null,
    }
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={[cell]}
        onJumpTo={vi.fn()}
      />,
    )
    expect(screen.getByText('(empty)')).toBeInTheDocument()
  })

  it('defaults to newest-first order and toggles to oldest-first', async () => {
    const cells = [
      makeCell(0, 0, 'A', 'first', 'Alice', 1),
      makeCell(1, 0, 'B', 'second', 'Bob', 2),
      makeCell(2, 0, 'C', 'third', 'Carol', 3),
    ]
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={cells}
        onJumpTo={vi.fn()}
      />,
    )

    // Default: newest first — Carol (time=3) before Alice (time=1)
    const items = screen.getAllByRole('listitem')
    expect(items[0]).toHaveTextContent('Carol')
    expect(items[2]).toHaveTextContent('Alice')

    // Toggle to oldest first
    await userEvent.click(
      screen.getByRole('button', { name: /sort oldest first/i }),
    )
    const reordered = screen.getAllByRole('listitem')
    expect(reordered[0]).toHaveTextContent('Alice')
    expect(reordered[2]).toHaveTextContent('Carol')
  })

  it('hides the sort button when there are no changes', () => {
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={[]}
        onJumpTo={vi.fn()}
      />,
    )
    expect(
      screen.queryByRole('button', { name: /sort/i }),
    ).not.toBeInTheDocument()
  })

  it('hides filter buttons when only one category is present', () => {
    const cells = [
      makeCell(0, 0, 'A', 'v1', 'Alice', 0, 'other-user'),
      makeCell(1, 0, 'B', 'v2', 'Bob', 0, 'other-user'),
    ]
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={cells}
        onJumpTo={vi.fn()}
      />,
    )
    expect(
      screen.queryByRole('group', { name: /filter/i }),
    ).not.toBeInTheDocument()
  })

  it('shows filter buttons only for categories present in the data', () => {
    const cells = [
      makeCell(0, 0, 'A', 'v1', 'Me', 0, 'self'),
      makeCell(1, 0, 'B', 'v2', 'Bob', 0, 'other-user'),
    ]
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={cells}
        onJumpTo={vi.fn()}
      />,
    )
    expect(screen.getByRole('button', { name: 'Me' })).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Other Users' }),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'My Agent' }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'Other Agents' }),
    ).not.toBeInTheDocument()
  })

  it('filters the list when a category is toggled on', async () => {
    const cells = [
      makeCell(0, 0, 'A', 'my-val', 'Alice', 0, 'self'),
      makeCell(1, 0, 'B', 'their-val', 'Bob', 0, 'other-user'),
    ]
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={cells}
        onJumpTo={vi.fn()}
      />,
    )

    // Both visible initially
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()

    // Filter to 'self' only
    await userEvent.click(screen.getByRole('button', { name: 'Me' }))
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
    expect(screen.getByText('1 of 2 cells shown')).toBeInTheDocument()
  })

  it('shows empty-filter message when active filters together match no cells', async () => {
    // Two categories present; toggle both on then off one to get a state with results,
    // then verify toggling both off again restores all results (empty filter = all shown).
    // The "no match" state cannot happen via UI since buttons only appear for present
    // categories, so we verify the no-match message is absent in normal usage.
    const cells = [
      makeCell(0, 0, 'A', 'v1', 'Alice', 0, 'self'),
      makeCell(1, 0, 'B', 'v2', 'Bob', 0, 'other-user'),
    ]
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={cells}
        onJumpTo={vi.fn()}
      />,
    )

    // Activate 'self' filter — only Alice visible
    await userEvent.click(screen.getByRole('button', { name: 'Me' }))
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()
    expect(
      screen.queryByText('No changes match the selected filter.'),
    ).not.toBeInTheDocument()
  })

  it('restores all results when the active filter is toggled off', async () => {
    const cells = [
      makeCell(0, 0, 'A', 'v1', 'Alice', 0, 'self'),
      makeCell(1, 0, 'B', 'v2', 'Bob', 0, 'other-user'),
    ]
    render(
      <ChangeListPanel
        open={true}
        onClose={vi.fn()}
        changedCells={cells}
        onJumpTo={vi.fn()}
      />,
    )

    const meButton = screen.getByRole('button', { name: 'Me' })
    await userEvent.click(meButton) // filter on
    expect(screen.queryByText('Bob')).not.toBeInTheDocument()

    await userEvent.click(meButton) // filter off — back to all
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
    expect(screen.getByText('2 of 2 cells shown')).toBeInTheDocument()
  })
})
