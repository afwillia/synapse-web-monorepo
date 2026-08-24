import { TaskStatusStateEnum } from '@sage-bionetworks/synapse-client'
import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

dayjs.extend(customParseFormat)
dayjs.extend(utc)

const DUE_DATE_INPUT_FORMAT = 'YYYY-MM-DD'

/**
 * A native `<input type="date">` produces a bare `YYYY-MM-DD` calendar date with no timezone, but the
 * backend's `CurationTask.dueDate` is an ISO 8601 date-time string. Both conversions here anchor the
 * calendar date to UTC midnight so the date a user picks is the date every other user sees, regardless
 * of their timezone. Returns `undefined` for an empty or malformed input so the caller can persist an
 * absent due date.
 */
export function dueDateInputToIso(yyyyMmDd: string): string | undefined {
  if (!yyyyMmDd) {
    return undefined
  }
  const parsed = dayjs.utc(yyyyMmDd, DUE_DATE_INPUT_FORMAT, true)
  return parsed.isValid() ? parsed.toISOString() : undefined
}

/**
 * Inverse of {@link dueDateInputToIso}: formats the backend's ISO 8601 `dueDate` string back to the
 * `YYYY-MM-DD` value a native date input expects, in UTC. Returns `''` when the due date is absent or
 * unparseable.
 */
export function isoToDueDateInput(dueDate: string | undefined): string {
  if (!dueDate) {
    return ''
  }
  const parsed = dayjs.utc(dueDate)
  return parsed.isValid() ? parsed.format(DUE_DATE_INPUT_FORMAT) : ''
}

/**
 * The `dueDate` as a UTC-anchored dayjs, or `null` when absent/unparseable. Anchoring to UTC (the same
 * as {@link isoToDueDateInput}) means the calendar date shown matches the date the user picked,
 * regardless of the viewer's timezone.
 */
export function parseDueDate(dueDate: string | undefined): Dayjs | null {
  if (!dueDate) {
    return null
  }
  const parsed = dayjs.utc(dueDate)
  return parsed.isValid() ? parsed : null
}

export type DueDateFilterBucket = 'PAST_DUE' | 'DUE_SOON' | 'NOT_DUE_SOON'

/** A task due within this many days (but not yet overdue) falls in the `DUE_SOON` bucket. */
export const DUE_SOON_THRESHOLD_DAYS = 30

const TERMINAL_TASK_STATUS_STATES: TaskStatusStateEnum[] = [
  TaskStatusStateEnum.COMPLETED,
  TaskStatusStateEnum.CANCELED,
]

/**
 * Buckets a task's due date for filtering/display purposes, matching the coloring used by the
 * curation task due date chip: tasks in a terminal state or with no due date are `NOT_DUE_SOON`,
 * as are tasks due `DUE_SOON_THRESHOLD_DAYS` or more from now; earlier than that is `DUE_SOON`,
 * and a due date already passed is `PAST_DUE`. `today` is injectable for deterministic tests.
 */
export function getDueDateFilterBucket(
  dueDate: string | undefined,
  taskState: TaskStatusStateEnum | undefined,
  today: Dayjs = dayjs.utc().startOf('day'),
): DueDateFilterBucket {
  const dueDateObj = parseDueDate(dueDate)
  const isTerminal =
    taskState !== undefined && TERMINAL_TASK_STATUS_STATES.includes(taskState)

  if (!dueDateObj || isTerminal) {
    return 'NOT_DUE_SOON'
  }

  const daysUntilDue = dueDateObj.diff(today, 'day')
  if (daysUntilDue < 0) {
    return 'PAST_DUE'
  }
  if (daysUntilDue < DUE_SOON_THRESHOLD_DAYS) {
    return 'DUE_SOON'
  }
  return 'NOT_DUE_SOON'
}
