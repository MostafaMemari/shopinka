'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import Dialog from '@/components/common/Dialog';

import MobileDrawer from '@/components/common/Drawer';
import { closeAddedItem } from '@/store/slices/addedItemCartSlice';

export function AddedToCardDialogDrawer() {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { open } = useSelector((state: RootState) => state.addedItemCart);

  const title = 'محصول به سبد خرید اضافه شد';

  const handleClose = (val: boolean) => {
    if (!val) dispatch(closeAddedItem());
  };

  return isDesktop ? (
    <Dialog open={open} onOpenChange={handleClose} title={title} size="md">
      <></>
    </Dialog>
  ) : (
    <MobileDrawer open={open} onOpenChange={handleClose} title={title}>
      <></>
    </MobileDrawer>
  );
}
