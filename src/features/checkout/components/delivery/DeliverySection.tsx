'use client';

import React, { useState, useEffect } from 'react';
import { ShippingItem } from '@/features/shippings/ShippingType';
import DeliveryItem from './DeliveryItem';
import { Truck } from 'lucide-react';
import { useShipping } from '@/features/shippings/useShipping';
import { ShippingCardSkeleton } from './ShippingCardSkeleton';

interface DeliverySectionProps {
  onShippingSelect: (shippingSelectedItem: ShippingItem | null) => void;
}

export default function DeliverySection({ onShippingSelect }: DeliverySectionProps) {
  const { data, isLoading } = useShipping({});

  const shippings = data?.success ? data.data.items : [];

  const [selected, setSelected] = useState<string | number | null>(null);

  useEffect(() => {
    if (shippings.length && selected === null) {
      const firstItem = shippings[0];
      setSelected(firstItem.id);
      onShippingSelect(firstItem);
    }
  }, [shippings, selected, onShippingSelect]);

  return (
    <>
      <div className="flex items-center justify-between gap-x-2 pb-4">
        <h2 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
          <Truck className="h-5 w-5 text-primary" />
          شیوه ارسال
        </h2>
      </div>

      <fieldset className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 2 }, (_, index) => <ShippingCardSkeleton key={index} />)
          : shippings.map((item) => {
              return (
                <DeliveryItem key={item.id} item={item} selected={selected} setSelected={setSelected} onShippingSelect={onShippingSelect} />
              );
            })}
      </fieldset>
    </>
  );
}
