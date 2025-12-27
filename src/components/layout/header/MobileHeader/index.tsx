import MobileLogo from '@/components/common/Logo/MobileLogo';
import MobileBottomNav from '@/components/common/MobileLayout/MobileBottomNav';

import PhoneIcon from './PhoneIcon';
import DropdownItemMobile from './DropdownItemMobile';

interface MobileHeaderProps {
  showHeader?: boolean;
  showNav?: boolean;
}

const MobileHeader = ({ showHeader = true, showNav = true }: MobileHeaderProps) => {
  return (
    <div>
      {showHeader && (
        <header className="w-full bg-white shadow-sm">
          <div className="flex items-center justify-between py-2 h-[60px]">
            <DropdownItemMobile />

            <MobileLogo />

            <PhoneIcon />
          </div>
        </header>
      )}

      {showNav && <MobileBottomNav />}
    </div>
  );
};

export default MobileHeader;
