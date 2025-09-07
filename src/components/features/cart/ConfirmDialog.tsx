'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import PrimaryButton from '@/components/common/PrimaryButton';
import { COMPONENT_BREAKPOINTS } from '@/constants';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  text: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  isLoadingConfirm?: boolean;
}

export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  text,
  confirmButtonText = 'بله',
  cancelButtonText = 'خیر',
  isLoadingConfirm = false,
  onConfirm,
}: ConfirmDialogProps) {
  const isDesktop = useMediaQuery(`(min-width: ${COMPONENT_BREAKPOINTS.DIALOG_DRAWER})`);

  const handleConfirm = async () => {
    onConfirm();
    onOpenChange(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{text}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              {cancelButtonText}
            </Button>
            <PrimaryButton isLoading={isLoadingConfirm} onClick={handleConfirm} disabled={isLoadingConfirm}>
              {confirmButtonText}
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{text}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <PrimaryButton isLoading={isLoadingConfirm} onClick={handleConfirm} disabled={isLoadingConfirm}>
            {confirmButtonText}
          </PrimaryButton>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {cancelButtonText}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
