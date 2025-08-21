'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

import ProfileMenu from './ProfileMenu';
import { Button, Skeleton } from '@/components/ui';
import { LogIn } from 'lucide-react';
import { useIsMounted } from '@/hooks/useIsMounted';

const ProfileDropdown = () => {
  const pathname = usePathname();
  const { isLogin } = useAuth();
  const isMounted = useIsMounted();

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
        <Link href={`/login/?backUrl=${pathname}`}>
          <Button variant="outline" className="flex items-center justify-center gap-2 focus:outline-none focus:ring-0">
            <LogIn />
            <span>ورود | ثبت‌نام</span>
          </Button>
        </Link>
      )}
    </>
  );
};

export default ProfileDropdown;
