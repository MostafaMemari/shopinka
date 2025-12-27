'use client';
import MobileLogo from '@/components/common/Logo/MobileLogo';

import PhoneIcon from './PhoneIcon';
import DropdownItemMobile from './DropdownItemMobile';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import CartIconTotalQuantity from '@/features/cart/components/CartIconTotalQuantity';

const MobileHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isProductPage = /^\/product(\/|$)/.test(pathname);

  return (
    <>
      {isProductPage ? (
        <div className="h-[60px] w-full bg-white shadow-sm">
          <div className="flex items-center justify-between py-2 px-2">
            <Button onClick={() => router.back()} asChild variant="ghost" size="sm" className="size-12 cursor-pointer">
              <ArrowRight />
            </Button>
            <MobileLogo />

            <div className="pl-2" onClick={() => router.push('/checkout/cart')}>
              <CartIconTotalQuantity />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[60px] w-full bg-white shadow-sm">
          <div className="flex items-center justify-between py-2 px-2">
            <DropdownItemMobile />

            <MobileLogo />

            <PhoneIcon />
          </div>
        </div>
      )}
    </>
  );
};

export default MobileHeader;
