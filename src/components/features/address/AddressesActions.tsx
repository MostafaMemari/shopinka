'use client';

import { useAddress } from '@/hooks/address/useAddress';
import AddressItem from './AddressCard';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { GrLocation } from 'react-icons/gr';
import ErrorState from '../profile/ErrorState';
import EmptyState from '../profile/EmptyState';

export default function AddressSection() {
  const { data, isLoading, error } = useAddress({});

  const addresses = data?.data.items || [];

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
