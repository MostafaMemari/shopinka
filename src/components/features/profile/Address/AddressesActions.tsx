'use client';

import React, { useState } from 'react';
import { useAddress } from '@/hooks/address/useAddress';
// import AddressItem from './AddressItem';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import ErrorState from '../ErrorState';
import EmptyState from '../EmptyState';
import { GrLocation } from 'react-icons/gr';
import AddressItem from '../../address/AddressCard';

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
          <EmptyState icon={<GrLocation className="w-full h-full" />} />
        ) : (
          <fieldset className="grid grid-cols-1 gap-4">
            <div className="space-y-4">{addresses?.map((item) => <AddressItem key={item.id} item={item} />)}</div>
          </fieldset>
        )}
      </div>
    </>
  );
}
