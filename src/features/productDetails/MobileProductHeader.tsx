'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FavoriteProductAction from './ActionButtons/FavoriteProductAction';
import CartIconTotalQuantity from '../cart/components/CartIconTotalQuantity';
import { useIsMounted } from '@/hooks/useIsMounted';
import ShareProductAction from './ActionButtons/ShareProductAction';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronRight, Home } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MobileHeaderProps {
  productId: number;
}

const MobileHeader = ({ productId }: MobileHeaderProps) => {
  const router = useRouter();
  const isMounted = useIsMounted();

  const handleBack = () => {
    router.back();
  };

  const handleHome = () => {
    router.push('/');
  };

  const handleCart = () => {
    router.push('/checkout/cart');
  };

  return (
    <div className="fixed top-0 right-0 z-50 md:hidden w-full">
      <div className="flex items-center justify-between py-2 px-4">
        {!isMounted ? (
          <>
            <div className="flex items-center gap-2">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
            <Skeleton className="h-12 w-32 rounded-lg" />
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <Card className="cursor-pointer p-3" onClick={handleBack}>
                <ChevronRight size={22} className="transform" />
              </Card>
              <Card className="cursor-pointer p-3" onClick={handleHome}>
                <Home size={22} className="transform" />
              </Card>
            </div>

            <Card className="flex flex-row items-center p-3 gap-3">
              <ShareProductAction />

              <FavoriteProductAction productId={productId} />

              <button onClick={handleCart}>
                <CartIconTotalQuantity />
              </button>
            </Card>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
