import { ListCurationTaskRequestStateFilterEnum } from '@sage-bionetworks/synapse-client'
import { act, renderHook } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { MemoryRouter, useLocation } from 'react-router'
import {
  parseStateFilterSearchParam,
  parseTaskIdsSearchParam,
  useCurationTaskListFilters,
} from './useCurationTaskListFilters'

function renderWithRouter(
  init?: Parameters<typeof useCurationTaskListFilters>[0],
  initialEntry = '/',
) {
  return renderHook(
    () => ({
      ...useCurationTaskListFilters(init),
      search: useLocation().search,
    }),
    {
      wrapper: ({ children }: PropsWithChildren) => (
        <MemoryRouter initialEntries={[initialEntry]}>{children}</MemoryRouter>
      ),
    },
  )
}

describe('parseTaskIdsSearchParam', () => {
  it('returns undefined when the value is null', () => {
    expect(parseTaskIdsSearchParam(null)).toBeUndefined()
  })

  it('returns undefined when the value is an empty string', () => {
    expect(parseTaskIdsSearchParam('')).toBeUndefined()
  })

  it('parses a single numeric ID', () => {
    expect(parseTaskIdsSearchParam('123')).toEqual([123])
  })

  it('parses comma-separated numeric IDs', () => {
    expect(parseTaskIdsSearchParam('123,456')).toEqual([123, 456])
  })

  it('filters out non-numeric entries', () => {
    expect(parseTaskIdsSearchParam('123,abc,456')).toEqual([123, 456])
  })
})

describe('parseStateFilterSearchParam', () => {
  it('returns undefined when the value is null', () => {
    expect(parseStateFilterSearchParam(null)).toBeUndefined()
  })

  it('returns undefined when the value is an empty string', () => {
    expect(parseStateFilterSearchParam('')).toBeUndefined()
  })

  it('parses a single recognized state', () => {
    expect(parseStateFilterSearchParam('IN_REVIEW')).toEqual(['IN_REVIEW'])
  })

  it('parses comma-separated recognized states', () => {
    expect(parseStateFilterSearchParam('IN_REVIEW,COMPLETED')).toEqual([
      'IN_REVIEW',
      'COMPLETED',
    ])
  })

  it('filters out unrecognized entries', () => {
    expect(parseStateFilterSearchParam('IN_REVIEW,BOGUS,COMPLETED')).toEqual([
      'IN_REVIEW',
      'COMPLETED',
    ])
  })

  it('returns undefined when no entries are recognized', () => {
    expect(parseStateFilterSearchParam('BOGUS')).toBeUndefined()
  })

  it.each(Object.values(ListCurationTaskRequestStateFilterEnum))(
    'parses every ListCurationTaskRequestStateFilterEnum value: %s',
    state => {
      expect(parseStateFilterSearchParam(state)).toEqual([state])
    },
  )
})

