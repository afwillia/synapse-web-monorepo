import { ListCurationTaskRequestStateFilterEnum } from '@sage-bionetworks/synapse-client'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FilterTasksButton, { FilterTasksButtonProps } from './FilterTasksButton'

function renderFilterTasksButton(
  overrides: Partial<FilterTasksButtonProps> = {},
) {
  const props: FilterTasksButtonProps = {
    stateFilter: undefined,
    onToggleState: vi.fn(),
    dueDateFilter: 'ALL',
    onDueDateFilterChange: vi.fn(),
    ...overrides,
  }
  return render(<FilterTasksButton {...props} />)
}

describe('FilterTasksButton', () => {
  it('renders a button labeled "Filter Tasks By"', () => {
    renderFilterTasksButton()

    expect(
      screen.getByRole('button', { name: /filter tasks by/i }),
    ).toBeInTheDocument()
  })

  it('does not show the filter criteria box until the button is clicked', () => {
    renderFilterTasksButton()

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    expect(screen.queryByRole('radio')).not.toBeInTheDocument()
  })

  it('hides the filter criteria box when the button is clicked again', async () => {
    const user = userEvent.setup()
    renderFilterTasksButton()
    const button = screen.getByRole('button', { name: /filter tasks by/i })

    await user.click(button)
    expect(await screen.findAllByRole('checkbox')).toHaveLength(
      Object.values(ListCurationTaskRequestStateFilterEnum).length,
    )

    await user.click(button)
    await waitFor(() => {
      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
    })
  })

  describe('task state filter', () => {
    it('shows a checkbox for every ListCurationTaskRequestStateFilterEnum value when the button is clicked', async () => {
      const user = userEvent.setup()
      renderFilterTasksButton()

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

      expect(await screen.findAllByRole('checkbox')).toHaveLength(
        Object.values(ListCurationTaskRequestStateFilterEnum).length,
      )
    })

    it('checks the checkboxes for states included in stateFilter', async () => {
      const user = userEvent.setup()
      renderFilterTasksButton({
        stateFilter: [ListCurationTaskRequestStateFilterEnum.IN_REVIEW],
      })

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

      expect(
        screen.getByRole('checkbox', { name: /needs review/i }),
      ).toBeChecked()
      expect(
        screen.getByRole('checkbox', { name: /completed/i }),
      ).not.toBeChecked()
    })

    it('allows selecting more than one state at once', async () => {
      const user = userEvent.setup()
      renderFilterTasksButton({
        stateFilter: [
          ListCurationTaskRequestStateFilterEnum.IN_REVIEW,
          ListCurationTaskRequestStateFilterEnum.COMPLETED,
        ],
      })

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

      expect(
        screen.getByRole('checkbox', { name: /needs review/i }),
      ).toBeChecked()
      expect(screen.getByRole('checkbox', { name: /completed/i })).toBeChecked()
    })

    it('calls onToggleState with the clicked state', async () => {
      const user = userEvent.setup()
      const onToggleState = vi.fn()
      renderFilterTasksButton({ onToggleState })

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))
      await user.click(screen.getByRole('checkbox', { name: /completed/i }))

      expect(onToggleState).toHaveBeenCalledWith(
        ListCurationTaskRequestStateFilterEnum.COMPLETED,
      )
    })
  })

  describe('due date filter', () => {
    it('shows a radio option for All plus every due date bucket when the button is clicked', async () => {
      const user = userEvent.setup()
      renderFilterTasksButton()

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

      expect(screen.getByRole('radio', { name: 'All' })).toBeInTheDocument()
      expect(
        screen.getByRole('radio', { name: 'Not Due Soon' }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('radio', { name: 'Due Soon' }),
      ).toBeInTheDocument()
      expect(
        screen.getByRole('radio', { name: 'Past Due' }),
      ).toBeInTheDocument()
    })

    it('selects the radio matching dueDateFilter', async () => {
      const user = userEvent.setup()
      renderFilterTasksButton({ dueDateFilter: 'PAST_DUE' })

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

      expect(screen.getByRole('radio', { name: 'Past Due' })).toBeChecked()
      expect(screen.getByRole('radio', { name: 'All' })).not.toBeChecked()
    })

    it('allows only one due date option to be selected at a time', async () => {
      const user = userEvent.setup()
      renderFilterTasksButton({ dueDateFilter: 'DUE_SOON' })

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

      expect(screen.getByRole('radio', { name: 'Due Soon' })).toBeChecked()
      expect(screen.getByRole('radio', { name: 'All' })).not.toBeChecked()
      expect(
        screen.getByRole('radio', { name: 'Not Due Soon' }),
      ).not.toBeChecked()
      expect(screen.getByRole('radio', { name: 'Past Due' })).not.toBeChecked()
    })

    it('calls onDueDateFilterChange with the clicked bucket', async () => {
      const user = userEvent.setup()
      const onDueDateFilterChange = vi.fn()
      renderFilterTasksButton({ onDueDateFilterChange })

      await user.click(screen.getByRole('button', { name: /filter tasks by/i }))
      await user.click(screen.getByRole('radio', { name: 'Due Soon' }))

      expect(onDueDateFilterChange).toHaveBeenCalledWith('DUE_SOON')
    })
  })
})
