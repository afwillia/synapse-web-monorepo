import { OAuthClientError } from './OAuthClientError'
import React, { useCallback, useEffect } from 'react'
import {
  ApplicationSessionManager,
  useFramebuster,
  SynapseConstants,
} from 'synapse-react-client'
import { handleErrorRedirect } from './URLUtils'
import UniversalCookies from 'universal-cookie'

const cookies = new UniversalCookies()
function AppInitializer(
  props: React.PropsWithChildren<Record<string, unknown>>,
) {
  const accountSitePrompted =
    cookies.get(SynapseConstants.ACCOUNT_SITE_PROMPTED_FOR_LOGIN_COOKIE_KEY) ==
    'true' // short-lived cookie
  const urlSearchParams = new URLSearchParams(window.location.search)
  const prompt = accountSitePrompted ? 'none' : urlSearchParams.get('prompt')

  let maxAge = undefined
  // check max age when re-establishing the session, not to auto-consent.
  const maxAgeURLParam = urlSearchParams.get('max_age')
  // SWC-5597: if max_age is defined, then return if the user last authenticated more than max_age seconds ago
  if (!accountSitePrompted && maxAgeURLParam && parseInt(maxAgeURLParam)) {
    maxAge = parseInt(maxAgeURLParam)
  }
  const clientId = urlSearchParams.get('client_id') ?? undefined

  useEffect(() => {
    // can override endpoints as https://repo-staging.prod.sagebase.org/ and https://staging.synapse.org for staging

    const isStaging: boolean = window.location.hostname.includes('staging')
    const isDev: boolean = window.location.hostname.includes('dev')

    const stagingConfig = {
      REPO: SynapseConstants.SYNAPSE_BACKEND_STAGING_URL,
      PORTAL: 'https://staging.synapse.org/',
    }

    const devConfig = {
      REPO: SynapseConstants.SYNAPSE_BACKEND_DEV_URL,
      PORTAL: 'https://portal-dev.dev.sagebase.org/',
    }

    if (isStaging || isDev) {
      if (!(window as any).SRC) {
        ;(window as any).SRC = {}
      }

      ;(window as any).SRC.OVERRIDE_ENDPOINT_CONFIG = isStaging
        ? stagingConfig
        : devConfig
    }
  }, [])

  const onNoAccessTokenFound = useCallback(() => {
    if (prompt === 'none') {
      // not logged in, and prompt is "none".
      handleErrorRedirect(
        new OAuthClientError(
          'login_required',
          'User is not logged in, and prompt was set to none',
        ),
      )
    }
  }, [prompt])

  const isFramed = useFramebuster()
  if (prompt === 'login') {
    maxAge = 0
  }
  return (
    <ApplicationSessionManager
      maxAge={maxAge}
      onNoAccessTokenFound={onNoAccessTokenFound}
      appId={clientId}
    >
      {!isFramed && props.children}
    </ApplicationSessionManager>
  )
}

export default AppInitializer
