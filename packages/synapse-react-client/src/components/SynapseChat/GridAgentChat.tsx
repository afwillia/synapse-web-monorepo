import { useState, useMemo } from 'react'
import DraggableDialog from '../DraggableDialog/DraggableDialog'
import { SynapseChat } from './index'
import { ChatInteraction } from './SynapseChat'
import { AgentSession, AgentAccessLevel } from '@sage-bionetworks/synapse-types'
import { GridAgentSessionContext } from '@sage-bionetworks/synapse-client'
import { Box } from '@mui/material'
import SelectionIndicator from './SelectionIndicator'
import {
  GridModel,
  GridModelSnapshot,
} from '@/components/DataGrid/DataGridTypes'
import { convertReplicaSelectionToSelectionWithId } from '@/components/DataGrid/utils/convertReplicaSelectionToSelectionWithId'

export type GridAgentChatProps = {
  gridSessionId: string
  usersReplicaId: number
  chatbotName?: string
  initialMessage?: string
  open: boolean
  onClose: () => void
  model?: GridModel | null
  modelSnapshot?: GridModelSnapshot | null
}

export function GridAgentChat({
  gridSessionId,
  usersReplicaId,
  chatbotName = 'Grid Assistant',
  initialMessage,
  open,
  onClose,
  model,
  modelSnapshot,
}: GridAgentChatProps) {
  // Storing state for the chat session here preserves chat history while the dialog is opened and closed.
  const [agentSession, setAgentSession] = useState<AgentSession | undefined>()
  const [interactions, setInteractions] = useState<ChatInteraction[]>([])

  // Create session context for grid sessions
  const sessionContext: GridAgentSessionContext = {
    concreteType:
      'org.sagebionetworks.repo.model.agent.GridAgentSessionContext',
    gridSessionId,
    usersReplicaId,
  }

  // Extract the current user's selection from the model
  const selection = useMemo(() => {
    if (!model || !modelSnapshot || !usersReplicaId) {
      return null
    }

    const replicaIdStr = usersReplicaId.toString()
    const replicaSelection = modelSnapshot.selection?.[replicaIdStr]

    if (!replicaSelection) {
      return null
    }

    return convertReplicaSelectionToSelectionWithId(
      replicaSelection,
      model,
      modelSnapshot,
    )
  }, [model, modelSnapshot, usersReplicaId])

  return (
    <DraggableDialog open={open} onClose={onClose} title={chatbotName}>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {selection && (
          <Box sx={{ px: 2, pt: 2, pb: 1 }}>
            <SelectionIndicator selection={selection} />
          </Box>
        )}
        <SynapseChat
          chatbotName={chatbotName}
          initialMessage={initialMessage}
          sessionContext={sessionContext}
          textboxPositionOffset="16px"
          hideTitle={true}
          showAccessLevelMenu={false}
          defaultAgentAccessLevel={AgentAccessLevel.WRITE_YOUR_PRIVATE_DATA}
          // lift state: allow GridAgentChat to control the agent session and interactions
          externalSession={agentSession}
          setExternalSession={setAgentSession}
          externalInteractions={interactions}
          setExternalInteractions={setInteractions}
        />
      </Box>
    </DraggableDialog>
  )
}

export default GridAgentChat
