import SynapseClient from '@/synapse-client'
import { useSynapseContext } from '@/utils/context/SynapseContext'
import { SynapseClientError } from '@sage-bionetworks/synapse-client/util/SynapseClientError'
import {
  AccessTokenGenerationRequest,
  AccessTokenGenerationResponse,
  AccessTokenRecordList,
} from '@sage-bionetworks/synapse-types'
import {
  InfiniteData,
  QueryFunctionContext,
  QueryKey,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query'

export function useGetPersonalAccessTokensInfinite<
  TData = InfiniteData<AccessTokenRecordList>,
>(
  options?: Partial<
    UseInfiniteQueryOptions<
      AccessTokenRecordList,
      SynapseClientError,
      TData,
      QueryKey,
      AccessTokenRecordList['nextPageToken']
    >
  >,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  return useInfiniteQuery<
    AccessTokenRecordList,
    SynapseClientError,
    TData,
    QueryKey,
    AccessTokenRecordList['nextPageToken']
  >({
    ...options,
    initialPageParam: undefined,
    queryKey: keyFactory.getPersonalAccessTokensQueryKey(),
    queryFn: async (
      context: QueryFunctionContext<QueryKey, string | undefined>,
    ) => {
      return await SynapseClient.getPersonalAccessTokenRecords(
        accessToken,
        context.pageParam,
      )
    },
    getNextPageParam: page => page.nextPageToken,
  })
}

export function useCreatePersonalAccessToken(
  options?: Partial<
    UseMutationOptions<
      AccessTokenGenerationResponse,
      SynapseClientError,
      AccessTokenGenerationRequest
    >
  >,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  const queryClient = useQueryClient()
  return useMutation<
    AccessTokenGenerationResponse,
    SynapseClientError,
    AccessTokenGenerationRequest
  >({
    ...options,
    onSuccess: async (...args) => {
      if (options?.onSuccess) {
        options.onSuccess(...args)
      }
      await queryClient.invalidateQueries({
        queryKey: keyFactory.getPersonalAccessTokensQueryKey(),
      })
    },
    mutationFn: request =>
      SynapseClient.createPersonalAccessToken(request, accessToken),
  })
}

export function useDeletePersonalAccessToken(
  options?: Partial<UseMutationOptions<void, SynapseClientError, string>>,
) {
  const { accessToken, keyFactory } = useSynapseContext()
  const queryClient = useQueryClient()
  return useMutation<void, SynapseClientError, string>({
    ...options,
    onSuccess: async (...args) => {
      if (options?.onSuccess) {
        options.onSuccess(...args)
      }
      await queryClient.invalidateQueries({
        queryKey: keyFactory.getPersonalAccessTokensQueryKey(),
      })
    },
    mutationFn: tokenId =>
      SynapseClient.deletePersonalAccessToken(tokenId, accessToken),
  })
}
