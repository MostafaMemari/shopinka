'use client';

import { FC, ReactNode } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, DrawerTrigger } from '@/components/ui/drawer';
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
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent
        className={cn('fixed inset-x-0 bottom-0 h-auto mt-0 mb-0', className)}
        aria-labelledby={title ? 'mobile-drawer-title' : undefined}
      >
        {(title || description) && (
          <DrawerHeader className="text-left pb-3 border-b mb-3">
            {title && <DrawerTitle id="mobile-drawer-title">{title}</DrawerTitle>}
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
          </DrawerHeader>
        )}

        <div className={cn('flex-1 overflow-y-auto px-4')}>{children}</div>

        {(actions || showClose) && (
          <DrawerFooter className="sticky bottom-0 left-0 right-0 border-t mt-3">
            <div className="flex items-center justify-between gap-2">
              {actions}
              {showClose && (
                <DrawerClose asChild>
                  <Button variant="secondary" className="w-24">
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
