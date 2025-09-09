'use client';

import { FC, ReactNode } from 'react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter, DrawerClose, DrawerTrigger } from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface ConfirmDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  trigger?: ReactNode;
  className?: string;
  confirmLoading?: boolean;
}

const ConfirmDrawer: FC<ConfirmDrawerProps> = ({
  open,
  onOpenChange,
  title = 'تأیید عملیات',
  description,
  confirmLabel = 'تأیید',
  cancelLabel = 'انصراف',
  onConfirm,
  trigger,
  className,
  confirmLoading = false,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className={cn('fixed inset-x-0 bottom-0 h-auto mt-0 mb-0', className)} aria-labelledby="confirm-drawer-title">
        <DrawerHeader className="text-left pb-3 border-b mb-3">
          <DrawerTitle id="confirm-drawer-title">{title}</DrawerTitle>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </DrawerHeader>

        <DrawerFooter className="border-t mt-3 flex items-center justify-between gap-2">
          <DrawerClose asChild>
            <Button variant="secondary" className="w-24">
              {cancelLabel}
            </Button>
          </DrawerClose>
          <Button onClick={onConfirm} disabled={confirmLoading} className="w-24">
            {confirmLoading ? 'در حال انجام...' : confirmLabel}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ConfirmDrawer;
