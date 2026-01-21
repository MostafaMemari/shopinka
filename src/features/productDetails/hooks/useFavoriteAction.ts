'use client';
import { useAppSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import { useProductFavorite } from '@/features/products/hooks/useProduct';
import { useToggleFavorite } from '@/features/favorite/hooks/useToggleFavorite';

export const useFavoriteAction = (productId: number) => {
  const { isLogin } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, refetch } = useProductFavorite({ productId, isLogin });
  const isFavoriteProduct = data?.data;

  const { favoriteToggle, isToggleFavoriteLoading } = useToggleFavorite();

  const handleAddToFavorite = () => {
    if (!isLogin) {
      dispatch(openAuthDialog());
      return;
    }
    if (isToggleFavoriteLoading) return;
    favoriteToggle(productId, refetch);
  };

  return {
    isFavoriteProduct,
    isFavoriteLoading: isToggleFavoriteLoading,
    handleAddToFavorite,
  };
};
