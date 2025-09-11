'use client';

import Link from 'next/link';
import { type FC } from 'react';
import { navigationMenuItems } from '@/data/menuData';
import { usePathname } from 'next/navigation';
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SideMenuProps {
  isMenuOpen: boolean;
  onToggleMenu: (isOpen: boolean) => void;
}

const SideMenu: FC<SideMenuProps> = ({ isMenuOpen, onToggleMenu }) => {
  const pathname = usePathname();

  return (
    <Sheet open={isMenuOpen} onOpenChange={onToggleMenu}>
      <SheetContent
        side="right"
        style={{ top: '5rem', bottom: '5rem', right: '0.75rem', height: 'auto' }}
        className="flex flex-col p-2 rounded-xl"
      >
        <SheetTitle className="p-4 text-lg font-bold">منو</SheetTitle>
        <ScrollArea className="flex-1 px-4">
          <ul className="space-y-2">
            {navigationMenuItems.map(({ title, href, icon: Icon }) => (
              <li key={title}>
                <Link
                  href={href}
                  onClick={() => onToggleMenu(false)}
                  className={`flex items-center gap-x-2 rounded px-4 py-2 hover:bg-accent ${
                    pathname === href ? 'font-bold text-primary' : ''
                  }`}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span>{title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default SideMenu;
