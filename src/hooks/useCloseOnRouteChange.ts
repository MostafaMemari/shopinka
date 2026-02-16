import { closeAuthDialog } from '@/store/slices/authDialogSlice';
import { clearAddToCart } from '@/store/slices/pendingActionSlice';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export function useCloseOnRouteChange(open: boolean) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  useEffect(() => {
    if (open) {
      dispatch(closeAuthDialog());
      dispatch(clearAddToCart());
    }
  }, [pathname]);
}
