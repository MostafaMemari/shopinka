import { useMutation } from '@tanstack/react-query';
import { customStickerPricing, CustomStickerPricingData } from '../services/customStickerService';

export function usePricingCustomSticker() {
  const createMutation = useMutation({ mutationFn: customStickerPricing });

  return {
    getPrice: (data: CustomStickerPricingData, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isGetPriceLoading: createMutation.isPending,
  };
}
