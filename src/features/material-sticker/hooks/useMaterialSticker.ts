import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { FontParams } from '@/types/fontType';
import { ApiResponse } from '@/service/api';
import { getMaterialSticker } from '../services/materialStickerService';
import { MaterialStickerResponse } from '@/types/materialStickerType';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: FontParams;
  keepPreviousData?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useMaterialSticker({
  enabled = true,
  params = {},
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  refetchOnWindowFocus = false,
}: QueryOptions) {
  const query = useQuery<ApiResponse<MaterialStickerResponse>>({
    queryKey: [QueryKeys.MaterialStickers, params],
    queryFn: () => getMaterialSticker(params),
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
  });

  let data: MaterialStickerResponse | undefined;
  let error: string | null = null;

  if (query.data) {
    if (query.data.success) data = query.data.data;
    else error = query.data.message || 'خطای نامشخص';
  }

  return {
    data,
    error,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
}
