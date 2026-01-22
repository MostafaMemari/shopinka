'use client';

import * as React from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';
import AddressForm from './AddressForm';
import { COMPONENT_BREAKPOINTS } from '@/constants';
import AppDialog from '@/components/wrappers/AppDialog';
import AppDrawer from '@/components/wrappers/AppDrawer';
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
      <AppDialog
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
      </AppDialog>
    );
  }

  return (
    <AppDrawer trigger={<AddressNewCard />} open={open} showClose={false} onOpenChange={setOpen} title="افزودن آدرس جدید">
      <AddressForm className="px-4 mb-4" onSuccess={handleSuccess} ref={formRef} onLoadingChange={setIsLoadingSubmit} />
      <PrimaryButton className="w-full mb-2" onClick={handleSubmit} isLoading={isLoadingSubmit}>
        ثبت
      </PrimaryButton>
    </AppDrawer>
  );
}
