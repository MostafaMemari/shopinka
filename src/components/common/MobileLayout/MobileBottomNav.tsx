'use client';

import { useAppSelector } from '@/store/hooks';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import CartIconTotalQuantity from '../../../features/cart/components/CartIconTotalQuantity';

import { BookOpen, House, List, ShoppingCart } from 'lucide-react';

import UserIconMobile from './UserIconMobile';
import MobileCartSticky from '../MobileCartSticky';

function MobileBottomNav() {
  const { isLogin } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = useMemo(() => {
    return [
      {
        label: 'مجله',
        onClick: () => router.push('/blog'),
        icon: <BookOpen size={22} />,
        isActive: pathname === '/blog',
      },
      {
        label: 'دسته‌بندی',
        onClick: () => router.push('/shop'),
        icon: <List size={22} />,
        isActive: pathname === '/shop',
      },

      {
        label: 'خانه',
        onClick: () => router.push('/'),
        icon: <House size={22} />,
        isActive: pathname === '/',
      },
      {
        label: 'سبد خرید',
        onClick: () => router.push('/checkout/cart'),
        icon: <ShoppingCart size={22} />,
        isActive: pathname === '/checkout/cart',
      },
      // {
      //   label: 'سبد خرید',
      //   onClick: () => router.push('/checkout/cart'),
      //   icon: <CartIconTotalQuantity badgePosition="left" />,
      //   isActive: pathname === '/checkout/cart',
      // },
      {
        label: 'حساب کاربری',
        onClick: () => {
          if (isLogin) {
            router.push('/profile');
          } else {
            dispatch(openAuthDialog());
          }
        },
        icon: <UserIconMobile isLogin={isLogin} />,
        isActive: pathname === '/profile',
      },
    ];
  }, [isLogin, pathname, router, dispatch]);

  return (
    <MobileCartSticky position="bottom">
      <nav className="w-full">
        <ul className="flex justify-between items-center text-xs h-[60px]">
          {navItems.map(({ label, icon, onClick, isActive }) => (
            <li key={label} className="flex-1">
              <button
                onClick={onClick}
                className={`flex flex-col items-center justify-center w-full transition-all cursor-pointer ${
                  isActive ? 'text-primary font-bold' : 'text-gray-500'
                }`}
              >
                {icon}
                <span className="mt-1">{label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </MobileCartSticky>
  );
}

export default MobileBottomNav;
