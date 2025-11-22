'use client';

import { FC, ReactNode, useEffect, useRef } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
  DrawerOverlay,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
  trigger?: ReactNode;
  showClose?: boolean;
  isModal?: boolean;
}

const MobileDrawer: FC<MobileDrawerProps> = ({
  title,
  description,
  actions,
  children,
  className,
  open,
  onOpenChange,
  trigger,
  showClose = true,
  isModal = true,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModal) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        onOpenChange(false);
      }
    };

    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModal, onOpenChange]);

  return (
    <Drawer open={open} onOpenChange={onOpenChange} repositionInputs={false} modal={isModal}>
      {isModal && <DrawerOverlay className="inset-0 bg-transparent shadow-none backdrop-blur-none" />}
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent ref={drawerRef} className={cn('inset-x-0 !h-auto mt-0 mb-0', className)}>
        {(title || description) && (
          <DrawerHeader className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 border-b">
            {title && <DrawerTitle className="text-lg font-medium">{title}</DrawerTitle>}
            {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
          </DrawerHeader>
        )}

        <div className={cn('flex-1 overflow-y-auto px-4')}>{children}</div>

        {(actions || showClose) && (
          <DrawerFooter className="sticky bottom-0 left-0 right-0 border-t mt-1">
            <div className="flex flex-col items-center justify-between gap-2">
              {actions && <div className="flex items-center gap-2 w-full">{actions}</div>}
              {showClose && (
                <DrawerClose asChild>
                  <Button size="lg" variant="outline" className="w-full">
                    بستن
                  </Button>
                </DrawerClose>
              )}
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
