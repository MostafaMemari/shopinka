'use client';

import { FC, ReactNode } from 'react';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger,
  DrawerDescription,
} from '@/components/ui/drawer';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import PrimaryButton from '../common/PrimaryButton';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  trigger?: ReactNode;
  className?: string;
  isConfirmLoading?: boolean;
}

const ConfirmDrawer: FC<Props> = ({
  open,
  onOpenChange,
  title = 'تأیید عملیات',
  description,
  confirmLabel = 'تأیید',
  cancelLabel = 'انصراف',
  onConfirm,
  trigger,
  className,
  isConfirmLoading = false,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      {trigger && <DrawerTrigger asChild>{trigger}</DrawerTrigger>}
      <DrawerContent className={cn('fixed inset-x-0 bottom-0 h-auto mt-0 mb-0', className)}>
        <DrawerHeader className="text-left pb-3 mb-3">
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription className="text-sm text-muted-foreground">{description}</DrawerDescription>}
        </DrawerHeader>

        <DrawerFooter className="flex items-center justify-between gap-2">
          <PrimaryButton onClick={onConfirm} disabled={isConfirmLoading} className="w-full">
            {isConfirmLoading ? '' : confirmLabel}
          </PrimaryButton>
          <DrawerClose asChild>
            <Button variant="secondary" className="w-full">
              {cancelLabel}
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ConfirmDrawer;
