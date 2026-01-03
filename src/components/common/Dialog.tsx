'use client';

import { FC, ReactNode, useId } from 'react';
import {
  Dialog as ShadcnDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
  DialogClose,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

type DialogSize = 'sm' | 'md' | 'lg';

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  className?: string;
  size?: DialogSize;
  showClose?: boolean;
}

const sizeMap: Record<DialogSize, string> = {
  sm: 'sm:max-w-sm',
  md: 'sm:max-w-md',
  lg: 'sm:max-w-2xl',
};

const Dialog: FC<DialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  trigger,
  className,
  size = 'md',
  showClose = true,
}) => {
  const descriptionId = useId();

  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(sizeMap[size], 'max-h-[90vh] p-5 overflow-y-auto', className)}
        aria-describedby={description ? descriptionId : undefined}
      >
        <DialogHeader className="border-b pb-5">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription id={descriptionId}>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        {(actions || showClose) && (
          <DialogFooter className="pt-5 border-t flex !flex-row items-center justify-end gap-2">
            {actions}
            {showClose && (
              <DialogClose asChild>
                <Button variant="outline" className="w-24">
                  بستن
                </Button>
              </DialogClose>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </ShadcnDialog>
  );
};

export default Dialog;
