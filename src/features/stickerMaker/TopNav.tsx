'use client';

import MobileLogo from '@/components/common/Logo/MobileLogo';
import { Button } from '@/components/ui/button';
import { Phone } from 'lucide-react';
import React from 'react';
import CartIconTotalQuantity from '../cart/components/CartIconTotalQuantity';
import { useRouter } from 'next/navigation';

interface TopNavProps {}

export default function TopNav({}: TopNavProps) {
  const router = useRouter();
  const handleCartIconClick = () => {
    router.push('/checkout/cart');
  };
  return (
    <div className="flex items-center justify-between w-full py-2">
      <Button asChild variant="ghost" size="sm" className="size-12 cursor-pointer mr-2">
        <Phone />
      </Button>

      <MobileLogo />

      <div className="ml-4" onClick={handleCartIconClick}>
        <CartIconTotalQuantity badgePosition="left" />
      </div>
    </div>
  );
}
