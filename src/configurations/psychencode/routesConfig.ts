import { GenericRoute } from 'types/portal-config'
import { studies, studyDetailPage } from './synapseConfigs/studies'
import { publications } from './synapseConfigs/publications'
import routeButtonControlWrapperProps from './routeButtonControlWrapperProps'
import { grants, grantsDetailPage } from './synapseConfigs/grants'
import { people } from './synapseConfigs/people'
import { data } from './synapseConfigs/data'
import loadingScreen from './loadingScreen'
import { peopleSql } from './resources'

const routes: GenericRoute[] = [
  {
    to: '',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Goals',
        title: 'Portal Goals',
        centerTitle: true,
        outsideContainerClassName: 'home-spacer',
        props: {
          entityId: 'syn22315959',
        },
      },
      {
        name: 'Markdown',
        title: 'About the Portal',
        centerTitle: true,
        outsideContainerClassName: 'home-bg-dark home-spacer',
        className: 'home-container-description',
        props: {
          ownerId: 'syn21557271',
          wikiId: '605319',
        },
      },
      {
        name: 'Markdown',
        title: 'Featured Data',
        outsideContainerClassName: '',
        className: 'home-container-description',
        centerTitle: true,
        props: {
          ownerId: 'syn21557271',
          wikiId: '605308',
        },
      },
      {
        name: 'UpsetPlot',
        className: 'whatThePlot',
        outsideContainerClassName: 'home-spacer',
        centerTitle: true,
        props: {
          sql:
            'SELECT unnest(individualID), assay FROM syn20821313 WHERE individualID is not null GROUP BY assay, unnest(individualID)',
          rgbIndex: 0,
          maxBarCount: 20,
          setName: '# Individuals per assay',
          combinationName: '# Individuals',
          loadingScreen: loadingScreen,
          summaryLinkText: 'EXPLORE ALL DATA',
          summaryLink: '/Explore/Data',
        },
      },
      {
        name: 'UserCardListRotate',
        title: 'Our People and Institutions',
        outsideContainerClassName: 'home-spacer home-bg-dark',
        centerTitle: true,
        props: {
          sql: `${peopleSql} where feature=true`,
          count: 3,
          loadingScreen,
          summaryLink: 'Explore/People',
          summaryLinkText: 'EXPLORE ALL PEOPLE',
        },
      },
      {
        name: 'Resources',
        outsideContainerClassName: 'home-spacer',
        title: 'Related Resources',
        centerTitle: true,
        props: {
          entityId: 'syn22311127',
        },
      },
      {
        name: 'Markdown',
        outsideContainerClassName: '',
        className: '',
        props: {
          ownerId: 'syn21557271',
          wikiId: '605340',
        },
      },
    ],
  },
  {
    to: 'Explore',
    isNested: true,
    routes: [
      {
        to: 'Studies',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: studies,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: studyDetailPage,
          },
        ],
      },
      {
        to: 'Data',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: data,
            },
          },
        ],
      },
      {
        to: 'Grants',
        isNested: true,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: grants,
            },
          },
        ],
        routes: [
          {
            to: 'DetailsPage',
            isNested: false,
            synapseConfigArray: grantsDetailPage,
          },
        ],
      },
      {
        to: 'Publications',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: publications,
            },
          },
        ],
      },
      {
        to: 'People',
        isNested: false,
        synapseConfigArray: [
          {
            name: 'RouteButtonControlWrapper',
            title: 'EXPLORE',
            props: {
              ...routeButtonControlWrapperProps,
              synapseConfig: people,
            },
          },
        ],
      },
    ],
  },
  {
    displayName: 'Data Access',
    to: 'DataAccess',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'Data Access',
        props: {
          ownerId: 'syn4921369',
          wikiId: '477467',
        },
      },
    ],
  },
  {
    to: 'About',
    isNested: false,
    synapseConfigArray: [
      {
        name: 'Markdown',
        title: 'About',
        props: {
          ownerId: 'syn4921369',
          wikiId: '235539',
        },
      },
    ],
  },
]

export default routes
