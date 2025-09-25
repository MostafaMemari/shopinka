'use client';

import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from '@/components/ui/tooltip';
import { useAppSelector } from '@/store/hooks';
import { useToggleFavorite } from '@/features/favorite/hooks/useToggleFavorite';
import { useProductFavorite } from '@/features/products/hooks/useProduct';
import { useIsMounted } from '@/hooks/useIsMounted';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import { cn } from '@/utils/utils';
import { Heart, Loader } from 'lucide-react';
import React from 'react';
import { useDispatch } from 'react-redux';

interface FavoriteProductActionProps {
  productId: number;
  isTooltip?: boolean;
  className?: string;
}

function FavoriteProductAction({ productId, isTooltip = false, className }: FavoriteProductActionProps) {
  const isMounted = useIsMounted();
  const { isLogin, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { data, refetch, isLoading: isFavoriteLoading } = useProductFavorite({ productId, isLogin });

  const isFavoriteProduct = data?.data;

  const { favoriteToggle, isToggleFavoriteLoading } = useToggleFavorite();

  const handleAddToFavorite = () => {
    if (isLogin) {
      if (isToggleFavoriteLoading) return;
      favoriteToggle(productId, refetch);
    } else {
      dispatch(openAuthDialog());
    }
  };

  if (!isMounted || isLoading || isFavoriteLoading || isToggleFavoriteLoading)
    return (
      <button type="button" className={cn('text-gray-700 dark:text-white', className)} disabled>
        <Loader className="h-6 w-6 animate-spin" />
      </button>
    );

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={handleAddToFavorite}
            disabled={isFavoriteLoading || isToggleFavoriteLoading}
            aria-label={isFavoriteProduct ? 'حذف از علاقه‌مندی‌ها' : 'افزودن به علاقه‌مندی‌ها'}
            className={cn(
              'text-gray-700 hover:text-red-500 dark:text-white transition-colors duration-200',
              {
                'text-red-500': isFavoriteProduct && isLogin,
                'opacity-60 cursor-not-allowed': isFavoriteLoading || isToggleFavoriteLoading,
              },
              className,
            )}
          >
            <Heart
              size={22}
              className={cn('', {
                'fill-red-500': isFavoriteProduct && isLogin,
              })}
            />
          </button>
        </TooltipTrigger>
        {isTooltip && <TooltipContent>افزودن به علاقه‌مندی‌ها</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

export default FavoriteProductAction;
