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
  const positionClass = position === 'top' ? 'top-3' : 'bottom-3';

  return (
    <div className="md:hidden">
      <Card className={cn(`fixed right-3 left-3 z-50 p-0 ${positionClass}`, className)} role="region">
        {children}
      </Card>
    </div>
  );
}

{
  /* <div className="flex justify-between items-center text-xs h-14 rtl:flex-row-reverse"></div> */
}
