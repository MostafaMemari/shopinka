'use client';

import { usePathname } from 'next/navigation';

import MobileLogo from '@/components/common/Logo/MobileLogo';

import PhoneIcon from './PhoneIcon';
import DropdownItemMobile from './DropdownItemMobile';
import CartIcon from './CartIcon';
import BackIcon from './BackIcon';

const MobileHeader = () => {
  const pathname = usePathname();
  const isProductPage = pathname.startsWith('/product');

  return (
    <div className="h-[60px] w-full bg-white shadow-sm">
      <div className="flex items-center justify-between py-2 px-2">
        {isProductPage ? <BackIcon /> : <DropdownItemMobile />}
        <MobileLogo />
        {isProductPage ? <CartIcon /> : <PhoneIcon />}
      </div>
    </div>
  );
};

export default MobileHeader;
