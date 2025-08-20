'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import AddressForm from '../../checkout/address/AddressForm';
import { MapPinPlus } from 'lucide-react';
import { useState } from 'react';

export function CreateAddressDialogDrawer() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleSuccess = () => {
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <MapPinPlus /> ثبت آدرس جدید
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>افزون آدرس جدید</DialogTitle>
          </DialogHeader>
          <AddressForm className="pt-2" onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <MapPinPlus /> ثبت آدرس جدید
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>افزون آدرس جدید</DrawerTitle>
        </DrawerHeader>

        <AddressForm className="px-4" onSuccess={handleSuccess} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
