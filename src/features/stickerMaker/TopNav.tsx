'use client';

import MobileLogo from '@/components/common/Logo/MobileLogo';
import React from 'react';
import CartIcon from '@/components/layout/header/MobileHeader/CartIcon';
import PhoneIcon from '@/components/layout/header/MobileHeader/PhoneIcon';

export default function TopNav() {
  return (
    <div className="h-[64px] w-full bg-white shadow-sm rounded-2xl">
      <div className="flex items-center justify-between py-2 px-2">
        <PhoneIcon />
        <MobileLogo />
        <CartIcon />
      </div>
    </div>
  );
}
