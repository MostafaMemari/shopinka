'use client';

import { RootState } from '@/store';
import { Ellipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

interface AuthGuardProps {
  children: ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();

  const { isLogin, isLoading } = useSelector((state: RootState) => state.auth);

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async () => {
    if (isLoading) return;

    if (!isLogin) {
      router.replace('/');

      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
  }, [isLogin, isLoading]);

  if (isChecking) {
    return (
      <div className="fixed inset-0 z-55 flex items-center justify-center bg-background backdrop-blur-sm">
        <Ellipsis className="h-12 w-12 text-primary animate-pulse" />
      </div>
    );
  }

  return <>{children}</>;
}
