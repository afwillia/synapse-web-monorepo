import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import MyLocationTwoTone from '@mui/icons-material/MyLocationTwoTone'
import SmartToyTwoTone from '@mui/icons-material/SmartToyTwoTone'
import ArrowDownwardTwoTone from '@mui/icons-material/ArrowDownwardTwoTone'
import ArrowUpwardTwoTone from '@mui/icons-material/ArrowUpwardTwoTone'
import type { ChangedCell } from '@/components/DataGrid/utils/getChangedCells'
import type { ReplicaCategory } from '@/components/DataGrid/utils/getReplicaCategory'
import type { UserProfile } from '@sage-bionetworks/synapse-types'
import { useMemo, useState } from 'react'

const CATEGORY_LABEL: Record<ReplicaCategory, string> = {
  self: 'Me',
  'own-agent': 'My Agent',
  'other-user': 'Other Users',
  'other-agent': 'Other Agents',
}

// Display order for filter buttons
const CATEGORY_ORDER: ReplicaCategory[] = [
  'self',
  'own-agent',
  'other-user',
  'other-agent',
]

function getProfileName(profile: UserProfile | undefined): string {
  if (!profile) return 'Unknown'
  if (profile.displayName) return profile.displayName
  if (profile.firstName || profile.lastName) {
    return `${profile.firstName ?? ''} ${profile.lastName ?? ''}`.trim()
  }
  return profile.userName ?? 'Unknown'
}

function getInitials(profile: UserProfile | undefined): string {
  const name = getProfileName(profile)
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0]?.toUpperCase() ?? '')
    .join('')
}

export type ChangeListPanelProps = {
  open: boolean
  onClose: () => void
  changedCells: ChangedCell[]
  onJumpTo: (row: number, col: number) => void
}

export function ChangeListPanel({
  open,
  onClose,
  changedCells,
  onJumpTo,
}: ChangeListPanelProps) {
  const [newestFirst, setNewestFirst] = useState(true)
  const [activeFilters, setActiveFilters] = useState<ReplicaCategory[]>([])

  // Only show filter buttons for categories present in the data
  const availableCategories = useMemo(
    () =>
      CATEGORY_ORDER.filter(cat =>
        changedCells.some(c => c.replicaUserInfo.category === cat),
      ),
    [changedCells],
  )

  const visibleCells = useMemo(() => {
    const filtered =
      activeFilters.length === 0
        ? changedCells
        : changedCells.filter(c =>
            activeFilters.includes(c.replicaUserInfo.category),
          )
    const copy = [...filtered]
    copy.sort((a, b) =>
      newestFirst ? b.authorTime - a.authorTime : a.authorTime - b.authorTime,
    )
    return copy
  }, [changedCells, activeFilters, newestFirst])

  const handleFilterChange = (
    _: React.MouseEvent,
    newFilters: ReplicaCategory[],
  ) => {
    setActiveFilters(newFilters)
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        sx={{
          width: 320,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            py: 1.5,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h6">Changes</Typography>
            <Typography variant="body2" color="text.secondary">
              {changedCells.length === 0
                ? 'No changes recorded'
                : `${visibleCells.length} of ${changedCells.length} cell${
                    changedCells.length === 1 ? '' : 's'
                  } shown`}
            </Typography>
          </Box>
          {changedCells.length > 0 && (
            <Tooltip
              title={
                newestFirst ? 'Showing newest first' : 'Showing oldest first'
              }
            >
              <IconButton
                size="small"
                aria-label={
                  newestFirst ? 'Sort oldest first' : 'Sort newest first'
                }
                onClick={() => setNewestFirst(prev => !prev)}
                sx={{ mt: 0.5 }}
              >
                {newestFirst ? (
                  <ArrowDownwardTwoTone fontSize="small" />
                ) : (
                  <ArrowUpwardTwoTone fontSize="small" />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>

        {/* Filter row — only shown when multiple categories are present */}
        {availableCategories.length > 1 && (
          <>
            <Box sx={{ px: 2, pb: 1 }}>
              <ToggleButtonGroup
                value={activeFilters}
                onChange={handleFilterChange}
                size="small"
                aria-label="Filter changes by category"
                sx={{ flexWrap: 'wrap', gap: 0.5 }}
              >
                {availableCategories.map(cat => (
                  <ToggleButton
                    key={cat}
                    value={cat}
                    aria-label={CATEGORY_LABEL[cat]}
                    sx={{
                      py: 0.25,
                      px: 1,
                      fontSize: '0.7rem',
                      lineHeight: 1.5,
                    }}
                  >
                    {CATEGORY_LABEL[cat]}
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            </Box>
          </>
        )}

        <Divider />

        {/* List */}
        {changedCells.length === 0 ? (
          <Box sx={{ px: 2, py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No cell changes to display.
            </Typography>
          </Box>
        ) : visibleCells.length === 0 ? (
          <Box sx={{ px: 2, py: 3 }}>
            <Typography variant="body2" color="text.secondary">
              No changes match the selected filter.
            </Typography>
          </Box>
        ) : (
          <List dense sx={{ overflowY: 'auto', flex: 1 }}>
            {visibleCells.map((cell, i) => {
              const { profile, replicaInfo } = cell.replicaUserInfo
              const isAgent = replicaInfo.replicaType === 'AGENT'
              const profileName = getProfileName(profile)
              const displayName = isAgent
                ? `Agent (${profileName})`
                : profileName
              const rawValue =
                cell.value === null || cell.value === undefined
                  ? null
                  : typeof cell.value === 'string'
                  ? cell.value
                  : JSON.stringify(cell.value)
              const displayValue =
                rawValue === null
                  ? '(empty)'
                  : rawValue.length > 40
                  ? rawValue.slice(0, 40) + '…'
                  : rawValue

              return (
                <ListItem
                  key={i}
                  secondaryAction={
                    <Tooltip title="Jump to cell">
                      <IconButton
                        edge="end"
                        size="small"
                        aria-label={`Jump to ${cell.colName}, row ${
                          cell.rowIndex + 1
                        }`}
                        onClick={() =>
                          onJumpTo(cell.rowIndex, cell.displayColIndex)
                        }
                      >
                        <MyLocationTwoTone fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ width: 32, height: 32, fontSize: 13 }}>
                      {isAgent ? (
                        <SmartToyTwoTone fontSize="small" />
                      ) : (
                        getInitials(profile)
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography variant="body2" fontWeight={500} noWrap>
                        {displayName}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="caption"
                          display="block"
                          noWrap
                        >
                          {cell.colName}, row {cell.rowIndex + 1}
                        </Typography>
                        <Typography
                          component="span"
                          variant="caption"
                          color="text.secondary"
                          display="block"
                          noWrap
                        >
                          {displayValue}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              )
            })}
          </List>
        )}
      </Box>
    </Drawer>
  )
}
