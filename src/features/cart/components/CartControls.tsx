'use client';

import { Plus, Minus, Trash2, Ellipsis } from 'lucide-react';
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
        'flex h-12 w-full items-center justify-between rounded-lg border border-gray-200 bg-white shadow-sm transition-all dark:border-gray-700 dark:bg-gray-800',
        className,
      )}
    >
      <Button
        variant="ghost"
        size="icon"
        onClick={() => increaseCount(product)}
        disabled={isLoading}
        aria-label="افزایش تعداد"
        className="h-8 w-8 shrink-0 text-primary dark:hover:bg-gray-700"
      >
        <Plus className="h-5 w-5" />
      </Button>

      <div className="flex h-9 w-6 shrink-0 items-center justify-center overflow-hidden">
        {isLoading ? (
          <Ellipsis className="h-6 w-6 animate-side-to-side text-primary/50" />
        ) : (
          <span className="w-full text-center font-bold text-gray-900 dark:text-gray-100">{product.count}</span>
        )}
      </div>

      {product.count > 1 ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => decreaseCount(product)}
          disabled={isLoading}
          aria-label="کاهش تعداد"
          className="h-8 w-8 shrink-0 text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Minus className="h-5 w-5" />
        </Button>
      ) : (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => deleteFromCart(product)}
          disabled={isLoading}
          aria-label="حذف از سبد خرید"
          className="h-8 w-8 shrink-0 text-primary hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}

export default CartControls;
