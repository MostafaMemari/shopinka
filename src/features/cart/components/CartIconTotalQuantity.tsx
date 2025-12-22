'use client';

import { useIsMounted } from '@/hooks/useIsMounted';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

import { Skeleton } from '@/components/ui/skeleton';

interface CartIconTotalQuantityProps {
  className?: string;
  badgePosition?: 'right' | 'left';
}

function CartIconTotalQuantity({ className, badgePosition = 'right' }: CartIconTotalQuantityProps) {
  const { cart } = useCart();
  const isMounted = useIsMounted();

  const totalQuantity = cart?.items?.reduce((sum, item) => sum + item.count, 0) || 0;

  const badgePositionClass = badgePosition === 'right' ? '-top-2 -right-2' : '-top-2 -left-2';

  return (
    <div className={cn('relative p-1 cursor-pointer', className)}>
      <ShoppingCart size={22} className="text-gray-700 dark:text-gray-200 transition-colors duration-200" />

      {!isMounted ? (
        <Skeleton className={cn('absolute flex h-5 w-5 items-center justify-center rounded-md', badgePositionClass)} />
      ) : (
        totalQuantity > 0 && (
          <span
            className={cn(
              'absolute flex h-5 w-5 items-center justify-center rounded-md text-sm font-bold border',
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
