'use client';

import { Category } from '@/features/categories/CategoryType';
import MenuItem from './MenuItem';
import { cn } from '@/lib/utils';
import NavigationMenuDesktop from '@/components/layout/header/DesktopHeader/DesktopNavbar/NavigationMenuDesktop';
import { useScrollDirection } from '@/hooks/useScrollDirection';

interface DesktopNavbarProps {
  categories: Category[];
}

const DesktopNavbar = ({ categories }: DesktopNavbarProps) => {
  const scrollDir = useScrollDirection();

  return (
    <nav
      className={cn(
        'border-b bg-white transition-all duration-300 ease-in-out',
        scrollDir === 'down' ? '-translate-y-4 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100',
      )}
    >
      <div className="mx-auto flex items-center gap-x-2">
        <div className="container flex w-full items-center justify-between">
          <NavigationMenuDesktop categories={categories || []} />
          <MenuItem menu={{ id: 1, name: 'فروش ویژه', href: '/shop?hasDiscount=true' }} isAlwaysActive />
        </div>

        <div id="header-desktop-navbar-indicator" className="absolute bottom-0 h-0.5 w-0 rounded-2xl end-0 transition-all duration-350" />
      </div>
    </nav>
  );
};

export default DesktopNavbar;
