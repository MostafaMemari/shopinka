'use client';

import { useState, useEffect, useRef } from 'react';
import { Category } from '@/features/categories/types';
import MenuItem from './MenuItem';
import { cn } from '@/lib/utils';
import NavigationMenuDesktop from '@/components/layout/header/DesktopNavbar/NavigationMenuDesktop';

interface DesktopNavbarProps {
  categories: Category[];
}

const DesktopNavbar = ({ categories }: DesktopNavbarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    setIsVisible(currentScrollY <= 0 || currentScrollY < lastScrollY.current);

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={cn('border-b transition-transform duration-700 px-4 bg-muted', isVisible ? 'translate-y-0' : '-translate-y-full')}>
      <div className="container mx-auto max-w-[1640px] flex items-center gap-x-2">
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-x-2">
            <div className="flex items-center gap-x-2">
              <NavigationMenuDesktop categories={categories || []} />
            </div>
          </div>

          <MenuItem menu={{ id: 1, name: 'فروش ویژه', href: '/shop?hasDiscount=true' }} isAlwaysActive />
        </div>
        <div id="header-desktop-navbar-indicator" className="absolute bottom-0 h-0.5 rounded-2xl end-0 transition-all duration-350 w-0" />
      </div>
    </nav>
  );
};

export default DesktopNavbar;
