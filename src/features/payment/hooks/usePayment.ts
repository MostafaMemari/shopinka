import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { paymentCart } from '@/features/payment/paymentService';
import { PaymentFormType } from '@/features/payment/PaymentType';
import { useRouter } from 'next/navigation';

export function usePayment() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const createMutation = useMutation({ mutationFn: paymentCart });

  return {
    createPayment: (data: PaymentFormType, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: (res) => {
          if (res.success) {
            router.push(res.data.gatewayURL);
            queryClient.invalidateQueries({ queryKey: [QueryKeys.Orders, QueryKeys.Cart] });
            onSuccess?.();
          }
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isCreatePaymentLoading: createMutation.isPending,
  };
}
