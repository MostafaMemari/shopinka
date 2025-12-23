'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

import { useCart } from '@/features/cart/hooks/useCart';
import { useBoolean } from '@/hooks/use-boolean';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useAppSelector } from '@/store/hooks';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import { Card } from '@/components/ui/card';

import CartLoadingState from './CartLoadingState';
import CartErrorState from './CartErrorState';
import CartEmptyState from './CartEmptyState';
import CartFooterSticky from './CartFooterSticky';
import CartHeader from './CartHeader';
import { CartItemsList } from './CartItemsList';
import CartSidebarSummary from './CartSidebarSummary';
import ClearCartConfirmDialog from './ClearCartConfirmDialog';

export default function CartPageView() {
  const router = useRouter();
  const dispatch = useDispatch();
  const confirmDialog = useBoolean(false);
  const [isLoadingContinue, setIsLoadingContinue] = useState(false);

  const { isLogin } = useAppSelector((state) => state.auth);
  const { cart, isLoading, error, clearAllCartItems, isClearOnCart } = useCart();
  const isMounted = useIsMounted();

  const cartItems = cart?.items || [];
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.count, 0);

  const handleContinue = async () => {
    if (isLoadingContinue) return;
    setIsLoadingContinue(true);
    if (isLogin) router.push('/checkout/shipping');
    else dispatch(openAuthDialog());
  };

  if (!isMounted || isLoading) return <CartLoadingState />;
  if (error) return <CartErrorState message={error.message} />;
  if (!cart || cartItems.length === 0) return <CartEmptyState />;

  return (
    <>
      <CartFooterSticky price={cart.payablePrice} isLoading={isLoadingContinue} onContinue={handleContinue} />

      <div className="col-span-12 md:col-span-9">
        <Card className="p-4">
          <CartHeader itemsCount={cartItems.length} onClearClick={confirmDialog.onTrue} />
          <CartItemsList items={cartItems} />
        </Card>
      </div>

      <div className="col-span-12 md:col-span-3">
        <CartSidebarSummary cart={cart} totalQuantity={totalQuantity} isLoading={isLoadingContinue} onContinue={handleContinue} />
      </div>

      <ClearCartConfirmDialog
        open={confirmDialog.value}
        loading={isClearOnCart}
        onClose={confirmDialog.onToggle}
        onConfirm={clearAllCartItems}
      />
    </>
  );
}
