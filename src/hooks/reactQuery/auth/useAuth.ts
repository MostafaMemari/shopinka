import { useAppSelector } from '@/store/hooks';

export function useAuth() {
  const { isLogin, user, isLoading, error } = useAppSelector((state) => state.auth);

  return { isLogin, user, isLoading, error };
}
