'use client';

import React, { useState } from 'react';
import AddressSection from '@/components/features/checkout/AddressSection';
import DeliverySection from '@/components/features/checkout/DeliverySection';
import CartPriceDetail from '@/components/features/checkout/CartPriceDetail';
import { ShippingItem } from '@/types/shippingType';
import { useAddress } from '@/hooks/reactQuery/address/useAddress';
import { useShipping } from '@/hooks/reactQuery/useShipping';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import { useIsMounted } from '@/hooks/useIsMounted';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorState from '../profile/ErrorState';
import EmptyState from '../profile/EmptyState';
import { PiBasketFill } from 'react-icons/pi';
import Link from 'next/link';

function CheckoutPageView() {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedShippingItem, setSelectedShippingItem] = useState<ShippingItem | null>(null);

  const { isLogin } = useAuth();
  const { cart, isLoading: isLoadingCart } = useCart(isLogin);
  const isMounted = useIsMounted();

  const { data: addresses, isLoading: isLoadingAddresses, error: errorAddresses } = useAddress({});
  const { data: shippings, isLoading: isLoadingShippings, error: errorShippings } = useShipping({});

  return (
    <>
      {!isMounted || isLoadingCart || isLoadingAddresses || isLoadingShippings ? (
        <div className="col-span-12">
          <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        </div>
      ) : errorAddresses || errorShippings ? (
        <div className="col-span-12">
          <div className="rounded-lg bg-muted p-4 min-h-[300px] flex items-center justify-center">
            <ErrorState message={errorAddresses?.message || errorShippings?.message} />
          </div>
        </div>
      ) : cart.items.length === 0 ? (
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
      ) : (
        <>
          <div className="col-span-12 md:col-span-8">
            <div className="rounded-lg bg-muted p-4">
              <AddressSection addresses={addresses?.data.items ?? []} onAddressSelect={setSelectedAddressId} />
              <DeliverySection shippings={shippings?.data.items ?? []} onShippingSelect={setSelectedShippingItem} />
            </div>
          </div>
          <CartPriceDetail cart={cart} selectedAddressId={selectedAddressId} selectedShippingItem={selectedShippingItem} />
        </>
      )}
    </>
  );
}

export default CheckoutPageView;
