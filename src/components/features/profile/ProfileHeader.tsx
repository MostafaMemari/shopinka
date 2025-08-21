'use client';

import { FaUserCircle } from 'react-icons/fa';
import SkeletonLoader from '../../common/SkeletonLoader';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { Skeleton } from '@/components/ui';

function ProfileHeader() {
  const { user, isLoading } = useAuth();
  const isMounted = useIsMounted();

  if (!isMounted || isLoading) {
    return (
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-x-2">
          <Skeleton className="animate-pulse w-10 h-10 rounded-full" />

          <div className="flex flex-col gap-1">
            <Skeleton className="animate-pulse w-24 h-3 rounded-xl" />
            <Skeleton className="animate-pulse w-24 h-3 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div className="flex items-center gap-x-2">
          <FaUserCircle className="h-10 w-10 only:rounded-full" />

          <div className="flex flex-col text-md">
            <div className="line-clamp-1">{!!user?.full_name ? user.full_name : 'کاربر گرامی'}</div>
            <div className="line-clamp-1 text-text/70">{user?.mobile}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
