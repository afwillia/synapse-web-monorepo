import { ListCurationTaskRequestStateFilterEnum } from '@sage-bionetworks/synapse-client'
import { render, screen, within } from '@testing-library/react'
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

  it('opens a menu with an option for every ListCurationTaskRequestStateFilterEnum value', async () => {
    const user = userEvent.setup()
    render(
      <FilterTasksButton stateFilter={undefined} onToggleState={vi.fn()} />,
    )

    await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

    await screen.findByRole('menu')
    expect(screen.getAllByRole('menuitem')).toHaveLength(
      Object.values(ListCurationTaskRequestStateFilterEnum).length,
    )
  })

  it('checks the checkbox for states included in stateFilter', async () => {
    const user = userEvent.setup()
    render(
      <FilterTasksButton
        stateFilter={[ListCurationTaskRequestStateFilterEnum.IN_REVIEW]}
        onToggleState={vi.fn()}
      />,
    )

    await user.click(screen.getByRole('button', { name: /filter tasks by/i }))

    const inReviewMenuItem = screen.getByRole('menuitem', {
      name: /needs review/i,
    })
    expect(within(inReviewMenuItem).getByRole('checkbox')).toBeChecked()
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
    await user.click(screen.getByRole('menuitem', { name: /completed/i }))

    expect(onToggleState).toHaveBeenCalledWith(
      ListCurationTaskRequestStateFilterEnum.COMPLETED,
    )
  })
})
