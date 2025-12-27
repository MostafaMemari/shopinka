'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import FavoriteProductAction from './ActionButtons/FavoriteProductAction';
import CartIconTotalQuantity from '../cart/components/CartIconTotalQuantity';
import ShareProductAction from './ActionButtons/ShareProductAction';
import { X } from 'lucide-react';

interface MobileHeaderProps {
  productId: number;
}

const MobileHeader = ({ productId }: MobileHeaderProps) => {
  const router = useRouter();

  return (
    <header className="w-full h-[60px] bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4">
        <button onClick={() => router.back()} aria-label="Close" className="flex items-center justify-center w-10 h-10">
          <X size={22} />
        </button>

        <div className="flex items-center gap-4">
          <ShareProductAction />
          <FavoriteProductAction productId={productId} />
          <button onClick={() => router.push('/checkout/cart')}>
            <CartIconTotalQuantity />
          </button>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
