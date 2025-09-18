'use client';

import React from 'react';
import { useAddress } from '@/features/address/useAddress';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '../ErrorState';
import AddressItem from '../../address/components/AddressCard';
import { CreateAddressDialogDrawer } from '@/features/address/components/CreateAddressDialogDrawer';

export default function AddressSection() {
  const { data, isLoading, error } = useAddress({});

  const addresses = data?.success ? data.data.items : [];

  return (
    <>
      <div className="mb-8 space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : addresses.length === 0 ? (
          <CreateAddressDialogDrawer />
        ) : (
          <fieldset className="space-y-4 grid grid-cols-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {addresses.map((item) => (
                <AddressItem key={item.id} item={item} />
              ))}
              <CreateAddressDialogDrawer />
            </div>
          </fieldset>
        )}
      </div>
    </>
  );
}
