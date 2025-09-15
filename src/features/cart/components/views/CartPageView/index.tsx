'use client';

import React, { useState } from 'react';

import CartPageItem from '@/features/cart/components/views/CartPageView/CartPageItem';
import CartSummary from '@/features/cart/components/CartSummary';
import PrimaryButton from '@/components/common/PrimaryButton';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '@/features/profile/ErrorState';
import EmptyState from '@/features/profile/EmptyState';
import MobileCartSticky from '@/components/common/MobileCartSticky';
import { formatPrice } from '@/utils/formatter';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { useIsMounted } from '@/hooks/useIsMounted';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/store/slices/authDialogSlice';
import { useBoolean } from '@/hooks/use-boolean';
import { useCart } from '@/features/cart/hooks/useCart';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { ShoppingBasket, Trash2 } from 'lucide-react';
import { Card } from '@/components/ui/card';

function CartPageView() {
  const router = useRouter();
  const dispatch = useDispatch();
  const confirmDialogDrawer = useBoolean(false);
  const [isLoadingContinue, setIsLoadingContinue] = useState(false);

  const { isLogin } = useAppSelector((state) => state.auth);

  const { cart, isLoading, error, clearAllCartItems, isClearOnCart } = useCart();
  const cartItems = cart?.items || [];

  const isMounted = useIsMounted();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.count, 0);

  const handleNextCartShipping = async () => {
    if (isLoadingContinue) return;
    setIsLoadingContinue(true);
    if (isLogin) router.push('/checkout/shipping');
    else dispatch(openDialog());
  };

  if (!isMounted || isLoading) {
    return (
      <div className="col-span-12">
        <Card className="p-4 min-h-[300px] flex items-center justify-center">
          <LoadingSpinner />
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="col-span-12">
        <Card className="p-4 min-h-[300px] flex items-center justify-center">
          <ErrorState message={error.message} />
        </Card>
      </div>
    );
  }

  if (!cart || cartItems?.length === 0) {
    return (
      <div className="col-span-12">
        <Card className="p-6 min-h-[300px] flex flex-col items-center justify-center gap-4">
          <EmptyState
            icon={<ShoppingBasket className="w-12 h-12 text-gray-400" />}
            message="سبد خرید شما خالی است!"
            description="محصولات مورد علاقه‌تون رو به سبد خرید اضافه کنید و دوباره به این صفحه برگردید."
          />
          <Link
            href="/shop"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300"
          >
            مشاهده محصولات
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <>
      <MobileCartSticky position="bottom">
        <div className="flex justify-between items-center w-full">
          <div className="w-1/2">
            <PrimaryButton onClick={handleNextCartShipping} className="w-full" isLoading={isLoadingContinue}>
              ادامه فرایند خرید
            </PrimaryButton>
          </div>

          <div className="w-1/2 p-2 flex flex-col justify-between items-end">
            <div className="text-xs font-light text-text/70 lg:text-base">جمع سبد خرید</div>
            <div className="text-primary">
              <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(cart.payablePrice)}</span>
              <span className="text-xs font-light lg:text-sm lg:font-medium">تومان</span>
            </div>
          </div>
        </div>
      </MobileCartSticky>

      <div className="col-span-12 md:col-span-8">
        <Card className="p-4 min-h-[300px]">
          <div className="flex items-center justify-between gap-x-2 pb-4">
            <h1 className="flex items-center gap-x-4 text-sm xs:text-base md:text-lg">
              سبد خرید
              <span className="text-sm text-text/60"> ( {cart?.items.length} کالا ) </span>
            </h1>
            <button
              type="button"
              className="btn-red-nobg px-3 py-2 text-sm cursor-pointer flex items-center gap-2"
              onClick={confirmDialogDrawer.onTrue}
            >
              <Trash2 className="h-6 w-6" />
              <span>حذف همه</span>
            </button>
          </div>
          <ul className="divide-y">
            {cart?.items.map((item, index) => (
              <li key={item.id}>
                <CartPageItem cartItem={item} isLast={index === cart?.items.length - 1} />
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <CartSummary
        totalQuantity={totalQuantity}
        payablePrice={cart.payablePrice}
        totalDiscountPrice={cart.totalDiscountPrice}
        totalPrice={cart.totalPrice}
      >
        <PrimaryButton onClick={handleNextCartShipping} className="w-full" isLoading={isLoadingContinue}>
          ادامه فرایند خرید
        </PrimaryButton>
      </CartSummary>

      <ConfirmDialog
        open={confirmDialogDrawer.value}
        isConfirmLoading={isClearOnCart}
        onOpenChange={confirmDialogDrawer.onToggle}
        title="حذف محصول"
        description="آیا مطمئن هستید که می‌خواهید این محصول را حذف کنید؟"
        onConfirm={() => clearAllCartItems()}
      />
    </>
  );
}

export default CartPageView;
