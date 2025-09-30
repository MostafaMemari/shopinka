'use client';

import React, { useEffect, useMemo } from 'react';
import AddressItem from './AddressCard';
import { useAddress } from '@/features/address/useAddress';
import { AddressCardSkeleton } from './AddressCardSkeleton';
import { CreateAddressDialogDrawer } from './CreateAddressDialogDrawer';
import { MapPin } from 'lucide-react';

export interface Option {
  value: string;
  label: string;
}

interface AddressSectionProps {
  onAddressSelect: (id: number | null) => void;
}

export default function AddressSection({ onAddressSelect }: AddressSectionProps) {
  const { data, isLoading } = useAddress({});

  const addresses = useMemo(() => {
    return data?.success ? data.data?.items : [];
  }, [data]);

  useEffect(() => {
    onAddressSelect(addresses.find((address) => address.isDefault)?.id || null);
  }, [addresses, onAddressSelect]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-x-2 pb-4">
        <h3 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
          <MapPin className="h-5 w-5 text-primary" />
          آدرس تحویل سفارش
        </h3>
      </div>

      <fieldset className="space-y-4 grid grid-cols-1">
        {isLoading ? (
          Array.from({ length: 2 }, (_, index) => <AddressCardSkeleton key={index} />)
        ) : addresses.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {addresses.map((item) => (
              <AddressItem key={item.id} item={item} />
            ))}
            <CreateAddressDialogDrawer />
          </div>
        ) : (
          <CreateAddressDialogDrawer />
        )}
      </fieldset>
    </div>
  );
}
