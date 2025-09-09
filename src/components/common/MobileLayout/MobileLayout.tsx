'use client';

import { usePathname } from 'next/navigation';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';

import { HiOutlineXMark } from 'react-icons/hi2';
import { HiOutlineMenu } from 'react-icons/hi';
import { Phone } from 'lucide-react';
import { Button } from '../../ui/button';

import MobileBottomNav from './MobileBottomNav';
import MobileLogo from '../Logo/MobileLogo';
import MobileMenu from '@/components/layout/mobileLayout/MobileMenu';

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
      <Transition
        show={isMenuOpen}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as={Fragment}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" aria-hidden="true" />
      </Transition>

      {showHeader && (
        <header className="fixed top-3 right-3 left-3 z-50 bg-white shadow-md rounded-2xl">
          <div className="flex items-center justify-between py-2 px-4 h-[60px]">
            <button onClick={toggleMenu} className="cursor-pointer">
              {isMenuOpen ? <HiOutlineXMark className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
            </button>
            <MobileLogo />

            <Button asChild variant="ghost" size="sm" className="size-12 cursor-pointer">
              <Phone />
            </Button>
          </div>
        </header>
      )}

      <MobileMenu isMenuOpen={isMenuOpen} onToggleMenu={setIsMenuOpen} />

      {showNav && <MobileBottomNav />}
    </div>
  );
};

export default MobileLayout;
