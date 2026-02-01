'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/features/cart/hooks/useCart';
import { useIsMounted } from '@/hooks/useIsMounted';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

function CartIcon() {
  const router = useRouter();
  const { cart } = useCart();
  const isMounted = useIsMounted();

  const totalQuantity = cart?.items?.reduce((sum, item) => sum + item.count, 0) || 0;

  const handleCartIconClick = () => {
    router.push('/checkout/cart');
  };

  return (
    <div className="relative">
      <Button onClick={handleCartIconClick} asChild variant="ghost" size="sm" className="size-12 cursor-pointer">
        <ShoppingCart />
      </Button>

      {isMounted && totalQuantity > 0 && (
        <span className="absolute top-1 left-1 min-w-[18px] h-[18px] px-1 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold leading-none pointer-events-none">
          {totalQuantity}
        </span>
      )}
    </div>
  );
}

export default CartIcon;
