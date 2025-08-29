'use client';

import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { openDialog } from '@/store/slices/authDialogSlice';
import { usePathname, useRouter } from 'next/navigation';
import React, { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import CartIconTotalQuantity from '../../features/cart/CartIconTotalQuantity';

import { Check, House, List, User } from 'lucide-react';

function MobileBottomNav() {
  const { isLogin } = useAuth();
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
        icon: (
          <div className="relative">
            <User size={22} />
            {isLogin && <Check size={14} className="absolute -bottom-1 -right-1 text-blue-600 bg-white rounded-full p-0.5" />}
          </div>
        ),
        isActive: pathname === '/profile',
      },
      {
        label: 'سبد خرید',
        onClick: () => router.push('/checkout/cart'),
        icon: <CartIconTotalQuantity isLogin={isLogin} />,
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
