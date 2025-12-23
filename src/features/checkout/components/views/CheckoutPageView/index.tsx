'use client';

import React, { useState } from 'react';
import { ShippingItem } from '@/features/shippings/ShippingType';
import { useIsMounted } from '@/hooks/useIsMounted';
import { useCart } from '@/features/cart/hooks/useCart';

import CheckoutLoadingState from './CheckoutLoadingState';
import CheckoutEmptyState from './CheckoutEmptyState';
import CheckoutMainSection from './CheckoutMainSection';
import CheckoutSidebar from './CheckoutSidebar';

function CheckoutPageView() {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedShippingItem, setSelectedShippingItem] = useState<ShippingItem | null>(null);

  const { cart, isLoading } = useCart();
  const isMounted = useIsMounted();

  if (!isMounted || isLoading) return <CheckoutLoadingState />;
  if (!cart || cart.items.length === 0) return <CheckoutEmptyState />;

  return (
    <>
      <CheckoutMainSection onAddressSelect={setSelectedAddressId} onShippingSelect={setSelectedShippingItem} />

      <CheckoutSidebar cart={cart} selectedAddressId={selectedAddressId} selectedShippingItem={selectedShippingItem} />
    </>
  );
}

export default CheckoutPageView;
