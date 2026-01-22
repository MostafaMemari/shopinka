'use client';

import React from 'react';
import PrimaryButton from '@/components/common/PrimaryButton';
import CartSummary from '@/features/cart/components/CartSummary';
import { ShippingItem } from '@/features/shippings/ShippingType';
import { usePayment } from '@/features/payment/hooks/usePayment';
import MobileCartSticky from '@/components/common/MobileCartSticky';

import { CartState } from '@/features/cart/cartType';
import TomanIcon from '@/components/common/svg/TomanIcon';
import useIsMdUp from '@/hooks/useIsMdUp';
import { formatPrice } from '@/lib/utils';

interface CheckoutCartPriceDetailProps {
  selectedAddressId: number | null;
  selectedShippingItem: ShippingItem | null;
  cart: CartState;
}

export default function CheckoutCartPriceDetail({ selectedAddressId, selectedShippingItem, cart }: CheckoutCartPriceDetailProps) {
  const { items: cartItems, payablePrice, totalDiscountPrice, totalPrice } = cart;
  const isMdUp = useIsMdUp();

  const totalQuantity = cartItems?.reduce((sum, item) => sum + item.count, 0) || 0;
  const isCheckoutDisabled = !selectedAddressId;
  const shippingPrice = selectedShippingItem?.price ?? 0;

  const { createPayment, isCreatePaymentLoading } = usePayment();

  const handleCreatePayment = () => {
    createPayment(
      {
        addressId: selectedAddressId ?? 0,
        shippingId: selectedShippingItem?.id ?? 0,
        description: `پرداخت برای ${totalQuantity} کالا با هزینه ارسال ${shippingPrice.toLocaleString()} تومان`,
      },
      () => {},
    );
  };

  return (
    <>
      <MobileCartSticky>
        <div className="flex justify-between items-center w-full mx-3">
          <div className="w-1/2">
            <PrimaryButton
              onClick={handleCreatePayment}
              disabled={isCheckoutDisabled}
              isLoading={isCreatePaymentLoading}
              className="w-full"
            >
              {isCheckoutDisabled ? 'لطفاً آدرس را انتخاب کنید' : 'پرداخت'}
            </PrimaryButton>
          </div>

          <div className="w-1/2 p-2 flex flex-col justify-between items-end">
            <div className="text-xs font-light text-text/70 lg:text-base">مبلغ قابل پرداخت</div>
            <div className="text-primary flex items-center gap-1">
              <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(cart.payablePrice + shippingPrice)}</span>
              <TomanIcon className="w-4 h-4" />
            </div>
          </div>
        </div>
      </MobileCartSticky>

      <div className="flex flex-col gap-4">
        <CartSummary
          totalQuantity={totalQuantity}
          totalDiscountPrice={totalDiscountPrice}
          shippingPrice={shippingPrice}
          totalPrice={totalPrice}
        />

        <CartSummary payablePrice={payablePrice + shippingPrice}>
          {isMdUp && (
            <PrimaryButton
              type="submit"
              className="w-full"
              disabled={isCheckoutDisabled}
              isLoading={isCreatePaymentLoading}
              onClick={handleCreatePayment}
            >
              {isCheckoutDisabled ? 'لطفاً آدرس را انتخاب کنید' : 'پرداخت'}
            </PrimaryButton>
          )}
        </CartSummary>
      </div>
    </>
  );
}
