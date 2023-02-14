import React, { useEffect, useState } from 'react'
import { Button, Box } from '@mui/material'
import { useAppContext } from 'AppContext'
import { Typography, SynapseClient } from 'synapse-react-client'
import { Redirect } from 'react-router-dom'
import theme from 'style/theme'

import {
  isJoinTeamSignedToken,
  JoinTeamSignedToken,
} from 'synapse-react-client/dist/utils/synapseTypes/SignedToken/JoinTeamSignedToken'
import { isMembershipInvtnSignedToken } from 'synapse-react-client/dist/utils/synapseTypes/SignedToken/MembershipInvtnSignedToken'
import { CelebrationOutlined, Groups2Outlined } from '@mui/icons-material'
import UserOrTeamBadge from 'synapse-react-client/dist/containers/UserOrTeamBadge'
import { MembershipInvitation } from 'synapse-react-client/dist/utils/synapseTypes/MembershipInvitation'
import { ResponseMessage } from 'synapse-react-client/dist/utils/synapseTypes/ResponseMessage'
import { displayToast } from 'synapse-react-client/dist/containers/ToastMessage'
import { StyledOuterContainer } from './StyledComponents'

export type JoinTeamPageProps = {}

export const JoinTeamPage = (props: JoinTeamPageProps) => {
  const context = useAppContext()
  const [joinTeamToken, setJoinTeamToken] = useState<JoinTeamSignedToken>()
  const [joinedTeamResponseMessage, setJoinedTeamResponseMessage] =
    useState<ResponseMessage>()
  const [redirectToRegistration, setRedirectToRegistration] =
    useState<boolean>(false)
  const [redirectToTeamPage, setRedirectToTeamPage] = useState<boolean>(false)
  const [membershipInvitation, setMembershipInvitation] =
    useState<MembershipInvitation>()
  useEffect(() => {
    if (context && context.signedToken) {
      if (isJoinTeamSignedToken(context.signedToken)) {
        setJoinTeamToken(context.signedToken)
      } else if (isMembershipInvtnSignedToken(context.signedToken)) {
        SynapseClient.getMembershipInvitation(context.signedToken, '').then(
          invitation => {
            setMembershipInvitation(invitation)
          },
        )
      }
    }
  }, [context])

  useEffect(() => {
    if (redirectToTeamPage) {
      window.location.href = `https://www.synapse.org/#!Team:${joinTeamToken?.teamId}`
    }
  }, [redirectToTeamPage])

  useEffect(() => {
    if (joinTeamToken) {
      SynapseClient.addTeamMemberWithToken(joinTeamToken)
        .then(responseMessage => {
          // clear token from local storage, and show success UI
          localStorage.removeItem('signedToken')
          setJoinedTeamResponseMessage(responseMessage)
        })
        .catch(error => {
          displayToast(error.reason, 'danger')
        })
    }
  }, [joinTeamToken])

  return (
    <StyledOuterContainer>
      {redirectToRegistration && <Redirect to="/register1" />}
      <Box
        sx={{
          width: '500px',
          padding: theme.spacing(8),
          margin: '0 auto',
          backgroundColor: '#fff',
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
            width: '100px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: theme.spacing(4),
            justifyContent: 'center',
            height: '100px',
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
          }}
        >
          {joinedTeamResponseMessage && (
            <CelebrationOutlined sx={{ color: '#fff', fontSize: '64px' }} />
          )}
          {membershipInvitation && (
            <Groups2Outlined sx={{ color: '#fff', fontSize: '64px' }} />
          )}
        </Box>
        {membershipInvitation && (
          <>
            <Typography variant="headline2" paragraph>
              Join a Team
            </Typography>
            <Typography
              variant="body1"
              sx={{ paddingTop: '10px', paddingBottom: '50px' }}
            >
              <UserOrTeamBadge principalId={membershipInvitation.createdBy} />{' '}
              invited you to join:
              <br />
              <UserOrTeamBadge principalId={membershipInvitation.teamId} />
            </Typography>
            <Button
              type="button"
              color="primary"
              variant="contained"
              fullWidth
              sx={{ padding: '10px', height: '100%' }}
              onClick={() => {
                setRedirectToRegistration(true)
              }}
            >
              Register for a new account
            </Button>
          </>
        )}
        {joinedTeamResponseMessage && (
          <>
            <Typography variant="headline2" paragraph>
              Joined a Team!
            </Typography>
            <Typography
              variant="body1"
              sx={{ paddingTop: '10px', paddingBottom: '50px' }}
            >
              <UserOrTeamBadge principalId={joinTeamToken?.memberId} /> is now a
              member of:
              <br />
              <UserOrTeamBadge principalId={joinTeamToken?.teamId} />
            </Typography>
            <Button
              type="button"
              color="primary"
              variant="contained"
              fullWidth
              sx={{ padding: '10px', height: '100%' }}
              onClick={() => {
                setRedirectToTeamPage(true)
              }}
            >
              View the team page
            </Button>
          </>
        )}
      </Box>
    </StyledOuterContainer>
  )
}
