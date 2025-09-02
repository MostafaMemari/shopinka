'use client';

import { Skeleton } from '@/components/ui';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import { useIsMounted } from '@/hooks/useIsMounted';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';

interface CartIconTotalQuantityProps {
  isLogin: boolean;
  className?: string;
}

function CartIconTotalQuantity({ isLogin, className }: CartIconTotalQuantityProps) {
  const { cart } = useCart(isLogin);
  const isMounted = useIsMounted();

  const totalQuantity = cart?.items?.reduce((sum, item) => sum + item.count, 0) || 0;

  return (
    <div className={cn('relative p-1 cursor-pointer', className)}>
      <ShoppingCart size={22} className="text-gray-700 dark:text-gray-200 transition-colors duration-200" />

      {!isMounted ? (
        <>
          <Skeleton className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-md" />
        </>
      ) : (
        totalQuantity > 0 && (
          <span
            className={cn(
              'absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-md text-sm font-bold border',
              'bg-primary text-white border-white',
              'dark:bg-primary-dark dark:text-white dark:border-gray-800',
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
