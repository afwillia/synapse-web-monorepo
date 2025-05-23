import { ColumnSingleValueFilterOperator } from '@sage-bionetworks/synapse-types'
import {
  LabelLinkConfig,
  QueryWrapperPlotNavProps,
  StandaloneQueryWrapperProps,
} from 'synapse-react-client'
import columnAliases from '../columnAliases'
import { dataFtsConfig, dataSql, DST_TABLE_COLUMN_NAMES } from '../resources'

const dataRgbIndex = 0
export const dataColumnLinks: LabelLinkConfig = [
  {
    isMarkdown: true,
    // the column whose value will be used for the markdown
    matchColumnName: 'acronym',
    // If set, also show a tooltip
    // tooltipText?: string
  },
]

export const dataQueryWrapperPlotNavProps: QueryWrapperPlotNavProps = {
  rgbIndex: dataRgbIndex,
  shouldDeepLink: true,
  hideDownload: false,
  sql: dataSql,
  name: 'Standards',
  columnAliases,
  tableConfiguration: {
    showDownloadColumn: false,
    columnLinks: dataColumnLinks,
  },

  facetsToPlot: [
    'topic',
    // 'Organizations',
    DST_TABLE_COLUMN_NAMES.RELEVANT_ORG_NAMES,
  ],
  initialPlotType: 'BAR',
  searchConfiguration: {
    ftsConfig: dataFtsConfig,
  },
}

export const dataDetailPageProps: StandaloneQueryWrapperProps = {
  sql: dataSql,
  rgbIndex: dataRgbIndex,
  columnLinks: dataColumnLinks,
  hideDownload: true,
  sqlOperator: ColumnSingleValueFilterOperator.EQUAL,
}

export default dataQueryWrapperPlotNavProps
