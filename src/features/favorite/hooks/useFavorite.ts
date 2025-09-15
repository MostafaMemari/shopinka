import { FavoriteResponse } from '@/features/favorite/FavoriteType';
import { QueryKeys } from '@/types/query-keys';
import { useQuery } from '@tanstack/react-query';
import { getFavorites } from '../favoriteService';
import { ApiResponse } from '@/service/api';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: { page?: number; take?: number };
  keepPreviousData?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useFavorite({
  enabled = true,
  params = {},
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  refetchOnWindowFocus = false,
}: QueryOptions) {
  const { data, isLoading, error, refetch, isFetching } = useQuery<ApiResponse<FavoriteResponse>>({
    queryKey: [QueryKeys.Favorites, params],
    queryFn: () => getFavorites(params),
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
  });

  return {
    data,
    isLoading,
    error,
    isFetching,
    refetch,
  };
}
