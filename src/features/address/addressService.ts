import { ApiResponse, shopApiFetch } from '@/service/api';
import { AddressFormValues, AddressItem } from '@/features/address/AddressType';
import { pager } from '@/types/paginationType';
import { cleanObject } from '@/utils/cleanObject';

export const createAddress = async (data: AddressFormValues): Promise<ApiResponse<AddressItem>> => {
  return await shopApiFetch('/address', {
    method: 'POST',
    auth: true,
    body: cleanObject({
      ...data,
      buildingNumber: Number(data.buildingNumber),
      unit: data.unit ? Number(data.unit) : undefined,
    }),
  });
};

export const updateAddress = async (id: number, data: AddressFormValues): Promise<ApiResponse<AddressItem>> => {
  return await shopApiFetch(`/address/${id}`, {
    method: 'PATCH',
    auth: true,
    body: cleanObject({
      ...data,
      buildingNumber: Number(data.buildingNumber),
      unit: data.unit ? Number(data.unit) : null,
    }),
  });
};

export const setDefaultAddress = async (id: number): Promise<ApiResponse<AddressItem>> => {
  return await shopApiFetch(`/address/${id}/set-default`, {
    method: 'PATCH',
    auth: true,
  });
};

export const deleteAddress = async (id: number): Promise<ApiResponse<{ message: string }>> => {
  return await shopApiFetch(`/address/${id}`, {
    method: 'DELETE',
    auth: true,
  });
};

export const getAddress = async (): Promise<ApiResponse<{ items: AddressItem[]; pager: pager }>> => {
  return await shopApiFetch('/address', { method: 'GET', auth: true });
};
