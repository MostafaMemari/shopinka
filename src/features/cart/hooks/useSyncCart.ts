import { useQueryClient } from '@tanstack/react-query';
import { getCart, createCartReplace } from '@/features/cart/api';
import { setCart } from '@/store/slices/cartSlice';
import { useAppDispatch } from '@/store/hooks';
import { QueryKeys } from '@/types/query-keys';
import { CartData } from '@/types/cartType';
import { clearLocalCart, getLocalCart } from '@/utils/cartStorage';

export const useSyncCart = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const pullServerCart = async () => {
    const cartData = await queryClient.fetchQuery({
      queryKey: [QueryKeys.Cart],
      queryFn: getCart,
      staleTime: 60 * 1000,
    });

    dispatch(setCart({ items: cartData.items }));
  };

  const sync = async () => {
    const localCart = getLocalCart();

    if (localCart.length === 0) {
      await pullServerCart();
      return;
    }

    const itemsPayload: CartData[] = localCart.map((item) => ({
      quantity: item.count,
      productId: item.type === 'SIMPLE' ? Number(item.id) : undefined,
      productVariantId: item.type === 'VARIABLE' ? Number(item.id) : undefined,
    }));

    try {
      await createCartReplace({ items: itemsPayload });
      clearLocalCart();
      await pullServerCart();
      queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
    } catch (err) {
      console.error('❌ Failed to sync cart:', err);
    }
  };

  return sync;
};
