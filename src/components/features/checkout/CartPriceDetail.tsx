'use client';

import React from 'react';
import PrimaryButton from '@/components/ui/PrimaryButton';
import CartSummary from '@/components/features/cart/CartSummary';
import { ShippingItem } from '@/types/shippingType';
import { usePayment } from '@/hooks/reactQuery/payment/usePayment';
import CartMobileFixContainer from '../../ui/CartMobileFixContainer';
import { formatPrice } from '@/utils/formatter';
import { CartState } from '@/types/cartType';

interface CartPriceDetailProps {
  selectedAddressId: number | null;
  selectedShippingItem: ShippingItem | null;
  cart: CartState;
}

export default function CartPriceDetail({ selectedAddressId, selectedShippingItem, cart }: CartPriceDetailProps) {
  const { items: cartItems, payablePrice, totalDiscountPrice, totalPrice } = cart;

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
    <div className="col-span-12 md:col-span-4">
      <>
        <CartMobileFixContainer>
          <div className="flex justify-between items-center w-full">
            <div className="w-1/2 p-3">
              <PrimaryButton type="submit" disabled={isCheckoutDisabled} isLoading={isCreatePaymentLoading} onClick={handleCreatePayment}>
                {isCheckoutDisabled ? 'لطفاً آدرس را انتخاب کنید' : 'پرداخت'}
              </PrimaryButton>
            </div>
            <div className="p-2 flex flex-col justify-between items-center">
              <div className="text-xs font-light text-text/70 lg:text-base">مبلغ قابل پرداخت</div>
              <div className="text-primary">
                <span className="text-base font-semibold lg:text-lg lg:font-bold">{formatPrice(cart.payablePrice + shippingPrice)}</span>
                <span className="text-xs font-light lg:text-sm lg:font-medium"> تومان</span>
              </div>
            </div>
          </div>
        </CartMobileFixContainer>

        <CartSummary
          totalQuantity={totalQuantity}
          payablePrice={payablePrice + shippingPrice}
          totalDiscountPrice={totalDiscountPrice}
          shippingCost={shippingPrice}
          totalPrice={totalPrice}
        >
          <div>
            <PrimaryButton type="submit" disabled={isCheckoutDisabled} isLoading={isCreatePaymentLoading} onClick={handleCreatePayment}>
              {isCheckoutDisabled ? 'لطفاً آدرس را انتخاب کنید' : 'پرداخت'}
            </PrimaryButton>
          </div>
        </CartSummary>
      </>
    </div>
  );
}
