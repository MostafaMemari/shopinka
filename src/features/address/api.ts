import { shopApiFetch } from '@/service/api';
import { AddressFormValues, AddressItem } from '@/features/address/types';
import { pager } from '@/types/paginationType';
import { cleanObject } from '@/utils/cleanObject';

export const createAddress = async (data: AddressFormValues): Promise<{ message: string; address: AddressItem }> => {
  return await shopApiFetch('/address', {
    method: 'POST',
    body: cleanObject({
      ...data,
      buildingNumber: Number(data.buildingNumber),
      unit: data.unit ? Number(data.unit) : undefined,
    }),
  });
};

export const updateAddress = async (id: number, data: AddressFormValues): Promise<{ message: string; address: AddressItem }> => {
  return await shopApiFetch(`/address/${id}`, {
    method: 'PATCH',
    body: cleanObject({
      ...data,
      buildingNumber: data.unit ? Number(data.buildingNumber) : undefined,
      unit: data.unit ? Number(data.unit) : undefined,
    }),
  });
};

export const setDefaultAddress = async (id: number): Promise<{ message: string; address: AddressItem }> => {
  return await shopApiFetch(`/address/${id}/set-default`, {
    method: 'PATCH',
  });
};

export const deleteAddress = async (id: number): Promise<{ message: string }> => {
  return await shopApiFetch(`/address/${id}`, {
    method: 'DELETE',
  });
};

export const getAddress = async (): Promise<{ items: AddressItem[]; pager: pager }> => {
  return await shopApiFetch('/address', { method: 'GET' });
};
