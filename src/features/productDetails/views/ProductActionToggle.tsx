'use client';

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Heart, Share } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavoriteAction } from '../hooks/useFavoriteAction';
import { useShareAction } from '../hooks/useShareAction';

interface Props {
  productId: number;
  isTooltip?: boolean;
}

export default function ProductActionToggle({ productId, isTooltip }: Props) {
  const { isFavoriteProduct, isFavoriteLoading, handleAddToFavorite } = useFavoriteAction(productId);
  const { handleShare } = useShareAction();

  const handleChange = (value: 'favorite' | 'share') => {
    if (value === 'favorite') handleAddToFavorite();
    else if (value === 'share') handleShare();
  };

  return (
    <ToggleGroup
      type="single"
      className="flex items-center rounded-xl gap-0.5"
      onValueChange={handleChange}
      defaultValue={undefined}
      aria-label="Product Actions"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem
              value="favorite"
              className={cn('rounded-full p-3 cursor-pointer bg-gray-50', isFavoriteLoading ? 'opacity-60 cursor-not-allowed' : '')}
              aria-label="Favorite"
            >
              <Heart className="w-4 h-4" stroke={isFavoriteProduct ? 'red' : 'currentColor'} fill={isFavoriteProduct ? 'red' : 'none'} />
            </ToggleGroupItem>
          </TooltipTrigger>
          {isTooltip && <TooltipContent>افزودن به علاقه‌مندی‌ها</TooltipContent>}
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <ToggleGroupItem value="share" className="rounded-full p-3 cursor-pointer bg-gray-50" aria-label="Share">
              <Share className="h-4 w-4" />
            </ToggleGroupItem>
          </TooltipTrigger>
          {isTooltip && <TooltipContent>اشتراک‌گذاری</TooltipContent>}
        </Tooltip>
      </TooltipProvider>
    </ToggleGroup>
  );
}
