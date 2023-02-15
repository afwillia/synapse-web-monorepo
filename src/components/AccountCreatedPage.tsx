import React, { useEffect, useState } from 'react'
import { useSourceApp, SourceAppLogo } from './SourceApp'
import { Button, Link, Grid } from '@mui/material'
import { AppContextConsumer } from 'AppContext'
import {
  SynapseClient,
  SynapseComponents,
  Typography,
} from 'synapse-react-client'
import { Link as RouterLink } from 'react-router-dom'
import SourceAppConfigs from './SourceAppConfigs'
import { LeftRightPanel } from './LeftRightPanel'
import { sage } from 'configs/sagebionetworks'
import { isMembershipInvtnSignedToken } from 'synapse-react-client/dist/utils/synapseTypes/SignedToken/MembershipInvtnSignedToken'
import { useSynapseContext } from 'synapse-react-client/dist/utils/SynapseContext'
import { displayToast } from 'synapse-react-client/dist/containers/ToastMessage'
import { SignedTokenInterface } from 'synapse-react-client/dist/utils/synapseTypes/SignedToken/SignedTokenInterface'

export type AccountCreatedPageProps = {}

export const AccountCreatedPage = (props: AccountCreatedPageProps) => {
  const { accessToken } = useSynapseContext()
  const [signedToken, setSignedToken] = useState<
    SignedTokenInterface | undefined
  >()
  const localStorageSignedToken = localStorage.getItem('signedToken')
  useEffect(() => {
    if (localStorageSignedToken) {
      setSignedToken(
        JSON.parse(
          SynapseComponents.hex2ascii(localStorageSignedToken),
        ) as SignedTokenInterface,
      )
    }
  }, [localStorageSignedToken])

  // If we have a MembershipInvtnSignedToken in the local storage, then process and clear it!
  useEffect(() => {
    const fetchData = async () => {
      if (
        accessToken &&
        signedToken &&
        isMembershipInvtnSignedToken(signedToken)
      ) {
        let membershipInvitation = await SynapseClient.getMembershipInvitation(
          signedToken,
        )
        if (!membershipInvitation.inviteeId) {
          // email is filled in, we must first bind the invitation
          const inviteeSignedToken =
            await SynapseClient.getInviteeVerificationSignedToken(
              membershipInvitation.id,
              accessToken,
            )
          try {
            // attempt to bind the membership invite to new account
            await SynapseClient.bindInvitationToAuthenticatedUser(
              inviteeSignedToken,
              membershipInvitation.id,
              accessToken,
            )
            membershipInvitation = await SynapseClient.getMembershipInvitation(
              signedToken,
            )
          } catch (error) {
            if (error?.status === 403) {
              displayToast(
                `Couldn't join the team. This invitation was sent to an email address not associated to the current user. ${membershipInvitation.inviteeEmail} Please add this email in your Account Settings, or log in with the correct account before accepting the invitation.`,
                'warning',
                {
                  primaryButtonConfig: {
                    text: 'Account Settings',
                    href: '/authenticated/myaccount',
                  },
                },
              )
            } else {
              throw error
            }
          }
        }

        // returns undefined (if inviteeId is null)
        if (membershipInvitation.inviteeId) {
          await SynapseClient.addTeamMemberAsAuthenticatedUserOrAdmin(
            membershipInvitation.teamId,
            membershipInvitation.inviteeId,
            accessToken,
          )
          // clear token from local storage, and show success UI
          localStorage.removeItem('signedToken')
          setSignedToken(undefined)
          displayToast(`Successfully joined the team.`)
        }
      }
    }

    if (
      accessToken &&
      signedToken &&
      isMembershipInvtnSignedToken(signedToken)
    ) {
      fetchData().catch(err => {
        displayToast(err.reason, 'danger')
      })
    }
  }, [signedToken])

  const sourceApp = useSourceApp()
  return (
    <>
      <AppContextConsumer>
        {appContext => (
          <LeftRightPanel
            className={'AccountCreatedPage'}
            leftContent={
              <div>
                <SourceAppLogo
                  sx={{ textAlign: 'center', paddingBottom: '50px' }}
                />
                <Typography variant="headline2">Account created</Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ paddingTop: '10px', paddingBottom: '20px' }}
                >
                  <strong>Welcome to {sourceApp?.friendlyName}!</strong>
                </Typography>
                <p>
                  You’ve created a Sage Account, which you can use on the{' '}
                  {sourceApp?.friendlyName}.
                </p>
                <p>
                  For full access to data and other functionality, we’ll need
                  additional information to verify your identity and certify you
                  to upload data.
                </p>
                <Link
                  color="primary"
                  component={RouterLink}
                  to="/authenticated/validate"
                  sx={{ paddingTop: '30px' }}
                >
                  Start identity verification
                </Link>
                <Link
                  color="primary"
                  component={RouterLink}
                  to="/authenticated/certificationquiz"
                  sx={{ paddingTop: '15px', paddingBottom: '15px' }}
                >
                  Get certified for data upload
                </Link>
                <Button
                  type="button"
                  color="primary"
                  variant="contained"
                  sx={{ padding: '10px', height: '100%' }}
                  onClick={() => {
                    appContext?.redirectURL &&
                      window.location.assign(appContext.redirectURL)
                  }}
                >
                  Take me to {sourceApp?.friendlyName}
                </Button>
              </div>
            }
            rightContent={
              <div className={'panel-right-text'}>
                <Typography
                  variant="headline3"
                  sx={{ paddingBottom: '30px', fontWeight: 500 }}
                >
                  Your <strong>Sage Account</strong> can also be used to access
                  all these resources.
                </Typography>
                <Grid container spacing={5} mx={{ paddingTop: '20px' }}>
                  {SourceAppConfigs.map(config => {
                    if (
                      config.appId != sourceApp?.appId &&
                      config.appId != sage.appId
                    ) {
                      return (
                        <Grid item xs={6} className="sourceAppItem">
                          <a href={config.appURL}>{config.logo}</a>
                        </Grid>
                      )
                    } else {
                      return <></>
                    }
                  })}
                </Grid>
              </div>
            }
          ></LeftRightPanel>
        )}
      </AppContextConsumer>
    </>
  )
}
