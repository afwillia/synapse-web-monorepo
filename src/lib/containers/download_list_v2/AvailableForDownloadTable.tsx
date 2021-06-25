import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useSynapseContext } from '../../utils/SynapseContext'
import { SynapseErrorBoundary } from '../ErrorBanner'
import DownloadListTable from './DownloadListTable'

/**
 * Table of the files added to the Download Cart that are currently available for download.
 * Note that this creates it's own QueryClient, so it's cache does not persist if you remount.
 */
export default function AvailableForDownloadTable() {
  const { accessToken } = useSynapseContext()
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 50 * 1000, // 50s
        retry: false, // SynapseClient knows which queries to retry
      },
    },
  })
  if (!accessToken) {
    return <></>
  }
  return (
    <QueryClientProvider client={queryClient}>
      <SynapseErrorBoundary>
        <DownloadListTable />
      </SynapseErrorBoundary>
    </QueryClientProvider>
  )
}
