'use client';

import Link from 'next/link';
import { LogOut, ChevronUp, ChevronDown, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { profileMenuItems } from '@/data/menuData';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useBoolean } from '@/hooks/use-boolean';
import { useAuthMutations } from '@/hooks/auth/useAuth';

const ProfileMenu = () => {
  const pathname = usePathname();

  const { logOut, logOutStatus } = useAuthMutations();

  const dropdownOpen = useBoolean(false);
  const isLogoutLoading = logOutStatus === 'pending';

  const handleUserLogout = () => {
    logOut();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center justify-center gap-2 focus:outline-none focus:ring-0 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <User className="h-5 w-5" />
          کاربر گرامی
          {dropdownOpen.value ? (
            <ChevronUp className="h-5 w-5 transition-transform duration-200" />
          ) : (
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60 border-t-2 border-t-primary">
        {profileMenuItems.map((item) => (
          <DropdownMenuItem
            key={item.href}
            className="p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            asChild
          >
            <Link
              href={item.href}
              className="flex items-center gap-2 text-gray-800 hover:text-primary"
              aria-current={pathname === item.href ? 'page' : undefined}
              onClick={dropdownOpen.onFalse}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 py-1 text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer transition-colors duration-200"
            onClick={handleUserLogout}
            aria-label="خروج از حساب کاربری"
            disabled={isLogoutLoading}
          >
            <LogOut className="h-5 w-5" />
            <span>{isLogoutLoading ? 'در حال خروج...' : 'خروج'}</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
