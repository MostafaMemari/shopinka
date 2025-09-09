'use client';

import { FC, ReactNode } from 'react';
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { DialogTrigger } from '@radix-ui/react-dialog';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

const Dialog: FC<DialogProps> = ({ open, onOpenChange, title, description, children, actions, trigger, className }) => {
  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className={cn('max-w-md max-h-[90vh] p-5', className)} aria-describedby="dialog-description">
        <DialogHeader className="border-b pb-5">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
        {actions && (
          <DialogFooter className="pt-5 border-t flex gap-2 items-center justify-between">
            {actions}

            <DialogClose asChild>
              <Button variant="secondary" className="w-24">
                بستن
              </Button>
            </DialogClose>
          </DialogFooter>
        )}
      </DialogContent>
    </ShadcnDialog>
  );
};

export default Dialog;