describe('useCurationTaskListFilters', () => {
  it('defaults assignedToMe to false and taskIds to undefined', () => {
    const { result } = renderWithRouter({ projectId: 'syn123' })

    expect(result.current.request).toEqual({
      projectId: 'syn123',
      assignedToMe: false,
      taskIds: undefined,
    })
    expect(result.current.taskIds).toBeUndefined()
    expect(result.current.assignedToMe).toBe(false)
  })

  it('seeds assignedToMe from defaultAssignedToMe', () => {
    const { result } = renderWithRouter({ defaultAssignedToMe: true })

    expect(result.current.assignedToMe).toBe(true)
    expect(result.current.request).toEqual({
      projectId: undefined,
      assignedToMe: true,
      taskIds: undefined,
    })
  })

  it('reads assignedToMe from the URL, overriding the default', () => {
    const { result } = renderWithRouter(
      { defaultAssignedToMe: true },
      '/?assignedToMe=false',
    )

    expect(result.current.assignedToMe).toBe(false)
    expect(result.current.request.assignedToMe).toBe(false)
  })

  it('sets the assignedToMe URL param via setAssignedToMe when it differs from the default', () => {
    const { result } = renderWithRouter({ defaultAssignedToMe: false })

    act(() => {
      result.current.setAssignedToMe(true)
    })

    expect(result.current.assignedToMe).toBe(true)
    expect(result.current.request.assignedToMe).toBe(true)
    expect(result.current.search).toBe('?assignedToMe=true')
  })

  it('removes the assignedToMe URL param via setAssignedToMe when it matches the default', () => {
    const { result } = renderWithRouter(
      { defaultAssignedToMe: false },
      '/?assignedToMe=true',
    )
    expect(result.current.assignedToMe).toBe(true)

    act(() => {
      result.current.setAssignedToMe(false)
    })

    expect(result.current.assignedToMe).toBe(false)
    expect(result.current.request.assignedToMe).toBe(false)
    expect(result.current.search).toBe('')
  })

  it('parses taskIds from the URL search params into the request', () => {
    const { result } = renderWithRouter({}, '/?taskIds=123,456')

    expect(result.current.taskIds).toEqual([123, 456])
    expect(result.current.request.taskIds).toEqual([123, 456])
  })

  it('clears the taskIds filter via clearTaskIdsFilter', () => {
    const { result } = renderWithRouter({}, '/?taskIds=123,456')

    expect(result.current.taskIds).toEqual([123, 456])

    act(() => {
      result.current.clearTaskIdsFilter()
    })

    expect(result.current.taskIds).toBeUndefined()
    expect(result.current.request.taskIds).toBeUndefined()
  })

  describe('stateFilter', () => {
    it('defaults to undefined', () => {
      const { result } = renderWithRouter()

      expect(result.current.stateFilter).toBeUndefined()
      expect(result.current.request.stateFilter).toBeUndefined()
    })

    it('parses stateFilter from the URL search params into the request', () => {
      const { result } = renderWithRouter(
        {},
        '/?stateFilter=IN_REVIEW,COMPLETED',
      )

      expect(result.current.stateFilter).toEqual(['IN_REVIEW', 'COMPLETED'])
      expect(result.current.request.stateFilter).toEqual([
        'IN_REVIEW',
        'COMPLETED',
      ])
    })

    it('adds a state to the URL via toggleStateFilter when absent', () => {
      const { result } = renderWithRouter()

      act(() => {
        result.current.toggleStateFilter(
          ListCurationTaskRequestStateFilterEnum.IN_REVIEW,
        )
      })

      expect(result.current.stateFilter).toEqual(['IN_REVIEW'])
      expect(result.current.search).toBe('?stateFilter=IN_REVIEW')
    })

    it('appends an additional state without removing existing ones', () => {
      const { result } = renderWithRouter({}, '/?stateFilter=IN_REVIEW')

      act(() => {
        result.current.toggleStateFilter(
          ListCurationTaskRequestStateFilterEnum.COMPLETED,
        )
      })

      expect(result.current.stateFilter).toEqual(['IN_REVIEW', 'COMPLETED'])
    })

    it('removes a state from the URL via toggleStateFilter when present', () => {
      const { result } = renderWithRouter(
        {},
        '/?stateFilter=IN_REVIEW,COMPLETED',
      )

      act(() => {
        result.current.toggleStateFilter(
          ListCurationTaskRequestStateFilterEnum.IN_REVIEW,
        )
      })

      expect(result.current.stateFilter).toEqual(['COMPLETED'])
      expect(result.current.search).toBe('?stateFilter=COMPLETED')
    })

    it('removes the stateFilter URL param entirely when the last state is toggled off', () => {
      const { result } = renderWithRouter({}, '/?stateFilter=IN_REVIEW')

      act(() => {
        result.current.toggleStateFilter(
          ListCurationTaskRequestStateFilterEnum.IN_REVIEW,
        )
      })

      expect(result.current.stateFilter).toBeUndefined()
      expect(result.current.search).toBe('')
    })
  })
})
