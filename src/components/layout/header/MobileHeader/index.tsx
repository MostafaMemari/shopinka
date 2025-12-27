'use client';
import MobileLogo from '@/components/common/Logo/MobileLogo';

import PhoneIcon from './PhoneIcon';
import DropdownItemMobile from './DropdownItemMobile';

const MobileHeader = () => {
  return (
    <div className="h-[60px] w-full bg-white shadow-sm">
      <div className="flex items-center justify-between py-2">
        <DropdownItemMobile />

        <MobileLogo />

        <PhoneIcon />
      </div>
    </div>
  );
};

export default MobileHeader;
