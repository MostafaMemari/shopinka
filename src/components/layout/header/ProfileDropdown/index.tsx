'use client';

import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import ProfileMenu from './ProfileMenu';
import { Button, Skeleton } from '@/components/ui';
import { useIsMounted } from '@/hooks/useIsMounted';
import { LogIn } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/store/slices/authDialogSlice';

const ProfileDropdown = () => {
  const { isLogin } = useAuth();
  const isMounted = useIsMounted();

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(openDialog());
  };

  if (!isMounted) {
    return (
      <div className="flex h-9 items-center justify-center gap-2 rounded-md border border-gray-300 px-4">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-16 rounded-md" />
      </div>
    );
  }

  return (
    <>
      {isLogin ? (
        <ProfileMenu />
      ) : (
        <Button onClick={handleClick} variant="outline" className="flex items-center justify-center gap-2 focus:outline-none focus:ring-0">
          <LogIn />
          <span>ورود | ثبت‌نام</span>
        </Button>
      )}
    </>
  );
};

export default ProfileDropdown;
