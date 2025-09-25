'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/hooks';
import type { AppDispatch } from '@/store';
import { checkAuth } from '@/store/slices/authSlice';
import { clearAddToCart } from '@/store/slices/pendingActionSlice';
import { useCart } from '@/features/cart/hooks/useCart';

const AuthInitializer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const addToCartItem = useAppSelector((state) => state.pendingAction.addToCartItem);

  const { addToCartMutation } = useCart();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isLogin && addToCartItem) {
      addToCartMutation(addToCartItem);
      dispatch(clearAddToCart());
    }
  }, [isLogin, addToCartItem, addToCartMutation, dispatch]);

  return null;
};

export default AuthInitializer;
