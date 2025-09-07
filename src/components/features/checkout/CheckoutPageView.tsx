'use client';

import React, { useState } from 'react';
import DeliverySection from '@/components/features/checkout/delivery/DeliverySection';
import CartPriceDetail from '@/components/features/checkout/CartPriceDetail';
import { ShippingItem } from '@/types/shippingType';
import { useAppSelector } from '@/store/hooks';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import { useIsMounted } from '@/hooks/useIsMounted';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '../profile/EmptyState';
import { PiBasketFill } from 'react-icons/pi';
import Link from 'next/link';
import AddressSection from '../address/AddressSection';

function CheckoutPageView() {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedShippingItem, setSelectedShippingItem] = useState<ShippingItem | null>(null);

  const { cart, isLoading: isLoadingCart } = useCart();
  const cartItems = cart?.items || [];

  const isMounted = useIsMounted();

  if (!isMounted || isLoadingCart) {
    return (
      <div className="col-span-12">
        <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!cart || cartItems.length === 0) {
    return (
      <div className="col-span-12">
        <div className="rounded-lg bg-muted p-6 min-h-[300px] flex flex-col items-center justify-center gap-4">
          <EmptyState
            icon={<PiBasketFill className="w-12 h-12 text-gray-400" />}
            message="سبد خرید شما خالی است!"
            description="محصولات مورد علاقه‌تون رو به سبد خرید اضافه کنید و دوباره به این صفحه برگردید."
          />
          <Link
            href="/shop"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300"
          >
            مشاهده محصولات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="col-span-12 md:col-span-8">
        <div className="rounded-lg bg-muted p-4">
          <AddressSection onAddressSelect={setSelectedAddressId} />
          <DeliverySection onShippingSelect={setSelectedShippingItem} />
        </div>
      </div>

      <CartPriceDetail cart={cart} selectedAddressId={selectedAddressId} selectedShippingItem={selectedShippingItem} />
    </>
  );
}

export default CheckoutPageView;
