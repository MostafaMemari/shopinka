'use client';

import ProfileMenu from './ProfileMenu';
import { useIsMounted } from '@/hooks/useIsMounted';
import { LogIn } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/store/slices/authDialogSlice';
import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const ProfileDropdown = () => {
  const { isLogin } = useAppSelector((state) => state.auth);
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
        <Button onClick={handleClick} variant="outline" className="flex items-center justify-center gap-2 h-10">
          <LogIn />
          <span>ورود | ثبت‌نام</span>
        </Button>
      )}
    </>
  );
};

export default ProfileDropdown;
