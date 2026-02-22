import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { QueryKeys } from '@/types/query-keys';
import { cancelOrderById } from '../orders/orderService';
import { ApiResponse } from '@/service/api';
import { useRouter } from 'next/navigation';

export function useCancelOrder() {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders] });
  const router = useRouter();

  const cancelMutation = useMutation({
    mutationFn: cancelOrderById,
  });

  return {
    cancelOrder: (
      orderId: number,
      reason: string,
      onSuccess?: (updatedOrder: ApiResponse<{ message: string }>) => void,
      onError?: (error: any) => void,
    ) => {
      cancelMutation.mutate(
        { orderId, reason },
        {
          onSuccess: (response) => {
            if (response.success) {
              invalidate();
              toast.success('سفارش با موفقیت لغو شد');
              router.push('/profile/orders?activeTab=canceled');
              onSuccess?.(response);
            } else {
              toast.error(response.message);
              onError?.(response);
            }
          },
        },
      );
    },

    isCancelLoading: cancelMutation.isPending,
  };
}
