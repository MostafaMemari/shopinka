'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import DesktopBasketItem from './DesktopBasketItem';
import { formatPrice } from '@/utils/formatter';
import CartIconTotalQuantity from '../CartIconTotalQuantity';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '../../hooks/useCart';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import PrimaryButton from '@/components/common/PrimaryButton';

export default function BasketDropdown() {
  const { cart } = useCart();
  const router = useRouter();
  const [isLoadingContinueToCard, setIsLoadingContinueToCard] = useState(false);

  const { items: cartItems, payablePrice } = cart || { items: [], payablePrice: 0 };

  const handleBasketClick = () => {
    if (isLoadingContinueToCard) return;
    setIsLoadingContinueToCard(true);
    router.push('/checkout/cart');
  };

  return (
    <HoverCard openDelay={30} closeDelay={120}>
      <HoverCardTrigger>
        <CartIconTotalQuantity />
      </HoverCardTrigger>

      <HoverCardContent className={cn('w-[400px] border-t-2 border-t-primary')}>
        {cartItems.length > 0 ? (
          <>
            <div className="flex items-center justify-between pb-2">
              <span className="text-sm text-text/90">{cartItems?.length || 0} مورد</span>
              <Link className="flex items-center gap-x-1 text-sm text-primary" href="/checkout/cart">
                <span>مشاهده سبد خرید</span>
                <ChevronLeft className="h-5 w-5" />
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
                <span className="text-sm text-text/60">جمع سبد خرید</span>
                <div className="text-text/90">
                  <span className="font-bold">{formatPrice(payablePrice)}</span>
                  <span className="text-sm"> تومان</span>
                </div>
              </div>
              <PrimaryButton className="w-1/2 text-sm" onClick={handleBasketClick} isLoading={isLoadingContinueToCard}>
                ثبت سفارش
              </PrimaryButton>
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
