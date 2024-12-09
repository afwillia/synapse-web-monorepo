import DetailsPage from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage'
import { DetailsPageContent } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageContentLayout'
import { DetailsPageContextConsumer } from '@sage-bionetworks/synapse-portal-framework/components/DetailsPage/DetailsPageContext'
import ToggleSynapseObjects from '@sage-bionetworks/synapse-portal-framework/components/ToggleSynapseObjects'
import { useGetPortalComponentSearchParams } from '@sage-bionetworks/synapse-portal-framework/utils/UseGetPortalComponentSearchParams'
import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import React from 'react'
import {
  computationalSql,
  experimentalModelsSql,
  peopleSql,
  projectsSql,
  publicationsSql,
  studiesSql,
  targetEnablingResourcesDetailsPageSql,
} from 'src/config/resources'
import {
  COMPUTATIONAL_TOOLS_COLUMN_NAMES,
  computationalCardConfiguration,
} from 'src/config/synapseConfigs/computational_tools'
import {
  EXPERIMENTAL_MODELS_COLUMN_NAMES,
  experimentalDetailsTableConfigurationColumnLinks,
  experimentalToolsCardConfiguration,
} from 'src/config/synapseConfigs/experimental_tools'
import { PEOPLE_COLUMN_NAMES } from 'src/config/synapseConfigs/people'
import {
  PROJECT_TABLE_COLUMN_NAMES,
  projectCardConfiguration,
} from 'src/config/synapseConfigs/projects'
import {
  publicationCardProps,
  PUBLICATIONS_TABLE_COLUMN_NAMES,
} from 'src/config/synapseConfigs/publications'
import {
  STUDY_TABLE_COLUMN_NAMES,
  studyCardConfiguration,
} from 'src/config/synapseConfigs/studies'
import {
  TARGET_ENABLING_RESOURCES_COLUMN_NAMES,
  targetEnablingResourcesCardConfiguration,
} from 'src/config/synapseConfigs/target_enabling_resources'
import {
  CardContainerLogic,
  StandaloneQueryWrapper,
  SynapseConstants,
} from 'synapse-react-client'

export default function ProjectDetailsPage() {
  const searchParams = useGetPortalComponentSearchParams()

  return (
    <>
      <CardContainerLogic
        sql={projectsSql}
        isHeader={true}
        {...projectCardConfiguration}
        searchParams={searchParams}
      />
      <DetailsPage showMenu={true} sql={projectsSql}>
        <DetailsPageContextConsumer
          columnName={PROJECT_TABLE_COLUMN_NAMES.GRANT_NUMBER}
        >
          {({ value: grantNumber }) => (
            <DetailsPageContent
              content={[
                {
                  title: 'Studies',
                  id: 'Studies',
                  element: (
                    <CardContainerLogic
                      {...studyCardConfiguration}
                      sql={studiesSql}
                      searchParams={{
                        [STUDY_TABLE_COLUMN_NAMES.GRANT_NUMBER]: grantNumber!,
                      }}
                    />
                  ),
                },
                {
                  title: 'Publications',
                  id: 'Publications',
                  element: (
                    <CardContainerLogic
                      sql={publicationsSql}
                      {...publicationCardProps}
                      searchParams={{
                        [PUBLICATIONS_TABLE_COLUMN_NAMES.GRANT]: grantNumber!,
                      }}
                    />
                  ),
                },
                {
                  title: 'Experimental Models',
                  id: 'Experimental Models',
                  element: (
                    <ToggleSynapseObjects
                      icon1={'table'}
                      synapseObject1={
                        <StandaloneQueryWrapper
                          sql={experimentalModelsSql}
                          rgbIndex={4}
                          sqlOperator={ColumnSingleValueFilterOperator.EQUAL}
                          columnLinks={
                            experimentalDetailsTableConfigurationColumnLinks
                          }
                          searchParams={{
                            [EXPERIMENTAL_MODELS_COLUMN_NAMES.GRANT]:
                              grantNumber!,
                          }}
                          hideQueryCount
                        />
                      }
                      icon2={'cards'}
                      synapseObject2={
                        <CardContainerLogic
                          sql={experimentalModelsSql}
                          {...experimentalToolsCardConfiguration}
                          searchParams={{
                            [EXPERIMENTAL_MODELS_COLUMN_NAMES.GRANT]:
                              grantNumber!,
                          }}
                        />
                      }
                    />
                  ),
                },
                {
                  title: 'Computational Tools',
                  id: 'Computational Tools',
                  element: (
                    <CardContainerLogic
                      sql={computationalSql}
                      {...computationalCardConfiguration}
                      searchParams={{
                        [COMPUTATIONAL_TOOLS_COLUMN_NAMES.GRANT]: grantNumber!,
                      }}
                    />
                  ),
                },
                {
                  title: 'Target Enabling Resources',
                  id: 'Target Enabling Resources',
                  element: (
                    <CardContainerLogic
                      sql={targetEnablingResourcesDetailsPageSql}
                      {...targetEnablingResourcesCardConfiguration}
                      searchParams={{
                        [TARGET_ENABLING_RESOURCES_COLUMN_NAMES.GRANT]:
                          grantNumber!,
                      }}
                    />
                  ),
                },
                {
                  title: 'People',
                  id: 'People',
                  element: (
                    <CardContainerLogic
                      sql={peopleSql}
                      limit={6}
                      type={SynapseConstants.MEDIUM_USER_CARD}
                      searchParams={{
                        [PEOPLE_COLUMN_NAMES.GRANT_NUMBER]: grantNumber!,
                      }}
                    />
                  ),
                },
              ]}
            />
          )}
        </DetailsPageContextConsumer>
      </DetailsPage>
    </>
  )
}