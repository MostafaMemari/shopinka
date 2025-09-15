import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { CommentParams, CommentResponse } from '@/types/commentType';
import { getComments } from '@/features/comments/services/commentService';
import { ApiResponse } from '@/service/api';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: CommentParams;
  keepPreviousData?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useComment({
  enabled = true,
  params = {},
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  refetchOnWindowFocus = false,
}: QueryOptions) {
  const query = useQuery<ApiResponse<CommentResponse>>({
    queryKey: [QueryKeys.Comments, params],
    queryFn: () => getComments(params),
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
  });

  let data: CommentResponse | undefined;
  let error: string | null = null;

  if (query.data) {
    if (query.data.success) {
      data = query.data.data;
    } else {
      error = query.data.message || 'خطای نامشخص';
    }
  }

  return {
    data,
    error,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
