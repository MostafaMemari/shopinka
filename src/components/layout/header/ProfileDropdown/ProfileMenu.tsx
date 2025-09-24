'use client';

import { LogOut, ChevronUp, ChevronDown, User } from 'lucide-react';
import { profileMenuItems } from '@/data/menuData';

import { Button } from '@/components/ui/button';
import { useBoolean } from '@/hooks/use-boolean';
import { useAuth } from '@/features/auth/hooks/useAuth';
import DropdownMenu from '@/components/common/DropdownMenu';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

const ProfileMenu = () => {
  const { logOut, logOutStatus } = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);

  const dropdownOpen = useBoolean(false);
  const isLogoutLoading = logOutStatus === 'pending';

  const handleUserLogout = () => {
    logOut();
  };

  return (
    <DropdownMenu
      trigger={
        <Button variant="outline" className="flex items-center justify-center gap-2 h-10">
          <User className="h-5 w-5" />
          {user && <span className="text-gray-500">{user.full_name || 'کاربر گرامی'}</span>}
          {dropdownOpen.value ? (
            <ChevronUp className="h-5 w-5 transition-transform duration-200" />
          ) : (
            <ChevronDown className="h-5 w-5 transition-transform duration-200" />
          )}
        </Button>
      }
      showChevron
      open={dropdownOpen.value}
      onOpenChange={dropdownOpen.onToggle}
      items={[
        ...profileMenuItems.map((item) => ({
          label: item.label,
          icon: <item.icon className="h-5 w-5" />,
          href: item.href,
          className: 'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200',
          textClassName: 'text-gray-800 hover:text-primary',
          onClick: dropdownOpen.onFalse,
        })),
        {
          label: isLogoutLoading ? 'در حال خروج...' : 'خروج',
          icon: <LogOut className="h-5 w-5" />,
          onClick: handleUserLogout,
          className: 'hover:bg-red-50',
          textClassName: 'text-red-500 hover:text-red-600',
          disabled: isLogoutLoading,
        },
      ]}
      className="rounded-[var(--radius)]"
    />
  );
};

export default ProfileMenu;
