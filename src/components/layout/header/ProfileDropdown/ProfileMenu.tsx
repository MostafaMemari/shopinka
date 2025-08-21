'use client';

import Link from 'next/link';
import { LogOut, ChevronUp, ChevronDown, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { toast } from 'sonner';
import { logout } from '@/service/authService';
import { useState } from 'react';
import { profileMenuItems } from '@/data/menuData';
import { useLogoutUser } from '@/hooks/reactQuery/auth/useLogoutUser';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useBoolean } from '@/hooks/use-boolean';

const ProfileMenu = () => {
  const pathname = usePathname();
  const logoutUser = useLogoutUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const dropdownOpen = useBoolean(false);

  const handleUserLogout = async () => {
    setIsLoggingOut(true);
    try {
      const res = await logout();
      if (res?.status === 201 || res?.status === 200) {
        logoutUser().then(() => {
          toast.success('خروج با موفقیت انجام شد');
        });
      }
    } catch (err) {
      toast.error('خروج با خطا مواجه شد');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <DropdownMenu modal={false} onOpenChange={dropdownOpen.onTrue}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center justify-center gap-2 focus:outline-none focus:ring-0">
          <User /> کاربر گرامی {dropdownOpen.value ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60 rounded-lg border-t-2 border-t-primary bg-muted shadow-lg dark:bg-gray-800">
        {profileMenuItems.map((item) => (
          <DropdownMenuItem key={item.href} className="p-3" asChild>
            <Link
              href={item.href}
              className="flex items-center gap-2"
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
            className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleUserLogout}
            aria-label="خروج از حساب کاربری"
            disabled={isLoggingOut}
          >
            <LogOut className="h-5 w-5" />
            <span>{isLoggingOut ? 'در حال خروج...' : 'خروج'}</span>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileMenu;
