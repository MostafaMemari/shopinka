import { useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import { useCheckAuth } from './useCheckAuth';

export function useAuth() {
  const { isLogin, user, isLoading, error } = useAppSelector((state) => state.auth);
  const checkAuth = useCheckAuth();

  useEffect(() => {
    if (!isLogin) checkAuth();
  }, [checkAuth, isLogin]);

  return {
    isLogin,
    user,
    isLoading,
    error,
    checkAuth,
  };
}
