'use client';

import React, { useState } from 'react';
import DeliverySection from '@/features/checkout/components/delivery/DeliverySection';
import CartPriceDetail from '@/features/checkout/components/CartPriceDetail';
import { ShippingItem } from '@/features/shippings/types';
import { useIsMounted } from '@/hooks/useIsMounted';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import EmptyState from '../../profile/EmptyState';
import Link from 'next/link';
import AddressSection from '../../address/components/AddressSection';
import { useCart } from '@/features/cart/hooks/useCart';
import { ShoppingBasket } from 'lucide-react';
import { Card } from '@/components/ui/card';

function CheckoutPageView() {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedShippingItem, setSelectedShippingItem] = useState<ShippingItem | null>(null);

  const { cart, isLoading: isLoadingCart } = useCart();
  const cartItems = cart?.items || [];

  const isMounted = useIsMounted();

  if (!isMounted || isLoadingCart) {
    return (
      <div className="col-span-12">
        <Card className="min-h-[300px] flex items-center justify-center">
          <LoadingSpinner />
        </Card>
      </div>
    );
  }

  if (!cart || cartItems.length === 0) {
    return (
      <div className="col-span-12">
        <Card className="p-4 min-h-[300px] flex flex-col items-center justify-center gap-4">
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
      <div className="col-span-12 md:col-span-8">
        <Card className="p-4">
          <AddressSection onAddressSelect={setSelectedAddressId} />
          <DeliverySection onShippingSelect={setSelectedShippingItem} />
        </Card>
      </div>

      <CartPriceDetail cart={cart} selectedAddressId={selectedAddressId} selectedShippingItem={selectedShippingItem} />
    </>
  );
}

export default CheckoutPageView;
