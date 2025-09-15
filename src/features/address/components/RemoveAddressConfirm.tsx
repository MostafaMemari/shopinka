import ConfirmDialog from '@/components/common/ConfirmDialog';
import ConfirmDrawer from '@/components/common/ConfirmDrawer';
import { COMPONENT_BREAKPOINTS } from '@/constants';
import { useBoolean } from '@/hooks/use-boolean';
import { useMediaQuery } from '@/hooks/use-media-query';
import React from 'react';
import { useAddress } from '../useAddress';

interface RemoveAddressConfirmProps {
  control: ReturnType<typeof useBoolean>;
  addressId: number;
  title?: string;
  description?: string;
  confirmLabel?: string;
}

function RemoveAddressConfirm({
  control,
  addressId,
  title = 'حذف آدرس',
  description = 'آیا مطمئن هستید که می‌خواهید این آدرس را حذف کنید؟',
}: RemoveAddressConfirmProps) {
  const { deleteAddress, isDeleteAddressLoading } = useAddress({});

  const isDesktop = useMediaQuery(`(min-width: ${COMPONENT_BREAKPOINTS.DIALOG_DRAWER})`);

  const handleConfirm = () => {
    deleteAddress(addressId);
  };

  if (isDesktop) {
    return (
      <ConfirmDialog
        open={control.value}
        onOpenChange={control.onToggle}
        title={title}
        description={description}
        isConfirmLoading={isDeleteAddressLoading}
        confirmLabel="حذف"
        cancelLabel="انصراف"
        onConfirm={handleConfirm}
      />
    );
  }

  return (
    <ConfirmDrawer
      open={control.value}
      onOpenChange={control.onToggle}
      title={title}
      isConfirmLoading={isDeleteAddressLoading}
      confirmLabel="حذف"
      cancelLabel="انصراف"
      description={description}
      onConfirm={handleConfirm}
    />
  );
}

export default RemoveAddressConfirm;
