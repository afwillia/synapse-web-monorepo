import {
  CURATION_TASK_LIST_ASSIGNED_TO_ME_QUERY_PARAM,
  CURATION_TASK_LIST_STATE_FILTER_QUERY_PARAM,
  GRID_PAGE_TASK_ID_QUERY_PARAM,
} from '@/utils/SynapseConstants'
import {
  ListCurationTaskRequest,
  ListCurationTaskRequestStateFilterEnum,
} from '@sage-bionetworks/synapse-client'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'

/**
 * Parses the `taskIds` URL search param value (a comma-separated list of numeric IDs) into an array
 * of numbers, filtering out any non-numeric entries. Returns `undefined` if the value is empty/absent.
 */
export function parseTaskIdsSearchParam(
  rawValue: string | null,
): number[] | undefined {
  if (!rawValue) {
    return undefined
  }
  return rawValue
    .split(',')
    .map(id => parseInt(id, 10))
    .filter(id => !isNaN(id))
}

/**
 * Parses the `assignedToMe` URL search param value ('true' | 'false'), falling back to
 * `defaultValue` if the param is absent.
 */
export function parseAssignedToMeSearchParam(
  rawValue: string | null,
  defaultValue: boolean,
): boolean {
  return rawValue === null ? defaultValue : rawValue === 'true'
}

const STATE_FILTER_VALUES = Object.values(
  ListCurationTaskRequestStateFilterEnum,
)

/**
 * Parses the `stateFilter` URL search param value (a comma-separated list of `ListCurationTaskRequestStateFilterEnum`
 * values) into an array, filtering out any entries that aren't a recognized state. Returns `undefined` if the value
 * is empty/absent or none of the entries are recognized.
 */
export function parseStateFilterSearchParam(
  rawValue: string | null,
): ListCurationTaskRequestStateFilterEnum[] | undefined {
  if (!rawValue) {
    return undefined
  }
  const states = rawValue
    .split(',')
    .filter((value): value is ListCurationTaskRequestStateFilterEnum =>
      STATE_FILTER_VALUES.includes(
        value as ListCurationTaskRequestStateFilterEnum,
      ),
    )
  return states.length > 0 ? states : undefined
}

export type UseCurationTaskListFiltersInit = {
  /** The project to scope the task list to. If omitted, results are aggregated across projects. */
  projectId?: string
  /** The value of the `assignedToMe` filter used when the URL does not specify one. Defaults to `false`. */
  defaultAssignedToMe?: boolean
}

export type UseCurationTaskListFiltersResult = {
  /** A `ListCurationTaskRequest`, ready to pass to `useGetCurationTasksInfinite`. */
  request: ListCurationTaskRequest
  /** The task IDs parsed from the `taskIds` URL search param, or `undefined` if not present. */
  taskIds: number[] | undefined
  assignedToMe: boolean
  /** Sets the `assignedToMe` URL search param, removing it if it matches `defaultAssignedToMe`. */
  setAssignedToMe: (assignedToMe: boolean) => void
  /** Removes the `taskIds` filter from the URL. */
  clearTaskIdsFilter: () => void
  /** The task states parsed from the `stateFilter` URL search param, or `undefined` if not present. */
  stateFilter: ListCurationTaskRequestStateFilterEnum[] | undefined
  /** Adds `state` to the `stateFilter` URL search param if absent, otherwise removes it. */
  toggleStateFilter: (state: ListCurationTaskRequestStateFilterEnum) => void
}

/**
 * Builds a `ListCurationTaskRequest` from a combination of caller-provided filters (`projectId`,
 * `assignedToMe`) and the `taskIds`/`assignedToMe` URL search params. Shared by any page that lists
 * curation tasks (e.g. `CuratorDashboard`, `MetadataTasksPage`) so these URL-driven filters behave
 * consistently.
 */
export function useCurationTaskListFilters(
  init: UseCurationTaskListFiltersInit = {},
): UseCurationTaskListFiltersResult {
  const { projectId, defaultAssignedToMe = false } = init
  const [searchParams, setSearchParams] = useSearchParams()

  const taskIdParam = searchParams.get(GRID_PAGE_TASK_ID_QUERY_PARAM)
  const taskIds = useMemo(
    () => parseTaskIdsSearchParam(taskIdParam),
    [taskIdParam],
  )

  const assignedToMeParam = searchParams.get(
    CURATION_TASK_LIST_ASSIGNED_TO_ME_QUERY_PARAM,
  )
  const assignedToMe = useMemo(
    () => parseAssignedToMeSearchParam(assignedToMeParam, defaultAssignedToMe),
    [assignedToMeParam, defaultAssignedToMe],
  )

  const setAssignedToMe = useCallback(
    (value: boolean) => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        if (value === defaultAssignedToMe) {
          next.delete(CURATION_TASK_LIST_ASSIGNED_TO_ME_QUERY_PARAM)
        } else {
          next.set(CURATION_TASK_LIST_ASSIGNED_TO_ME_QUERY_PARAM, String(value))
        }
        return next
      })
    },
    [setSearchParams, defaultAssignedToMe],
  )

  const clearTaskIdsFilter = useCallback(() => {
    setSearchParams(prev => {
      const next = new URLSearchParams(prev)
      next.delete(GRID_PAGE_TASK_ID_QUERY_PARAM)
      return next
    })
  }, [setSearchParams])

  const stateFilterParam = searchParams.get(
    CURATION_TASK_LIST_STATE_FILTER_QUERY_PARAM,
  )
  const stateFilter = useMemo(
    () => parseStateFilterSearchParam(stateFilterParam),
    [stateFilterParam],
  )

  const toggleStateFilter = useCallback(
    (state: ListCurationTaskRequestStateFilterEnum) => {
      setSearchParams(prev => {
        const next = new URLSearchParams(prev)
        const current =
          parseStateFilterSearchParam(
            prev.get(CURATION_TASK_LIST_STATE_FILTER_QUERY_PARAM),
          ) ?? []
        const updated = current.includes(state)
          ? current.filter(s => s !== state)
          : [...current, state]
        if (updated.length > 0) {
          next.set(
            CURATION_TASK_LIST_STATE_FILTER_QUERY_PARAM,
            updated.join(','),
          )
        } else {
          next.delete(CURATION_TASK_LIST_STATE_FILTER_QUERY_PARAM)
        }
        return next
      })
    },
    [setSearchParams],
  )

  const request = useMemo<ListCurationTaskRequest>(
    () => ({
      projectId,
      assignedToMe,
      taskIds,
      stateFilter,
    }),
    [projectId, assignedToMe, taskIds, stateFilter],
  )

  return {
    request,
    taskIds,
    assignedToMe,
    setAssignedToMe,
    clearTaskIdsFilter,
    stateFilter,
    toggleStateFilter,
  }
}
