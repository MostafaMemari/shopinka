import { Skeleton } from '@/components/ui';
import { useIsMounted } from '@/hooks/useIsMounted';
import { cn } from '@/lib/utils';
import { Check, User } from 'lucide-react';
import React from 'react';

interface UserIconMobileProps {
  isLogin: boolean;
}

function UserIconMobile({ isLogin }: UserIconMobileProps) {
  const isMounted = useIsMounted();

  return (
    <div className="relative">
      <User size={22} />

      {!isMounted ? (
        <div className={cn('absolute -bottom-1 -right-1')}>
          <Skeleton className="h-4 w-4 rounded-full" />
        </div>
      ) : (
        isLogin && (
          <div className={cn('absolute -bottom-1 -right-1')}>
            <Check size={14} className="text-blue-600 bg-white rounded-full p-0.5" />
          </div>
        )
      )}
    </div>
  );
}

export default UserIconMobile;
