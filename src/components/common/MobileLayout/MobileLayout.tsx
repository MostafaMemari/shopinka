'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { Menu, MenuIcon, Phone, X } from 'lucide-react';
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
            <div className="flex items-center justify-between py-2 h-[60px]">
              <Button asChild onClick={toggleMenu} variant="ghost" size="sm" className="size-12 cursor-pointer">
                <MenuIcon />
              </Button>

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
