import React from 'react';
import CartIconTotalQuantity from '../cart/components/CartIconTotalQuantity';
import ShareProductAction from './ActionButtons/ShareProductAction';
import { X } from 'lucide-react';
import MobileLogo from '@/components/common/Logo/MobileLogo';

const MobileHeader = () => {
  return (
    <header className="w-full h-[60px] bg-white shadow-sm">
      <div className="flex h-full items-center justify-between px-4">
        <button aria-label="Close" className="flex items-center justify-center w-10 h-10">
          <X size={22} />
        </button>

        <MobileLogo />

        <div className="flex items-center gap-4">
          <CartIconTotalQuantity />
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;
