'use client';

import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MobileCartStickyFooterProps {
  children: ReactNode;
  className?: string;
}

export default function MobileCartStickyFooter({ children, className }: MobileCartStickyFooterProps) {
  return (
    <div className="md:hidden">
      <Card className={cn('fixed bottom-3 right-3 left-3 z-50 p-0', className)} role="region" aria-label="سبد خرید موبایل">
        <div className="flex justify-between items-center text-xs h-14 rtl:flex-row-reverse">{children}</div>
      </Card>
    </div>
  );
}
