'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MobileCartStickyProps {
  children: ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

export default function MobileCartSticky({ children, position = 'bottom', className }: MobileCartStickyProps) {
  const positionClass = position === 'top' ? 'top-10' : 'bottom-3';

  return (
    <div className="md:hidden">
      <Card className={cn(`fixed right-3 left-3 z-50 px-2 h-14 flex justify-center ${positionClass}`, className)} role="region">
        {children}
      </Card>
    </div>
  );
}
