import {
  useGetEntityHeader,
  useGetEntityPath,
  useGetFavorites,
  useGetProjectsInfinite,
} from '@/synapse-queries'
import useGetEntityBundle from '@/synapse-queries/entity/useEntityBundle'
import { convertToEntityType } from '@/utils/functions/EntityTypeUtils'
import { SYNAPSE_ENTITY_ID_REGEX } from '@/utils/functions/RegularExpressions'
import {
  ALL_ENTITY_BUNDLE_FIELDS,
  EntityPath,
  EntityType,
  Reference,
} from '@sage-bionetworks/synapse-types'
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import DropdownSelect from '../../DropdownSelect/DropdownSelect'
import { SynapseSpinner } from '../../LoadingScreen/LoadingScreen'
import { displayToast } from '../../ToastMessage/ToastMessage'
import { BreadcrumbItem } from '../Breadcrumbs'
import { toEntityHeader } from '../details/configurations/ProjectListDetails'
import {
  EntityDetailsListDataConfiguration,
  EntityDetailsListDataConfigurationType,
} from '../details/EntityDetailsList'
import { EntityFinderHeader } from '../EntityFinderHeader'
import { EntitySelectionMapType } from '../useEntitySelection'
import {
  EntityTreeNodeType,
  RootNodeConfiguration,
  VirtualizedTree,
} from './VirtualizedTree'

const isEntityIdInPath = (entityId: string, path: EntityPath): boolean => {
  for (const eh of path.path) {
    if (entityId === eh.id) {
      return true
    }
  }
  return false
}

export enum FinderScope {
  CURRENT_PROJECT = 'Current Project',
  ALL_PROJECTS = 'All Projects',
  CREATED_BY_ME = 'Projects Created By Me',
  FAVORITES = 'My Favorites',
}

function getScopeOptionDefaultContainer(
  scope: FinderScope,
): EntityTreeContainer {
  switch (scope) {
    case FinderScope.FAVORITES:
      return 'root'
    case FinderScope.CURRENT_PROJECT:
    case FinderScope.ALL_PROJECTS:
    case FinderScope.CREATED_BY_ME:
      return null
  }
}

function getScopeOptionNodeName(scope: FinderScope): string {
  switch (scope) {
    case FinderScope.CURRENT_PROJECT:
    case FinderScope.ALL_PROJECTS:
    case FinderScope.CREATED_BY_ME:
      return 'Projects'
    case FinderScope.FAVORITES:
      return 'Favorites'
  }
}

/**
 * Indicates which container is selected when the tree is used to control another component. If 'root', then the top-level entities
 * should be shown in the other component. If a synID, then that entity's children should be shown in the other component. If null,
 * then a selection has not been made.
 */
export type EntityTreeContainer = string | 'root' | null

// if the first item is selected (matching the dropdown), then output a configuration. otherwise, output a synId
export type EntityTreeProps = {
  initialScope?: FinderScope
  /** To show the current project, projectId must be defined */
  projectId?: string
  initialContainer: EntityTreeContainer
  currentContainer: EntityTreeContainer
  setCurrentContainer: Dispatch<SetStateAction<EntityTreeContainer>>
  showDropdown: boolean
  selectedEntities: EntitySelectionMapType
  visibleTypes?: EntityType[]
  toggleSelection?: (entity: Reference) => void
  setDetailsViewConfiguration?: (
    configuration: EntityDetailsListDataConfiguration,
  ) => void
  setBreadcrumbItems?: (items: BreadcrumbItem[]) => void
  /** Determines whether to show the root node corresponding to the selected scope */
  showScopeAsRootNode?: boolean
  treeNodeType: EntityTreeNodeType
  /** The entity types that may be selected. */
  selectableTypes: EntityType[]
  hideScopeSelector?: boolean
}

/**
 * The TreeView displays a user's entities hierarchically, allowing a user to quickly dive into an entity tree.
 *
 * The tree view currently can only be used to drive a DetailsView using the `setDetailsViewConfiguration` property.
 */
