import {
  CardConfiguration,
  QueryWrapperPlotNavProps,
} from 'synapse-react-client'
import * as SynapseConstants from 'synapse-react-client/utils/SynapseConstants'
import { defaultSearchConfiguration, projectsSql } from '../resources'
import { TargetEnum } from 'synapse-react-client/utils/html/TargetEnum'

const rgbIndex = 4
export const projectCardConfiguration: CardConfiguration = {
  type: SynapseConstants.GENERIC_CARD,
  descriptionConfig: {
    showFullDescriptionByDefault: false,
  },
  genericCardSchema: {
    type: 'Project',
    title: 'name',
    subTitle: 'principalInvestigators',
    description: 'abstract',
    secondaryLabels: ['institutions', 'program', 'grant'],
  },
  secondaryLabelLimit: 4,
  titleLinkConfig: {
    isMarkdown: false,
    baseURL: 'Explore/Projects/DetailsPage',
    URLColumnName: 'shortName',
    matchColumnName: 'shortName',
    target: TargetEnum.CURRENT_WINDOW,
  },
  labelLinkConfig: [
    {
      isMarkdown: false,
      matchColumnName: 'moreInformation',
      linkColumnName: 'moreInformationURL',
    },
  ],
}

const projectsQueryWrapperPlotNavProps: QueryWrapperPlotNavProps = {
  rgbIndex,
  sql: projectsSql,
  shouldDeepLink: true,
  name: 'Projects',
  cardConfiguration: projectCardConfiguration,
  // unitDescription: 'Projects',
  facetsToPlot: [
    // 'name', //PORTALS-3259
    'institutions',
    'principalInvestigators',
    // 'grant', //PORTALS-3259
    // 'Program',
  ],
  searchConfiguration: defaultSearchConfiguration,
}

export default projectsQueryWrapperPlotNavProps
