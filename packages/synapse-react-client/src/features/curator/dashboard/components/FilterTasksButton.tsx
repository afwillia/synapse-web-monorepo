import {
  DUE_DATE_FILTER_BUCKET_CONFIG,
  TASK_STATUS_CONFIG,
} from '@/features/entity/metadata-task/utils/constants'
import { DueDateFilterBucket } from '@/features/entity/metadata-task/utils/dueDate'
import { ListCurationTaskRequestStateFilterEnum } from '@sage-bionetworks/synapse-client'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import Divider from '@mui/material/Divider'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { ChangeEvent, useId, useState } from 'react'

export type DueDateFilterValue = DueDateFilterBucket | 'ALL'

export type FilterTasksButtonProps = {
  stateFilter: ListCurationTaskRequestStateFilterEnum[] | undefined
  onToggleState: (state: ListCurationTaskRequestStateFilterEnum) => void
  dueDateFilter: DueDateFilterValue
  onDueDateFilterChange: (value: DueDateFilterValue) => void
}

const DUE_DATE_FILTER_OPTIONS: {
  value: DueDateFilterValue
  label: string
  color?: string
}[] = [
  { value: 'ALL', label: 'All' },
  ...Object.entries(DUE_DATE_FILTER_BUCKET_CONFIG).map(([bucket, config]) => ({
    value: bucket as DueDateFilterBucket,
    label: config.label,
    color: config.backgroundColor,
  })),
]

function DueDateSwatch(props: { color: string }) {
  return (
    <Box
      component="span"
      sx={{
        display: 'inline-block',
        width: 12,
        height: 12,
        borderRadius: '50%',
        backgroundColor: props.color,
      }}
    />
  )
}

/**
 * Button that toggles a box of curation task filter criteria: task state and due date so far,
 * with more criteria (task type, assignees) to follow as sections alongside them.
 */
export default function FilterTasksButton(props: FilterTasksButtonProps) {
  const {
    stateFilter = [],
    onToggleState,
    dueDateFilter,
    onDueDateFilterChange,
  } = props
  const [expanded, setExpanded] = useState(false)
  const panelId = useId()

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<FilterAltOutlinedIcon />}
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded(prev => !prev)}
      >
        Filter Tasks By
      </Button>
      <Collapse in={expanded} unmountOnExit>
        <Paper id={panelId} variant="outlined" sx={{ p: 2, mt: 1 }}>
          <Typography variant="subsectionHeader" component="p" gutterBottom>
            Task State
          </Typography>
          <FormGroup>
            {Object.values(ListCurationTaskRequestStateFilterEnum).map(
              state => (
                <FormControlLabel
                  key={state}
                  label={TASK_STATUS_CONFIG[state].label}
                  control={
                    <Checkbox
                      checked={stateFilter.includes(state)}
                      onChange={() => onToggleState(state)}
                    />
                  }
                />
              ),
            )}
          </FormGroup>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subsectionHeader" component="p" gutterBottom>
            Due Date
          </Typography>
          <RadioGroup
            value={dueDateFilter}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onDueDateFilterChange(event.target.value as DueDateFilterValue)
            }
          >
            {DUE_DATE_FILTER_OPTIONS.map(option => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={
                  <Stack direction="row" alignItems="center" gap={1}>
                    {option.color && <DueDateSwatch color={option.color} />}
                    {option.label}
                  </Stack>
                }
              />
            ))}
          </RadioGroup>
        </Paper>
      </Collapse>
    </Box>
  )
}
