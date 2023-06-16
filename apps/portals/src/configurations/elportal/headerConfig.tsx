import { AddAlertTwoTone } from '@mui/icons-material'
import { Link } from '@mui/material'
import React from 'react'
import { HomePageHeaderConfig } from 'types/portal-config'

const homePageHeader: HomePageHeaderConfig = {
  summary: (
    <>
      Discover and explore exceptional longevity data, analyses, and tools
      generated by the translational longevity research projects supported by
      the National Institute on Aging (NIA).
      <>
        <Link
          href="https://news.eliteportal.org/elite-portal-newsletter/"
          target="_blank"
          sx={{
            color: 'white',
            '&:hover': { color: 'white' },
            '&:focus': { color: 'white' },
            marginTop: '15px',
            display: 'block',
          }}
        >
          <AddAlertTwoTone
            sx={{ width: '16px', height: '16px', marginRight: '7px' }}
          />
          Subscribe to the ELITE Portal Newsletter
        </Link>
      </>
    </>
  ),
  title:
    'Welcome to the Exceptional Longevity Translational Resources (ELITE) Portal',
}

export default homePageHeader
