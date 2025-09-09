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

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  className?: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText = 'تأیید',
  cancelText = 'انصراف',
  onConfirm,
  className,
}) => {
  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn('max-w-sm p-5', className)} aria-describedby="confirm-dialog-description">
        <DialogHeader className="border-b pb-3">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter className="pt-4 border-t flex gap-2 items-center justify-end">
          <DialogClose asChild>
            <Button variant="secondary">{cancelText}</Button>
          </DialogClose>
          <Button onClick={onConfirm}>{confirmText}</Button>
        </DialogFooter>
      </DialogContent>
    </ShadcnDialog>
  );
};

export default ConfirmDialog;
