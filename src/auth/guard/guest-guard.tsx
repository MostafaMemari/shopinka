'use client';

import type { ReactNode } from 'react';
import { useState, useEffect } from 'react';

import { Ellipsis } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter();

  const { isLogin, isLoading } = useSelector((state: RootState) => state.auth);

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async () => {
    if (isLoading) return;

    if (isLogin) {
      router.replace('/dashboard');

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
