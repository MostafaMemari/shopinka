'use client';

import { FC } from 'react';
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import PrimaryButton from './PrimaryButton';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  className?: string;
  trigger?: React.ReactNode;
  isConfirmLoading?: boolean;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = 'تأیید',
  cancelLabel = 'انصراف',
  onConfirm,
  className,
  trigger,
  isConfirmLoading = false,
}) => {
  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogClose asChild>{trigger}</DialogClose>}
      <DialogContent className={cn('max-w-sm p-5', className)}>
        <DialogHeader className="pb-3">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter className="flex gap-2 items-center justify-end">
          <DialogClose asChild>
            <Button variant="secondary">{cancelLabel}</Button>
          </DialogClose>
          <PrimaryButton onClick={onConfirm} isLoading={isConfirmLoading}>
            {confirmLabel}
          </PrimaryButton>
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  );
};

export default ConfirmDialog;
