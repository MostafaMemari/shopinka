'use client';

import { FC, ReactNode } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
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
    <Drawer open={open} onOpenChange={onOpenChange} repositionInputs={false}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className={cn('inset-x-0 !h-auto mt-0 mb-0', className)}>
        <DrawerHeader className="text-left pb-3 border-b mb-3">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </DrawerHeader>

        <div className={cn('flex-1 overflow-y-auto px-4')}>{children}</div>

        {(actions || showClose) && (
          <DrawerFooter className="sticky bottom-0 left-0 right-0 border-t mt-1">
            <div className="flex flex-col items-center justify-between gap-2">
              {actions && <div className={'flex items-center gap-2 w-full'}>{actions}</div>}
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
