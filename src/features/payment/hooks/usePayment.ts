import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { paymentCart } from '@/features/payment/api';
import { PaymentFormType } from '@/features/payment/types';
import { useRouter } from 'next/navigation';

export function usePayment() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({ mutationFn: paymentCart });

  return {
    createPayment: (data: PaymentFormType, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: (res) => {
          router.push(res.gatewayURL);
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders, QueryKeys.Cart] });
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isCreatePaymentLoading: createMutation.isPending,
  };
}