export function EntityTree(props: EntityTreeProps) {
  const {
    initialScope = FinderScope.CURRENT_PROJECT,
    projectId,
    initialContainer = null,
    currentContainer,
    setCurrentContainer,
    visibleTypes = [EntityType.PROJECT, EntityType.FOLDER],
    toggleSelection,
    selectedEntities,
    setDetailsViewConfiguration,
    setBreadcrumbItems,
    showScopeAsRootNode = true,
    treeNodeType,
    selectableTypes,
    hideScopeSelector = false,
  } = props

  const DEFAULT_CONFIGURATION: EntityDetailsListDataConfiguration = {
    type: EntityDetailsListDataConfigurationType.PROMPT,
  }

  const [scope, setScope] = useState(initialScope)

  useEffect(() => {
    if (setDetailsViewConfiguration) {
      setDetailsViewConfiguration(DEFAULT_CONFIGURATION)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setSelectedId = useCallback(
    (entityId: string) => {
      if (toggleSelection) {
        toggleSelection({ targetId: entityId })
      }
      setCurrentContainer(entityId)
    },
    [setCurrentContainer, toggleSelection],
  )

  // For these scopes, use the `useGetProjectsInfinite` hook
  const useProjectData =
    scope === FinderScope.ALL_PROJECTS || scope === FinderScope.CREATED_BY_ME

  const {
    data: projectData,
    fetchNextPage: fetchNextPageProjects,
    hasNextPage: hasNextPageProjects,
    isLoading: isLoadingProjects,
  } = useGetProjectsInfinite(
    scope === FinderScope.CREATED_BY_ME
      ? { filter: 'CREATED', sort: 'PROJECT_NAME', sortDirection: 'ASC' }
      : { sort: 'PROJECT_NAME', sortDirection: 'ASC' },
    {
      enabled: useProjectData,
      // Don't refetch the projects. Updating the entity headers will drop all the children that VirtualizedTree has fetched
      refetchInterval: Infinity,
    },
  )

  const { data: currentContainerBundle, isSuccess: isSuccessBundle } =
    useGetEntityBundle(currentContainer!, undefined, ALL_ENTITY_BUNDLE_FIELDS, {
      enabled: !!currentContainer && currentContainer !== 'root',
      throwOnError: true,
    })

  const { data: favorites, isLoading: isLoadingFavorites } = useGetFavorites(
    'NAME',
    'ASC',
    {
      select: data =>
        data.filter(eh => visibleTypes.includes(convertToEntityType(eh.type))),
      // Don't refetch the projects. Updating the entity headers will drop all the children that VirtualizedTree has fetched
      refetchInterval: Infinity,
      throwOnError: true,
    },
  )

  const { data: initialContainerPath } = useGetEntityPath(initialContainer!, {
    enabled: !!(
      projectId &&
      initialContainer &&
      initialContainer.match(SYNAPSE_ENTITY_ID_REGEX)
    ),
    refetchInterval: Infinity,
    throwOnError: true,
  })

  const { data: projectHeader, isLoading: isLoadingProjectHeader } =
    useGetEntityHeader(projectId, undefined, {
      enabled: !!(projectId ?? initialContainerPath?.path[1]?.id),
      refetchInterval: Infinity,
    })

  useEffect(() => {
    if (
      FinderScope.CURRENT_PROJECT === scope &&
      projectId &&
      !isLoadingProjectHeader &&
      !projectHeader
    ) {
      // The header wasn't returned, so the user doesn't have access to the current project
      // Let's change the scope to something else
      displayToast(
        `You don't have access to the current project (${projectId}).`,
        'warning',
      )
      setScope(FinderScope.CREATED_BY_ME)
    }
  }, [isLoadingProjectHeader, projectHeader, projectId, scope])

  // Populates the first level of entities in the tree view
  const {
    topLevelEntities,
    isLoading,
  }: {
    topLevelEntities: Pick<EntityFinderHeader, 'name' | 'id' | 'type'>[]
    isLoading: boolean
  } = useMemo(() => {
    let topLevelEntities: Pick<EntityFinderHeader, 'name' | 'id' | 'type'>[] =
      []
    let isLoading: boolean = false
    switch (scope) {
      case FinderScope.ALL_PROJECTS:
      case FinderScope.CREATED_BY_ME:
        if (projectData) {
          topLevelEntities = projectData.pages
            .flatMap(page => page.results)
            .map(toEntityHeader)
        }
        isLoading = isLoadingProjects
        break
      case FinderScope.FAVORITES: {
        topLevelEntities = favorites ?? []
        isLoading = isLoadingFavorites
        break
      }
      case FinderScope.CURRENT_PROJECT:
        if (projectHeader) {
          // use projectHeader as topLevelEntities
          topLevelEntities = [projectHeader]
          isLoading = isLoadingProjectHeader
        }
        break
      default:
        throw new Error('No scope selected')
    }
    return { topLevelEntities, isLoading }
  }, [
    favorites,
    isLoadingFavorites,
    isLoadingProjectHeader,
    isLoadingProjects,
    projectData,
    projectHeader,
    scope,
  ])

  // Creates the configuration for the details view and invokes the callback
  useEffect(() => {
    if (setDetailsViewConfiguration || setBreadcrumbItems) {
      let detailsViewConfig: EntityDetailsListDataConfiguration
      let breadcrumbItems: BreadcrumbItem[] = []
      if (currentContainer === null) {
        detailsViewConfig = {
          type: EntityDetailsListDataConfigurationType.PROMPT,
        }
        breadcrumbItems = []
      } else if (currentContainer === 'root') {
        switch (scope) {
          case FinderScope.ALL_PROJECTS:
            detailsViewConfig = {
              type: EntityDetailsListDataConfigurationType.USER_PROJECTS,
            }
            break
          case FinderScope.CREATED_BY_ME:
            detailsViewConfig = {
              type: EntityDetailsListDataConfigurationType.USER_PROJECTS,
              getProjectParams: {
                filter: 'CREATED',
              },
            }
            break
          case FinderScope.CURRENT_PROJECT:
            detailsViewConfig = {
              type: EntityDetailsListDataConfigurationType.HEADER_LIST,
              headerList: topLevelEntities,
            }
            break
          case FinderScope.FAVORITES:
            detailsViewConfig = {
              type: EntityDetailsListDataConfigurationType.USER_FAVORITES,
            }
            break
        }
        breadcrumbItems = [
          {
            name: scope,
            isCurrent: true,
            action: () => {
              setCurrentContainer('root')
            },
          },
        ]
      } else {
        detailsViewConfig = {
          type: EntityDetailsListDataConfigurationType.PARENT_CONTAINER,
          parentContainerId: currentContainer,
        }
        if (currentContainerBundle) {
          breadcrumbItems = [
            {
              name: scope,
              isCurrent: false,
              action: () => {
                setCurrentContainer('root')
              },
            },
            ...currentContainerBundle.path.path
              .slice(1) // Remove the root entity, syn4489
              .map(entity => {
                return {
                  name: entity.name ?? entity.id,
                  isCurrent: entity.id === currentContainer,
                  action: () => {
                    setCurrentContainer(entity.id)
                  },
                }
              }),
          ]
        }
      }
      if (setDetailsViewConfiguration) {
        setDetailsViewConfiguration(detailsViewConfig)
      }
      if (setBreadcrumbItems) {
        setBreadcrumbItems(breadcrumbItems)
      }
    }
  }, [
    scope,
    currentContainer,
    topLevelEntities,
    setDetailsViewConfiguration,
    setBreadcrumbItems,
    currentContainerBundle,
    isSuccessBundle,
    setCurrentContainer,
  ])

  const rootNodeConfiguration: RootNodeConfiguration = useMemo(
    () => ({
      show: showScopeAsRootNode,
      nodeText: getScopeOptionNodeName(scope),
      children: topLevelEntities,
      fetchNextPage: async () => {
        await fetchNextPageProjects()
      },
      hasNextPage: useProjectData && hasNextPageProjects && !isLoadingProjects,
    }),
    [
      showScopeAsRootNode,
      scope,
      topLevelEntities,
      useProjectData,
      hasNextPageProjects,
      isLoadingProjects,
      fetchNextPageProjects,
    ],
  )

  const shouldAutoExpand = useCallback(
    (entityId: string) => {
      if (entityId === 'root') {
        return true
      } else {
        return !!(
          scope === FinderScope.CURRENT_PROJECT &&
          initialContainerPath &&
          isEntityIdInPath(entityId, initialContainerPath)
        )
      }
    },
    [scope, initialContainerPath],
  )

  const filteredOptions = Object.values(FinderScope).filter(
    scopeOption =>
      !(scopeOption === FinderScope.CURRENT_PROJECT && projectId == null),
  )

  const selectedIndex = filteredOptions.indexOf(scope)

  return (
    <div
      className={`TreeView ${
        treeNodeType === EntityTreeNodeType.SINGLE_PANE
          ? 'SelectTree'
          : 'BrowseTree'
      }`}
    >
      {!hideScopeSelector && (
        <div className="Header" onClick={e => e.stopPropagation()}>
          <DropdownSelect
            variant={'outlined'}
            options={filteredOptions}
            selectedIndex={selectedIndex}
            setSelectedIndex={index => {
              const selectedScope = filteredOptions[index]
              if (scope !== selectedScope) {
                setScope(selectedScope)
                setCurrentContainer(
                  getScopeOptionDefaultContainer(selectedScope),
                )
              }
            }}
            size="small"
            fullWidth
          />
        </div>
      )}
      {isLoading ? (
        <div className="Placeholder">
          <SynapseSpinner size={30} />
        </div>
      ) : (
        <div className="Tree" role="tree">
          <VirtualizedTree
            selected={selectedEntities}
            visibleTypes={visibleTypes}
            autoExpand={shouldAutoExpand}
            rootNodeConfiguration={rootNodeConfiguration}
            treeNodeType={treeNodeType}
            selectableTypes={selectableTypes}
            currentContainer={currentContainer}
            setSelectedId={setSelectedId}
          />
        </div>
      )}
    </div>
  )
}
