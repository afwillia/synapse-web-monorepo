import Plotly, { AxisType, PlotType } from 'plotly.js-basic-dist'
import React from 'react'
import createPlotlyComponent from 'react-plotly.js/factory'
import { SynapseConstants } from '../../utils'
import {
  QueryBundleRequest,
  QueryFilter,
} from '@sage-bionetworks/synapse-types'
import { parseEntityIdFromSqlStatement } from '../../utils/functions/SqlFunctions'
import { useGetFullTableQueryResults } from '../../synapse-queries'
const Plot = createPlotlyComponent(Plotly)

export type SynapsePlotWidgetParams = {
  query: string //sql string
  title: string //plot title
  xtitle: string // x-axis title
  ytitle: string // y-axis title
  type: string // Plotly PlotType
  xaxistype: string // Plotly AxisType
  showlegend?: string // sets the legend visibility ('true' | 'false')
  horizontal?: string // sets the if a bar chart should be horizontal or vertical ('true' | 'false')
  barmode?: string // Plotly barmode ('stack' | 'group' | 'overlay' | 'relative')
  additionalFilters?: QueryFilter[] // Usually undefined, but is set in the context of a QueryWrapperPlotNav.additionalPlots
}
export type SynapsePlotProps = {
  widgetparamsMapped: SynapsePlotWidgetParams
}

const toBoolean = (v?: string) => {
  return v ? v.toLowerCase() == 'true' : false
}
export const SynapsePlot = (props: SynapsePlotProps) => {
  const { query, additionalFilters } = props.widgetparamsMapped
  const queryRequest: QueryBundleRequest = {
    concreteType: 'org.sagebionetworks.repo.model.table.QueryBundleRequest',
    partMask: SynapseConstants.BUNDLE_MASK_QUERY_RESULTS,
    entityId: parseEntityIdFromSqlStatement(query),
    query: {
      sql: query,
      additionalFilters,
    },
  }
  const { data: queryData, isLoading } =
    useGetFullTableQueryResults(queryRequest)
  if (isLoading || !queryData) {
    return <></>
  }

  const { title, xtitle, ytitle, type, xaxistype, showlegend, barmode } =
    props.widgetparamsMapped
  const isShowLegend = toBoolean(showlegend)
  const isHorizontal = toBoolean(props.widgetparamsMapped.horizontal)
  const layout: Partial<Plotly.Layout> = {
    showlegend: isShowLegend,
    title,
    barmode: barmode
      ? (barmode.toLowerCase() as 'stack' | 'group' | 'overlay' | 'relative')
      : undefined,
  }
  if (xtitle) {
    layout.xaxis = {
      title: xtitle,
    }
  }
  if (xaxistype) {
    layout.xaxis = {
      ...layout.xaxis,
      type: xaxistype.toLowerCase() as AxisType,
    }
  }
  if (ytitle) {
    layout.yaxis = {
      title: ytitle,
    }
  }
  // init plot_data
  const plotData: Partial<Plotly.PlotData>[] = []
  const orientation = isHorizontal ? 'h' : 'v'
  const headers = queryData.queryResult?.queryResults.headers ?? []
  for (let i = 0; i < headers.length - 1; i += 1) {
    // make an entry for each set of data points
    plotData[i] = {
      orientation,
      name: headers[i + 1].name,
      type: type.toLowerCase() as PlotType,
      x: [] as Plotly.Datum[],
      y: [] as Plotly.Datum[],
    }
  }
  // grab all the data
  for (const row of queryData.queryResult?.queryResults.rows ?? []) {
    for (let j = 1; j < row.values.length; j += 1) {
      // create pairs of data
      const rowValues = row.values
      const xArray = plotData[j - 1]!.x as Plotly.Datum[]
      const yArray = plotData[j - 1]!.y as Plotly.Datum[]
      xArray.push(rowValues[0])
      yArray.push(rowValues[j])
    }
  }
  return <Plot layout={layout} data={plotData} />
}

export default SynapsePlot
