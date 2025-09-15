import { shopApiFetch } from '@/service/api';
import { AddressFormValues, AddressItem } from '@/features/address/AddressType';
import { pager } from '@/types/paginationType';
import { cleanObject } from '@/utils/cleanObject';
import { unwrap } from '@/utils/api-helpers';

export const createAddress = async (data: AddressFormValues): Promise<{ message: string; address: AddressItem }> => {
  const res = await shopApiFetch('/address', {
    method: 'POST',
    body: cleanObject({
      ...data,
      buildingNumber: Number(data.buildingNumber),
      unit: data.unit ? Number(data.unit) : undefined,
    }),
  });

  return unwrap(res);
};

export const updateAddress = async (id: number, data: AddressFormValues): Promise<{ message: string; address: AddressItem }> => {
  const res = await shopApiFetch(`/address/${id}`, {
    method: 'PATCH',
    body: cleanObject({
      ...data,
      buildingNumber: data.unit ? Number(data.buildingNumber) : undefined,
      unit: data.unit ? Number(data.unit) : undefined,
    }),
  });

  return unwrap(res);
};

export const setDefaultAddress = async (id: number): Promise<{ message: string; address: AddressItem }> => {
  const res = await shopApiFetch(`/address/${id}/set-default`, {
    method: 'PATCH',
  });

  return unwrap(res);
};

export const deleteAddress = async (id: number): Promise<{ message: string }> => {
  const res = await shopApiFetch(`/address/${id}`, {
    method: 'DELETE',
  });

  return unwrap(res);
};

export const getAddress = async (): Promise<{ items: AddressItem[]; pager: pager }> => {
  const res = await shopApiFetch('/address', { method: 'GET' });

  return unwrap(res);
};
