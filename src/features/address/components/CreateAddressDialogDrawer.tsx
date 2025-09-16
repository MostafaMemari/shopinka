'use client';

import * as React from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';
import AddressForm from './AddressForm';
import { COMPONENT_BREAKPOINTS } from '@/constants';
import Dialog from '@/components/common/Dialog';
import MobileDrawer from '@/components/common/Drawer';
import PrimaryButton from '@/components/common/PrimaryButton';
import AddressNewCard from './AddressNewCard';

export function CreateAddressDialogDrawer() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: ${COMPONENT_BREAKPOINTS.DIALOG_DRAWER})`);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const handleSuccess = () => {
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        onOpenChange={setOpen}
        trigger={<AddressNewCard />}
        title="افزودن آدرس جدید"
        actions={
          <PrimaryButton type="submit" className="flex-1" onClick={handleSubmit} isLoading={isLoadingSubmit}>
            ثبت
          </PrimaryButton>
        }
      >
        <AddressForm className="pt-2" onSuccess={handleSuccess} ref={formRef} onLoadingChange={setIsLoadingSubmit} />
      </Dialog>
    );
  }

  return (
    <MobileDrawer
      trigger={<AddressNewCard />}
      open={open}
      onOpenChange={setOpen}
      title="افزودن آدرس جدید"
      actions={
        <PrimaryButton className="flex-1" onClick={handleSubmit} isLoading={isLoadingSubmit}>
          ثبت
        </PrimaryButton>
      }
    >
      <AddressForm className="px-4" onSuccess={handleSuccess} ref={formRef} onLoadingChange={setIsLoadingSubmit} />
    </MobileDrawer>
  );
}
