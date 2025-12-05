import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { FontParams, FontResponse } from '@/types/fontType';
import { ApiResponse } from '@/service/api';
import { getFonts } from '../services/fontService';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: FontParams;
  keepPreviousData?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useFont({
  enabled = true,
  params = {},
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  refetchOnWindowFocus = false,
}: QueryOptions) {
  const query = useQuery<ApiResponse<FontResponse>>({
    queryKey: [QueryKeys.Fonts, params],
    queryFn: () => getFonts(params),
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
  });

  let data: FontResponse | undefined;
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
