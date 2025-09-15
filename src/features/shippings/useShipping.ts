import { QueryOptions } from '@/types/queryOptions';
import { useQuery } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { pager } from '@/types/paginationType';
import { getShipping } from '@/features/shippings/shippingService';
import { ShippingItem } from '@/features/shippings/ShippingType';
import { ApiResponse } from '@/service/api';

export function useShipping({ enabled = true, staleTime = 1 * 60 * 1000 }: QueryOptions) {
  return useQuery<ApiResponse<{ items: ShippingItem[]; pager: pager }>>({
    queryKey: [QueryKeys.Shipping],
    queryFn: getShipping,
    enabled: enabled,
    staleTime,
  });
}
