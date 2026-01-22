'use client';

import { type FC, type ReactNode } from 'react';
import { Sheet as SheetShadcn, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

interface Props {
  triggerText?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: 'left' | 'right' | 'top' | 'bottom';
  className?: string;
  style?: React.CSSProperties;
}

const AppShhet: FC<Props> = ({
  triggerText = 'باز کردن',
  title = 'منو',
  description = 'برای جابجایی بین بخش‌های مختلف، گزینه مورد نظر را انتخاب کنید.',
  children,
  isOpen,
  onOpenChange,
  side = 'right',
  className = 'flex flex-col p-2 rounded-xl',
  style = { top: '5rem', bottom: '5rem', right: '0.75rem', height: 'auto' },
}) => {
  return (
    <SheetShadcn open={isOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline">{triggerText}</Button>
      </SheetTrigger>
      <SheetContent side={side} className={className} style={style} dir="rtl">
        <SheetHeader>
          <SheetTitle className="p-4 text-lg font-bold">{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </SheetShadcn>
  );
};

export default AppShhet;
