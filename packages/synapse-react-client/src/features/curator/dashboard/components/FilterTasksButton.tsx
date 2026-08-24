import { TASK_STATUS_CONFIG } from '@/features/entity/metadata-task/utils/constants'
import { ListCurationTaskRequestStateFilterEnum } from '@sage-bionetworks/synapse-client'
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { MouseEvent, useId, useState } from 'react'

export type FilterTasksButtonProps = {
  stateFilter: ListCurationTaskRequestStateFilterEnum[] | undefined
  onToggleState: (state: ListCurationTaskRequestStateFilterEnum) => void
}

/**
 * Button that opens a menu of {@link ListCurationTaskRequestStateFilterEnum} values, allowing the
 * caller to toggle which task states are included in the curation task list.
 */
export default function FilterTasksButton(props: FilterTasksButtonProps) {
  const { stateFilter = [], onToggleState } = props
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const menuId = useId()

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterAltOutlinedIcon />}
        aria-haspopup="true"
        aria-expanded={Boolean(anchorEl)}
        aria-controls={anchorEl ? menuId : undefined}
        onClick={(event: MouseEvent<HTMLElement>) =>
          setAnchorEl(event.currentTarget)
        }
      >
        Filter Tasks By
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        {Object.values(ListCurationTaskRequestStateFilterEnum).map(state => (
          <MenuItem key={state} onClick={() => onToggleState(state)}>
            <Checkbox checked={stateFilter.includes(state)} />
            <ListItemText primary={TASK_STATUS_CONFIG[state].label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}
