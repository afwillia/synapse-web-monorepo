import { TASK_STATUS_CONFIG } from '@/features/entity/metadata-task/utils/constants'
import { ListCurationTaskRequestStateFilterEnum } from '@sage-bionetworks/synapse-client'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Collapse from '@mui/material/Collapse'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { useId, useState } from 'react'

export type FilterTasksButtonProps = {
  stateFilter: ListCurationTaskRequestStateFilterEnum[] | undefined
  onToggleState: (state: ListCurationTaskRequestStateFilterEnum) => void
}

/**
 * Button that toggles a box of curation task filter criteria. Currently offers a task state
 * filter; more criteria (due date, task type, assignees) will be added as sections alongside it.
 */
export default function FilterTasksButton(props: FilterTasksButtonProps) {
  const { stateFilter = [], onToggleState } = props
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
        </Paper>
      </Collapse>
    </Box>
  )
}
