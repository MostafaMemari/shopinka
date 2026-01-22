'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface MobileCartStickyProps {
  children: ReactNode;
  className?: string;
}

export default function MobileCartSticky({ children, className }: MobileCartStickyProps) {
  return (
    <div className="lg:hidden">
      <div
        className={cn(`fixed right-0 left-0 bottom-0 z-50 h-16 flex justify-center w-full bg-white border-t-2`, className)}
        role="region"
      >
        {children}
      </div>
    </div>
  );
}
