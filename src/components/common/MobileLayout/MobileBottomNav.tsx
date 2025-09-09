'use client';

import { useAppSelector } from '@/store/hooks';
import { openDialog } from '@/store/slices/authDialogSlice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import CartIconTotalQuantity from '../../../features/cart/components/CartIconTotalQuantity';

import { House, List } from 'lucide-react';

import UserIconMobile from './UserIconMobile';

function MobileBottomNav() {
  const { isLogin } = useAppSelector((state) => state.auth);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const navItems = useMemo(() => {
    return [
      {
        label: 'حساب کاربری',
        onClick: () => {
          if (isLogin) {
            router.push('/profile');
          } else {
            dispatch(openDialog());
          }
        },
        icon: <UserIconMobile isLogin={isLogin} />,
        isActive: pathname === '/profile',
      },
      {
        label: 'سبد خرید',
        onClick: () => router.push('/checkout/cart'),
        icon: <CartIconTotalQuantity />,
        isActive: pathname === '/checkout/cart',
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
    ];
  }, [isLogin, pathname, router, dispatch]);

  return (
    <nav className="fixed bottom-3 right-3 left-3 z-50 bg-white shadow-md rounded-2xl">
      <ul className="flex justify-between items-center text-xs flex-row-reverse h-[60px]">
        {navItems.map(({ label, icon, onClick, isActive }) => (
          <li key={label} className="flex-1">
            <button
              onClick={onClick}
              className={`flex flex-col items-center justify-center py-2 w-full h-full transition-all cursor-pointer ${
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
  );
}

export default MobileBottomNav;
