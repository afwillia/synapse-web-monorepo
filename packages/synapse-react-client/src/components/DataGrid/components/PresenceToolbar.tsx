import {
  PersonOutline,
  PeopleOutline,
  SmartToyTwoTone,
} from '@mui/icons-material'
import { Chip, Divider, Popover, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import { useGetUserProfile } from '@/synapse-queries/user/useUserBundle'
import { RemotePresenceInfo } from '../utils/resolveRemoteSelections'

// Must match the $presence-palette order in _data-grid-extra.scss.
// Slots 0-3 (humans): orange, teal, purple, pink — ~90° apart on the hue wheel.
// Slots 4-7 (bots): darker variants at the same hues.
const PRESENCE_PALETTE = [
  '#f57c00', // orange  ~30°
  '#00838f', // teal   ~180°
  '#7b1fa2', // purple ~270°
  '#c2185b', // pink   ~315°
  '#e65100', // dark orange
  '#00695c', // dark teal
  '#4a148c', // dark purple
  '#880e4f', // dark pink
]

const COLLAPSE_THRESHOLD = 3

type PresenceToolbarProps = {
  remotePresence: RemotePresenceInfo[]
}

function UserChip({ presence }: { presence: RemotePresenceInfo }) {
  const color = PRESENCE_PALETTE[presence.paletteIndex]

  const { data: userProfile } = useGetUserProfile(presence.createdBy ?? '', {
    enabled: !!presence.createdBy,
  })

  const ownerName =
    userProfile?.firstName ?? presence.createdBy ?? presence.replicaId
  const displayName = presence.isHuman ? ownerName : `${ownerName}'s bot`

  return presence.isHuman ? (
    <Chip
      key={presence.replicaId}
      icon={<PersonOutline style={{ color }} />}
      label={displayName}
      size="small"
      variant="outlined"
      sx={{ borderColor: color, color }}
    />
  ) : (
    <Chip
      key={presence.replicaId}
      icon={<SmartToyTwoTone style={{ color }} />}
      label={displayName}
      size="small"
      variant="outlined"
      sx={{ borderColor: color }}
    />
  )
}

/**
 * For 1–2 remote users: renders individual chips inline.
 * For 3+ remote users: collapses into a single "N users" chip that opens a
 * popover listing everyone.
 */
export default function PresenceToolbar({
  remotePresence,
}: PresenceToolbarProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  if (remotePresence.length === 0) return null

  // Inline mode: show each chip directly
  if (remotePresence.length < COLLAPSE_THRESHOLD) {
    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        {remotePresence.map(p => (
          <UserChip key={p.replicaId} presence={p} />
        ))}
      </Stack>
    )
  }

  // Collapsed mode: single chip + popover
  const humans = remotePresence.filter(p => p.isHuman)
  const bots = remotePresence.filter(p => !p.isHuman)
  const count = remotePresence.length

  return (
    <>
      <Chip
        icon={<PeopleOutline />}
        label={`${count} users`}
        size="small"
        variant="outlined"
        onClick={e => setAnchorEl(e.currentTarget)}
        sx={{ cursor: 'pointer' }}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Stack spacing={0.5} sx={{ p: 1.5, minWidth: 160 }}>
          {humans.length > 0 && (
            <>
              <Typography variant="caption" color="text.secondary">
                Users
              </Typography>
              {humans.map(p => (
                <UserChip key={p.replicaId} presence={p} />
              ))}
            </>
          )}
          {humans.length > 0 && bots.length > 0 && <Divider />}
          {bots.length > 0 && (
            <>
              <Typography variant="caption" color="text.secondary">
                Bots
              </Typography>
              {bots.map(p => (
                <UserChip key={p.replicaId} presence={p} />
              ))}
            </>
          )}
        </Stack>
      </Popover>
    </>
  )
}
