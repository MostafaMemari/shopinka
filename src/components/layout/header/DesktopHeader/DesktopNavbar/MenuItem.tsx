'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
  menu: { id: number; name: string; href: string };
  isAlwaysActive?: boolean;
  className?: string;
}

const MenuItem = ({ menu, isAlwaysActive, className }: MenuItemProps) => {
  const pathname = usePathname();
  const isActive = isAlwaysActive || pathname === menu.href;

  return (
    <Link
      href={menu.href}
      className={cn(
        'relative px-4 py-2 rounded-lg text-sm font-bold transition-all duration-300',
        isActive
          ? 'text-white dark:text-white bg-gradient-to-r from-red-500 to-pink-500 dark:from-red-600 dark:to-pink-600 animate-pulse-unique'
          : 'text-gray-700 dark:text-gray-200 hover:text-white dark:hover:text-white hover:bg-gradient-to-r hover:from-red-400 hover:to-pink-400 dark:hover:from-red-500 dark:hover:to-pink-500',
        'hover:scale-105 hover:shadow-lg',
        className,
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {menu.name}
      {isActive && (
        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-white dark:bg-gray-200 rounded-full animate-underline" />
      )}
    </Link>
  );
};

export default MenuItem;
