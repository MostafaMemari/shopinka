'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createCart, getCart, updateQuantityItemCart, removeItemCart, clearCart } from '@/service/cartService';
import { CartData, CartItemState, CartState } from '@/types/cartType';
import { QueryOptions } from '@/types/queryOptions';
import { QueryKeys } from '@/types/query-keys';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/store/slices/authDialogSlice';

const useCartData = ({ enabled = true, staleTime = 60_000 }: QueryOptions) => {
  const query = useQuery<CartState>({
    queryKey: [QueryKeys.Cart],
    queryFn: getCart,
    enabled,
    staleTime,
  });

  return query;
};

export const useCart = (isLogin: boolean) => {
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

  const handleAddToCart = (item: CartItemState) => {
    if (isLogin) {
      addToCartMutation.mutate({
        quantity: item.count,
        productId: item.type === 'SIMPLE' ? item.id : null,
        productVariantId: item.type === 'VARIABLE' ? item.id : null,
      });
    } else {
      dispatch(openDialog());
    }
  };

  const handleIncrease = (item: CartItemState) => {
    if (isLogin) updateQuantityMutation.mutate({ itemId: Number(item.itemId), quantity: item.count + 1 });
    else dispatch(openDialog());
  };

  const handleDecrease = (item: CartItemState) => {
    if (isLogin) updateQuantityMutation.mutate({ itemId: Number(item.itemId), quantity: item.count - 1 });
    else dispatch(openDialog());
  };

  const handleDelete = (item: CartItemState) => {
    if (isLogin) removeItemMutation.mutate({ itemId: Number(item.itemId) });
    else dispatch(openDialog());
  };

  const handleClearAll = () => {
    if (isLogin) {
      clearCartMutation.mutate();
    } else {
      dispatch(openDialog());
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
    isAddingToCart: addToCartMutation.isPending,
    isUpdatingQuantity: updateQuantityMutation.isPending,
    isRemovingItem: removeItemMutation.isPending,
  };
};
