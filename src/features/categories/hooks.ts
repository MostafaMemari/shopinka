import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/features/categories/api';
import { QueryKeys } from '@/types/query-keys';
import { CategoryParams } from '@/features/categories/types';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: CategoryParams;
  keepPreviousData?: boolean;
}

export function useCategories({ enabled = true, params = {}, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  return useQuery<any, Error>({
    queryKey: [QueryKeys.Categories, params],
    queryFn: () => getCategories(params),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
  });
}
