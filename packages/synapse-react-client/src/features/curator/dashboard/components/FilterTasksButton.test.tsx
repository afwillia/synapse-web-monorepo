import { ListCurationTaskRequestStateFilterEnum } from '@sage-bionetworks/synapse-client'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FilterTasksButton from './FilterTasksButton'

describe('FilterTasksButton', () => {
  it('renders a button labeled "Filter Tasks By"', () => {
    render(
      <FilterTasksButton stateFilter={undefined} onToggleState={vi.fn()} />,
    )

    expect(
      screen.getByRole('button', { name: /filter tasks by/i }),
    ).toBeInTheDocument()
  })

  it('does not show the filter criteria box until the button is clicked', () => {
    render(
      <FilterTasksButton stateFilter={undefined} onToggleState={vi.fn()} />,
    )

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument()
  })

  it('shows a checkbox for every ListCurationTaskRequestStateFilterEnum value when the button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <FilterTasksButton stateFilter={undefined} onToggleState={vi.fn()} />,
    )

    await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

    expect(await screen.findAllByRole('checkbox')).toHaveLength(
      Object.values(ListCurationTaskRequestStateFilterEnum).length,
    )
  })

  it('hides the filter criteria box when the button is clicked again', async () => {
    const user = userEvent.setup()
    render(
      <FilterTasksButton stateFilter={undefined} onToggleState={vi.fn()} />,
    )
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

  it('checks the checkboxes for states included in stateFilter', async () => {
    const user = userEvent.setup()
    render(
      <FilterTasksButton
        stateFilter={[ListCurationTaskRequestStateFilterEnum.IN_REVIEW]}
        onToggleState={vi.fn()}
      />,
    )

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
    render(
      <FilterTasksButton
        stateFilter={[
          ListCurationTaskRequestStateFilterEnum.IN_REVIEW,
          ListCurationTaskRequestStateFilterEnum.COMPLETED,
        ]}
        onToggleState={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

    expect(
      screen.getByRole('checkbox', { name: /needs review/i }),
    ).toBeChecked()
    expect(screen.getByRole('checkbox', { name: /completed/i })).toBeChecked()
  })

  it('calls onToggleState with the clicked state', async () => {
    const user = userEvent.setup()
    const onToggleState = vi.fn()
    render(
      <FilterTasksButton
        stateFilter={undefined}
        onToggleState={onToggleState}
      />,
    )

    await user.click(screen.getByRole('button', { name: /filter tasks by/i }))
    await user.click(screen.getByRole('checkbox', { name: /completed/i }))

    expect(onToggleState).toHaveBeenCalledWith(
      ListCurationTaskRequestStateFilterEnum.COMPLETED,
    )
  })
})
