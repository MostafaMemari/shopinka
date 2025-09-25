'use client';

import { useMediaQuery } from '@/hooks/use-media-query';
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@/components/common/Dialog';

import MobileDrawer from '@/components/common/Drawer';

interface AddedToCardDialogDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export function AddedToCardDialogDrawer({
  open,
  onOpenChange,
  title = 'محصول به سبد خرید اضافه شد',
  children,
}: AddedToCardDialogDrawerProps) {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  return isDesktop ? (
    <Dialog open={open} onOpenChange={onOpenChange} title={title} size="md">
      {children}
    </Dialog>
  ) : (
    <MobileDrawer open={open} onOpenChange={onOpenChange} title={title}>
      {children}
    </MobileDrawer>
  );
}
