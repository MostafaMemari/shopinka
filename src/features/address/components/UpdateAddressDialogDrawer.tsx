'use client';

import * as React from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import { AddressItem } from '@/features/address/AddressType';
import AddressForm from './AddressForm';
import MobileDrawer from '@/components/common/Drawer';
import { useState } from 'react';
import PrimaryButton from '@/components/common/PrimaryButton';
import Dialog from '@/components/common/Dialog';

interface UpdateAddressDialogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AddressItem;
}

export function UpdateAddressDialogDrawer({ open, onOpenChange, item }: UpdateAddressDialogDrawerProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const handleSuccess = () => {
    onOpenChange(false);
  };

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={onOpenChange}
        title="ویرایش آدرس"
        actions={
          <PrimaryButton type="submit" className="flex-1" onClick={handleSubmit} isLoading={isLoadingSubmit}>
            ثبت
          </PrimaryButton>
        }
      >
        <AddressForm className="pt-2" onSuccess={handleSuccess} initialValues={item} ref={formRef} onLoadingChange={setIsLoadingSubmit} />
      </Dialog>
    );
  }

  return (
    <MobileDrawer
      open={open}
      onOpenChange={onOpenChange}
      title="ویرایش آدرس"
      actions={
        <PrimaryButton className="flex-1" onClick={handleSubmit} isLoading={isLoadingSubmit}>
          ثبت
        </PrimaryButton>
      }
    >
      <AddressForm className="px-4" onSuccess={handleSuccess} initialValues={item} onLoadingChange={setIsLoadingSubmit} />
    </MobileDrawer>
  );
}
