import { useQuery } from '@tanstack/react-query';
import { OrderParams, OrderResponse } from '@/features/orders/OrderType';
import { getOrders } from '@/features/orders/orderService';
import { ApiResponse } from '@/service/api';

export interface QueryOptions {
  enabled?: boolean;
  staleTime?: number;
  params?: OrderParams;
  keepPreviousData?: boolean;
  gcTime?: number;
  refetchOnWindowFocus?: boolean;
}

export function useOrder({
  enabled = true,
  params = {},
  staleTime = 5 * 60 * 1000,
  gcTime = 10 * 60 * 1000,
  refetchOnWindowFocus = false,
}: QueryOptions) {
  const { data, isLoading, error, refetch, isFetching } = useQuery<ApiResponse<OrderResponse>>({
    queryKey: ['orders', params],
    queryFn: async () => {
      try {
        const response = await getOrders({ params });
        return response;
      } catch (err: any) {
        return {
          success: false,
          status: err?.response?.status || 500,
          message: err?.response?._data?.message || err?.message || 'خطای نامعلوم',
        };
      }
    },
    enabled,
    staleTime,
    gcTime,
    refetchOnWindowFocus,
  });

  const formattedError = error
    ? {
        success: false,
        status: (error as any)?.response?.status || 500,
        message: (error as any)?.response?._data?.message || error.message || 'خطای نامعلوم',
      }
    : null;

  return {
    data: data?.success ? data.data : null,
    error: formattedError,
    isLoading,
    isFetching,
    refetch,
  };
}
