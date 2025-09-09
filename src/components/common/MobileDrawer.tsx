'use client';

import { FC, ReactNode } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Button } from '../ui';

interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

const MobileDrawer: FC<MobileDrawerProps> = ({ title = 'منو', description, actions, children, className = '', open, onOpenChange }) => {
  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange} modal={false}>
        <DrawerContent
          className={cn('fixed inset-x-0 bottom-0 !mt-0 !mb-0 !h-auto', className)}
          aria-describedby="mobile-drawer-navigation"
        >
          <DrawerHeader className="text-left pb-3 border-b mb-3">
            <DrawerTitle>{title}</DrawerTitle>
            {description && <p className="text-sm text-gray-500">{description}</p>}
          </DrawerHeader>

          <div className={cn('flex-1 overflow-y-auto px-4')} id="mobile-drawer-navigation">
            {children}
          </div>

          {actions && (
            <DrawerFooter className="sticky bottom-0 left-0 right-0 border-t">
              <div className="flex items-center justify-between gap-2">
                {actions}

                <DrawerClose asChild>
                  <Button variant="secondary" className="w-24">
                    بستن
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileDrawer;
