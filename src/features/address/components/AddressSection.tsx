'use client';

import React, { useEffect } from 'react';
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

  const addresses = data?.items ?? [];

  useEffect(() => {
    onAddressSelect(addresses.filter((address) => address.isDefault)[0]?.id || null);
  }, [addresses]);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-x-2 pb-4">
        <h3 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
          <MapPin className="h-5 w-5 text-primary" />
          آدرس تحویل سفارش
        </h3>

        <CreateAddressDialogDrawer />
      </div>

      <fieldset className="space-y-4 grid grid-cols-1">
        {isLoading ? (
          Array.from({ length: 2 }, (_, index) => <AddressCardSkeleton key={index} />)
        ) : addresses.length ? (
          addresses.map((item) => <AddressItem key={item.id} item={item} />)
        ) : (
          <p className="text-sm text-gray-500">هیچ آدرسی ثبت نشده است</p>
        )}
      </fieldset>
    </div>
  );
}
