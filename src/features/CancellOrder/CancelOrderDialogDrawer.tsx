'use client';

import * as React from 'react';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useState } from 'react';
import { COMPONENT_BREAKPOINTS } from '@/constants';
import AppDialog from '@/components/wrappers/AppDialog';
import AppDrawer from '@/components/wrappers/AppDrawer';
import PrimaryButton from '@/components/common/PrimaryButton';
import OrderCancellForm from './OrderCancellForm';

interface Props {
  orderId: number;
}

export function CancelOrderDialogDrawer({ orderId }: Props) {
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

  const CancelOrderTrigger = (
    <PrimaryButton variant="outline" className="w-full" onClick={() => setOpen(true)}>
      لغو سفارش
    </PrimaryButton>
  );

  if (isDesktop) {
    return (
      <AppDialog
        open={open}
        onOpenChange={setOpen}
        trigger={CancelOrderTrigger}
        title="لغو سفارش"
        actions={
          <PrimaryButton type="submit" className="flex-1" onClick={handleSubmit} isLoading={isLoadingSubmit}>
            ثبت
          </PrimaryButton>
        }
      >
        <OrderCancellForm orderId={orderId} className="pt-2" onSuccess={handleSuccess} ref={formRef} onLoadingChange={setIsLoadingSubmit} />
      </AppDialog>
    );
  }

  return (
    <AppDrawer trigger={CancelOrderTrigger} open={open} showClose={false} onOpenChange={setOpen} title="لغو سفارش">
      <OrderCancellForm
        orderId={orderId}
        className="px-4 mb-4"
        onSuccess={handleSuccess}
        ref={formRef}
        onLoadingChange={setIsLoadingSubmit}
      />

      <PrimaryButton className="w-full mb-2" onClick={handleSubmit} isLoading={isLoadingSubmit}>
        ثبت
      </PrimaryButton>
    </AppDrawer>
  );
}
