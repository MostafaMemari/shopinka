'use client';

import { HiOutlineChevronLeft } from 'react-icons/hi';
import Link from 'next/link';
import { ScrollArea, Button, HoverCard, HoverCardTrigger, HoverCardContent, Card } from '@/components/ui';
import { cn } from '@/lib/utils';
import DesktopBasketItem from './DesktopBasketItem';
import { formatPrice } from '@/utils/formatter';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import CartIconTotalQuantity from '../CartIconTotalQuantity';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { useRouter } from 'next/navigation';
import { ShoppingCart } from 'lucide-react';

export default function BasketDropdown() {
  const { isLogin } = useAuth();
  const { cart } = useCart(isLogin);
  const router = useRouter();

  const { items: cartItems, payablePrice } = cart || { items: [], payablePrice: 0 };

  const handleBasketClick = () => {
    router.push('/checkout/cart');
  };

  return (
    <HoverCard openDelay={30} closeDelay={120}>
      <HoverCardTrigger>
        <CartIconTotalQuantity isLogin={isLogin} />
      </HoverCardTrigger>

      <HoverCardContent className={cn('w-[400px] border-t-2 border-t-primary')}>
        {cartItems.length > 0 ? (
          <>
            <div className="flex items-center justify-between pb-2">
              <span className="text-sm text-text/90">{cartItems?.length || 0} مورد</span>
              <Link className="flex items-center gap-x-1 text-sm text-primary" href="/checkout/cart">
                <span>مشاهده سبد خرید</span>
                <HiOutlineChevronLeft className="h-5 w-5" />
              </Link>
            </div>

            <ScrollArea dir="ltr" className="h-60">
              <ul className="space-y-2 divide-y p-3 pl-1">
                {cartItems.map((item) => (
                  <li key={item.id}>
                    <DesktopBasketItem item={item} />
                  </li>
                ))}
              </ul>
            </ScrollArea>

            <div className="flex items-center justify-between border-t pt-3">
              <div className="flex flex-col items-center gap-y-1">
                <span className="text-sm text-text/60">مبلغ قابل پرداخت</span>
                <div className="text-text/90">
                  <span className="font-bold">{formatPrice(payablePrice)}</span>
                  <span className="text-sm"> تومان</span>
                </div>
              </div>
              <Button className="w-32 text-sm" onClick={handleBasketClick}>
                ثبت سفارش
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4 p-8">
            <ShoppingCart />

            <div className="flex h-full items-center justify-center text-sm text-text/60">سبد خرید خالی است</div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
