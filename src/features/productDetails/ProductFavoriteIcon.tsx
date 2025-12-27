'use client';

import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from '@/components/ui/tooltip';
import { useAppSelector } from '@/store/hooks';
import { useToggleFavorite } from '@/features/favorite/hooks/useToggleFavorite';
import { useProductFavorite } from '@/features/products/hooks/useProduct';
import { useIsMounted } from '@/hooks/useIsMounted';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import { cn } from '@/utils/utils';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { useDispatch } from 'react-redux';

interface ProductFavoriteIconProps {
  productId: number;
  isTooltip?: boolean;
  className?: string;
}

function ProductFavoriteIcon({ productId, isTooltip = false, className }: ProductFavoriteIconProps) {
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
    return <Skeleton className={cn('h-5 w-5 rounded-full', className)} />;

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

export default ProductFavoriteIcon;
