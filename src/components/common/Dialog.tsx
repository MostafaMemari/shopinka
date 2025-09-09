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
  showDefaultCloseButton?: boolean;
}

const sizeMap: Record<DialogSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-2xl',
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
  showDefaultCloseButton = true,
}) => {
  const descriptionId = useId();

  return (
    <ShadcnDialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(sizeMap[size], 'max-h-[90vh] p-5', className)}
        aria-describedby={description ? descriptionId : undefined}
      >
        <DialogHeader className="border-b pb-5">
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription id={descriptionId}>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        {(actions || showDefaultCloseButton) && (
          <DialogFooter className="pt-5 border-t flex gap-2 items-center justify-between">
            {actions}
            {showDefaultCloseButton && (
              <DialogClose asChild>
                <Button variant="secondary" className="w-24">
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
