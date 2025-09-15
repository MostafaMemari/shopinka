'use client';

import React from 'react';
import { useAddress } from '@/features/address/useAddress';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import AddressItem from '../../address/components/AddressCard';
import { MapPin } from 'lucide-react';

export default function AddressSection() {
  const { data, isLoading, error } = useAddress({});

  const addresses = data?.items || [];

  return (
    <>
      <div className="mb-8 space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : addresses.length === 0 ? (
          <EmptyState icon={<MapPin className="w-full h-full" />} />
        ) : (
          <fieldset className="grid grid-cols-1 gap-4">
            <div className="space-y-4">{addresses?.map((item) => <AddressItem key={item.id} item={item} />)}</div>
          </fieldset>
        )}
      </div>
    </>
  );
}
