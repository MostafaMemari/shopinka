import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { paymentRetry } from '@/features/payment/paymentService';
import { useRouter } from 'next/navigation';

export function useRetryPayment() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({ mutationFn: paymentRetry });

  return {
    retryPayment: (orderId: number, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(
        { orderId },
        {
          onSuccess: (res) => {
            router.push(res.gatewayURL);
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders, QueryKeys.Cart] });
            onSuccess?.();
          },
          onError: (error) => {
            onError?.(error);
          },
        },
      );
    },

    isCreatePaymentLoading: createMutation.isPending,
  };
}
