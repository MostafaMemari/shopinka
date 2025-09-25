'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createCart, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/features/cart/cartsService';
import { AddCartType, CartData, CartItemState, CartState } from '@/features/cart/cartType';
import { QueryOptions } from '@/types/queryOptions';
import { QueryKeys } from '@/types/query-keys';
import { useDispatch } from 'react-redux';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import { useAppSelector } from '@/store/hooks';
import { setAddToCart } from '@/store/slices/pendingActionSlice';
import { ApiResponse } from '@/service/api';

export function useCartData({ enabled = true, staleTime = 60_000 }: QueryOptions) {
  const { data, isLoading, error, refetch, isFetching } = useQuery<ApiResponse<CartState>>({
    queryKey: [QueryKeys.Cart],
    queryFn: async () => {
      try {
        const response = await getCart();

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

export const useCart = () => {
  const isLogin = useAppSelector((state) => state.auth.isLogin);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { data, isLoading, error, refetch } = useCartData({ enabled: !!isLogin });

  const invalidateCart = () => {
    queryClient.invalidateQueries({ queryKey: [QueryKeys.Cart] });
  };

  const addToCartMutation = useMutation({
    mutationFn: (cartData: CartData) => createCart({ cartData }),
    onSuccess: invalidateCart,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ quantity, itemId }: { quantity: number; itemId: number }) => updateQuantityItemCart({ quantity, itemId }),
    onSuccess: invalidateCart,
  });

  const removeItemMutation = useMutation({
    mutationFn: ({ itemId }: { itemId: number }) => removeItemCart(itemId),
    onSuccess: invalidateCart,
  });

  const clearCartMutation = useMutation({
    mutationFn: clearCart,
    onSuccess: invalidateCart,
  });

  const handleAddToCart = (item: AddCartType) => {
    if (isLogin) {
      addToCartMutation.mutate({
        quantity: item.count,
        productId: item.type === 'SIMPLE' ? item.id : null,
        productVariantId: item.type === 'VARIABLE' ? item.id : null,
      });
    } else {
      dispatch(setAddToCart(item));
      dispatch(openAuthDialog());
    }
  };

  const handleIncrease = (item: CartItemState) => {
    if (isLogin) updateQuantityMutation.mutate({ itemId: Number(item.itemId), quantity: item.count + 1 });
    else dispatch(openAuthDialog());
  };

  const handleDecrease = (item: CartItemState) => {
    if (isLogin) updateQuantityMutation.mutate({ itemId: Number(item.itemId), quantity: item.count - 1 });
    else dispatch(openAuthDialog());
  };

  const handleDelete = (item: CartItemState) => {
    if (isLogin) removeItemMutation.mutate({ itemId: Number(item.itemId) });
    else dispatch(openAuthDialog());
  };

  const handleClearAll = () => {
    if (isLogin) {
      clearCartMutation.mutate();
    } else {
      dispatch(openAuthDialog());
    }
  };

  return {
    cart: data,
    isLoading,
    error,
    addToCart: handleAddToCart,
    increaseCount: handleIncrease,
    decreaseCount: handleDecrease,
    deleteFromCart: handleDelete,
    clearAllCartItems: handleClearAll,
    refetchCart: refetch,

    isClearOnCart: clearCartMutation.isPending,
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
};
