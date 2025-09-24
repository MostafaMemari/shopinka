'use client';

import { Plus, Minus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CartItemState } from '@/features/cart/cartType';
import { useCart } from '../hooks/useCart';
import { cn } from '@/lib/utils';

interface CartControlsProps {
  product: CartItemState;
  className?: string;
}

export function CartControls({ product, className }: CartControlsProps) {
  const { increaseCount, decreaseCount, deleteFromCart, isUpdatingQuantity, isRemovingItem } = useCart();

  const isLoading = isUpdatingQuantity || isRemovingItem;

  return (
    <div
      className={cn(
        'flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white px-2 py-1 shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800',
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => increaseCount(product)}
        className="h-8 w-8 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
        aria-label="افزایش تعداد"
        disabled={isLoading}
      >
        <Plus className="h-5 w-5" />
      </Button>

      <div className="flex h-9 w-8 items-center justify-center">
        {isLoading ? (
          <div className="animate-pulse rounded-full bg-primary/20 h-5 w-5" aria-label="در حال بارگذاری" />
        ) : (
          <span className="w-full text-center font-bold text-gray-900 dark:text-gray-100">{product.count}</span>
        )}
      </div>

      {product.count > 1 ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => decreaseCount(product)}
          className="h-8 w-8 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="کاهش تعداد"
          disabled={isLoading}
        >
          <Minus className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteFromCart(product)}
          className="h-8 w-8 text-primary hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
          aria-label="حذف از سبد خرید"
          disabled={isLoading}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

export default CartControls;
