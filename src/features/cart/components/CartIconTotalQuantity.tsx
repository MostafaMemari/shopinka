'use client';

import { ShoppingCart } from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Skeleton } from '@/components/ui/skeleton';

import { useCart } from '../hooks/useCart';

interface CartIconTotalQuantityProps {
  className?: string;
  badgePosition?: 'right' | 'left';
}

function CartIconTotalQuantity({ className, badgePosition = 'left' }: CartIconTotalQuantityProps) {
  const { cart } = useCart();
  const isMounted = useIsMounted();

  const totalQuantity = cart?.items?.reduce((sum, item) => sum + item.count, 0) || 0;

  const badgePositionClass = badgePosition === 'right' ? '-top-1 -right-1' : '-top-1 -left-1';

  return (
    <div className={cn('relative p-1 cursor-pointer', className)}>
      <ShoppingCart size={22} className="text-gray-700 dark:text-gray-200 transition-colors duration-200" />

      {!isMounted ? (
        <Skeleton className={cn('absolute flex h-5 w-5 items-center justify-center rounded-md', badgePositionClass)} />
      ) : (
        totalQuantity > 0 && (
          <span
            className={cn(
              'absolute h-4 w-4 flex items-center justify-center rounded-md border text-[10px] font-bold leading-none',
              'bg-primary text-white border-white',
              'dark:bg-primary-dark dark:text-white dark:border-gray-800',
              badgePositionClass,
            )}
          >
            {totalQuantity}
          </span>
        )
      )}
    </div>
  );
}

export default CartIconTotalQuantity;
