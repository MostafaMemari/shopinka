'use client';

import React, { useEffect, useState } from 'react';
import { MdOutlineEditLocation } from 'react-icons/md';
import { AddressItem as AddressItemType } from '@/types/addressType';
import CreateAddress from '../profile/Address/CreateAddress';
import AddressItem from './AddressItem';

export interface Option {
  value: string;
  label: string;
}

interface AddressSectionProps {
  onAddressSelect: (id: number | null) => void;
  addresses: AddressItemType[];
}

export default function AddressSection({ onAddressSelect, addresses }: AddressSectionProps) {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [_, setModalState] = useState<boolean>(false);

  useEffect(() => {
    if (addresses.length === 0) {
      setModalState(true);
    } else if (addresses.length > 0 && selectedAddressId === null) {
      setSelectedAddressId(addresses[0].id);
      onAddressSelect(addresses[0].id);
    }
  }, [addresses]);

  const handleSelectAddress = (id: number | null) => {
    setSelectedAddressId(id);
    onAddressSelect(id);
  };

  const handleNewAddressCreated = (newAddress: AddressItemType) => {
    handleSelectAddress(newAddress.id);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between gap-x-2 pb-4">
        <h3 className="flex items-center gap-x-2 text-sm xs:text-base md:text-lg font-medium text-gray-800">
          <MdOutlineEditLocation className="h-5 w-5 text-primary" />
          آدرس تحویل سفارش
        </h3>

        <CreateAddress onAddressCreated={handleNewAddressCreated} />
      </div>

      <fieldset className="space-y-4 grid grid-cols-1">
        {addresses.length ? (
          addresses.map((item) => (
            <AddressItem key={item.id} item={item} selectedAddressId={selectedAddressId} onSelectAddress={handleSelectAddress} />
          ))
        ) : (
          <p className="text-sm text-gray-500">هیچ آدرسی ثبت نشده است.</p>
        )}
      </fieldset>
    </div>
  );
}
