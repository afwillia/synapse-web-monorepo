import InfiniteTableLayout from '@/components/layout/InfiniteTableLayout'
import OpenInvitationsToUserCard from '@/features/team/invitation/components/OpenInvitationsToUserCard'
import { useGetCurationTasksInfinite } from '@/synapse-queries/curation/task/useCurationTask'
import { useCurationTaskListFilters } from '@/utils/hooks/useCurationTaskListFilters'
import { Tab, Tabs, Typography } from '@mui/material'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { SyntheticEvent, useMemo, useState } from 'react'
import CurationTaskCard from './components/CurationTaskCard'
import FilteredByTaskIdsBanner from './components/FilteredByTaskIdsBanner'
import FilterTasksButton from './components/FilterTasksButton'
import sharedStyles from './components/shared.module.scss'

enum CuratorDashboardTab {
  TASKS = 'Tasks',
  PROJECTS = 'Projects',
  DATASETS = 'Datasets',
  METRICS = 'Metrics',
}

function tabA11yProps(tab: CuratorDashboardTab) {
  return {
    id: `curator-dashboard-tab-${tab}`,
    'aria-controls': `curator-dashboard-tabpanel-${tab}`,
  }
}

function TasksTabContent() {
  const {
    request,
    taskIds,
    clearTaskIdsFilter,
    stateFilter,
    toggleStateFilter,
  } = useCurationTaskListFilters({
    defaultAssignedToMe: true,
  })

  const {
    data: curationTasks,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetCurationTasksInfinite(request)

  const tasks = useMemo(() => {
    return curationTasks?.pages.flatMap(page => page.bundlePage ?? []) ?? []
  }, [curationTasks])

  return (
    <Stack gap={4}>
      <Typography variant="headline1">On Your Radar</Typography>
      <OpenInvitationsToUserCard cardProps={{ className: sharedStyles.card }} />
      <FilteredByTaskIdsBanner taskIds={taskIds} onClear={clearTaskIdsFilter} />
      <Stack direction="row" justifyContent="flex-end">
        <FilterTasksButton
          stateFilter={stateFilter}
          onToggleState={toggleStateFilter}
        />
      </Stack>
      <InfiniteTableLayout
        table={
          <Stack gap={3}>
            {tasks.map(taskBundle => (
              <CurationTaskCard
                key={taskBundle.task?.taskId}
                taskBundle={taskBundle}
              />
            ))}
          </Stack>
        }
        isLoading={isLoading}
        isEmpty={tasks.length === 0}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onFetchNextPageClicked={() => void fetchNextPage()}
        noResults={'There are currently no curation tasks assigned to you.'}
      ></InfiniteTableLayout>
    </Stack>
  )
}

function ComingSoonTabContent({ tab }: { tab: CuratorDashboardTab }) {
  return (
    <Typography variant="body1" color="text.secondary">
      {tab} coming soon.
    </Typography>
  )
}

export default function CuratorDashboardContent() {
  const [activeTab, setActiveTab] = useState(CuratorDashboardTab.TASKS)

  const handleTabChange = (
    _event: SyntheticEvent,
    newTab: CuratorDashboardTab,
  ) => {
    setActiveTab(newTab)
  }

  return (
    <Stack gap={4}>
      <Tabs value={activeTab} onChange={handleTabChange}>
        {Object.values(CuratorDashboardTab).map(tab => (
          <Tab key={tab} value={tab} label={tab} {...tabA11yProps(tab)} />
        ))}
      </Tabs>
      <Divider />
      <Box
        role="tabpanel"
        id={`curator-dashboard-tabpanel-${activeTab}`}
        aria-labelledby={`curator-dashboard-tab-${activeTab}`}
      >
        {activeTab === CuratorDashboardTab.TASKS ? (
          <TasksTabContent />
        ) : (
          <ComingSoonTabContent tab={activeTab} />
        )}
      </Box>
    </Stack>
  )
}
