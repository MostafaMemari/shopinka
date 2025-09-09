'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';
import { RiHome3Line } from 'react-icons/ri';
import FavoriteProductAction from './ActionButtons/FavoriteProductAction';
import CartIconTotalQuantity from '../cart/components/CartIconTotalQuantity';
import { useIsMounted } from '@/hooks/useIsMounted';
import ShareProductAction from './ActionButtons/ShareProductAction';
import { Skeleton } from '@/components/ui';

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
    <div className="fixed top-3 right-0 z-50 lg:hidden w-full">
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
              <button onClick={handleBack} className="bg-white p-3 rounded-lg shadow-md cursor-pointer" aria-label="Back">
                <IoIosArrowBack size={22} className="transform rotate-180" />
              </button>

              <button onClick={handleHome} className="bg-white p-3 rounded-lg shadow-md cursor-pointer" aria-label="Home">
                <RiHome3Line size={22} />
              </button>
            </div>

            <div className="flex bg-white items-center rounded-lg shadow-md cursor-pointer">
              <ShareProductAction className="p-3 cursor-pointer" />

              <FavoriteProductAction productId={productId} className="p-3 cursor-pointer" />

              <button onClick={handleCart} className="p-3 cursor-pointer" aria-label="Add to Cart">
                <CartIconTotalQuantity />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MobileHeader;
