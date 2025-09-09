'use client';

import { profileMenuItem } from '@/data/profileMenuItem';
import { cn } from '@/utils/utils';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiOutlineLogout } from 'react-icons/hi';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '../auth/hooks/useAuth';

type ProfileMenuProps = {
  onClose?: () => void;
};

function ProfileMenu({ onClose }: ProfileMenuProps) {
  const pathname = usePathname();
  const router = useRouter();

  const { logOut, logOutStatus } = useAuth();

  const handleUserLogout = () => {
    logOut(undefined, {
      onSuccess: () => {
        router.push('/');
        onClose?.();
      },
    });
  };

  const isLogoutLoading = logOutStatus === 'pending';

  return (
    <ScrollArea dir="ltr" className="h-80 rounded-md">
      <ul className="space-y-1 px-4">
        {profileMenuItem.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={cn(
                'profile-menu flex items-center justify-between rounded-lg px-2 py-3',
                pathname === item.href && 'profile-menu-active',
              )}
              onClick={onClose}
            >
              <div className="flex items-center gap-x-4">
                <item.icon className="h-6 w-6" />
                <div>{item.label}</div>
              </div>
            </Link>
          </li>
        ))}
        <li>
          <button
            onClick={handleUserLogout}
            className="w-full flex items-center gap-x-2 rounded-lg px-1 py-3 text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900/20 transition group cursor-pointer"
            aria-label="خروج از حساب کاربری"
          >
            <HiOutlineLogout className="h-6 w-6 group-hover:text-red-600 dark:group-hover:text-red-300" />
            <span className="group-hover:text-red-600 dark:group-hover:text-red-300">{isLogoutLoading ? 'در حال خروج...' : 'خروج'}</span>
          </button>
        </li>
      </ul>
    </ScrollArea>
  );
}

export default ProfileMenu;
