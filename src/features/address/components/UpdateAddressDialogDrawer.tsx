'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { AddressItem } from '@/features/address/types';
import AddressForm from './AddressForm';

interface UpdateAddressDialogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AddressItem;
}

export function UpdateAddressDialogDrawer({ open, onOpenChange, item }: UpdateAddressDialogDrawerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleSuccess = () => {
    onOpenChange(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>ویرایش آدرس</DialogTitle>
          </DialogHeader>
          <AddressForm className="pt-2" onSuccess={handleSuccess} initialValues={item} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>ویرایش آدرس</DrawerTitle>
        </DrawerHeader>

        <AddressForm className="px-4" onSuccess={handleSuccess} initialValues={item} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
