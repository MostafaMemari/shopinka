'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';

import { Menu, Phone, X } from 'lucide-react';
import { Button } from '../../ui/button';

import MobileBottomNav from './MobileBottomNav';
import MobileLogo from '../Logo/MobileLogo';
import SideMenu from '@/components/layout/mobileLayout/SideMenu';
import MobileCartSticky from '../MobileCartSticky';

interface MobileLayoutProps {
  showHeader?: boolean;
  showNav?: boolean;
}

const MobileLayout = ({ showHeader = true, showNav = true }: MobileLayoutProps) => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  if (pathname.startsWith('/product') && !pathname.startsWith('/product-category')) return null;

  return (
    <div className="lg:hidden">
      {showHeader && (
        <MobileCartSticky position="top">
          <header>
            <div className="flex items-center justify-between py-2 px-4 h-[60px]">
              <button onClick={toggleMenu} className="cursor-pointer">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
              <MobileLogo />

              <Button asChild variant="ghost" size="sm" className="size-12 cursor-pointer">
                <Phone />
              </Button>
            </div>
          </header>
        </MobileCartSticky>
      )}

      <SideMenu isMenuOpen={isMenuOpen} onToggleMenu={setIsMenuOpen} />

      {showNav && <MobileBottomNav />}
    </div>
  );
};

export default MobileLayout;
