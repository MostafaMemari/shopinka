'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import type { AppDispatch } from '@/store';
import { checkAuth } from '@/store/slices/authSlice';
import { clearAddToCart } from '@/store/slices/pendingActionSlice';
import { useCart } from '@/features/cart/hooks/useCart';
import { useRouter } from 'next/navigation';
import { showAddToCartToast } from '@/utils/toastUtils';

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const addToCartItem = useAppSelector((state) => state.pendingAction.addToCartItem);
  const router = useRouter();

  const { addToCart } = useCart();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin && addToCartItem) {
      addToCart(addToCartItem, {
        onSuccess: () => {
          showAddToCartToast(router);
          dispatch(clearAddToCart());
        },
      });
    }
  }, [isLogin, addToCartItem]);

  return null;
};

export default AuthInitializer;
