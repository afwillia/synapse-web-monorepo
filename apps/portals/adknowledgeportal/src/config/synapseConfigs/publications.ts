import { Direction } from '@sage-bionetworks/synapse-types'
import {
  QueryWrapperPlotNavProps,
  SynapseConstants,
} from 'synapse-react-client'
import { publicationsSql } from '../resources'

const rgbIndex = 5

export const publicationCardProps = {
  type: SynapseConstants.GENERIC_CARD,
  genericCardSchema: {
    type: SynapseConstants.PUBLICATION,
    title: 'title',
    subTitle: 'authors',
    link: 'DOI',
    secondaryLabels: [
      'year',
      'journal',
      'Program',
      'grant',
      'DOI',
      'pubmed_id',
    ],
  },
}

const columnAliases = {
  pubmed_id: 'Pubmed ID',
}

export const publicationsQueryWrapperPlotNavProps: QueryWrapperPlotNavProps = {
  rgbIndex,
  sql: publicationsSql,
  name: 'Publications',
  shouldDeepLink: true,
  facetValueSortConfigs: [{ columnName: 'year', direction: Direction.DESC }],
  facetsToPlot: ['Program', 'year', 'grant', 'journal'],
  cardConfiguration: publicationCardProps,
  columnAliases,
}

export const PUBLICATIONS_TABLE_COLUMN_NAMES = {
  GRANT: 'grant',
}