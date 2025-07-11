'use client';

import React, { useState } from 'react';
import AddressSection from '@/components/features/checkout/AddressSection';
import DeliverySection from '@/components/features/checkout/DeliverySection';
import CartPriceDetail from '@/components/features/checkout/CartPriceDetail';
import { ShippingItem } from '@/types/shippingType';

function CheckoutPageView() {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [selectedShippingItem, setSelectedShippingItem] = useState<ShippingItem | null>(null);

  return (
    <>
      <div className="col-span-12 md:col-span-8">
        <div className="rounded-lg bg-muted p-4">
          <AddressSection onAddressSelect={setSelectedAddressId} />
          <DeliverySection onShippingSelect={setSelectedShippingItem} />
        </div>
      </div>
      <CartPriceDetail selectedAddressId={selectedAddressId} selectedShippingItem={selectedShippingItem} />
    </>
  );
}

export default CheckoutPageView;
