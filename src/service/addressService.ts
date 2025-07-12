import { shopApiFetch } from '@/service/api';
import { AddressFormType, AddressItem } from '@/types/addressType';
import { pager } from '@/types/paginationType';
import { cleanObject } from '@/utils/cleanObject';

export const createAddress = async (data: AddressFormType): Promise<{ message: string; address: AddressItem }> => {
  const res = await shopApiFetch('/address', {
    method: 'POST',
    body: cleanObject(data),
  });

  if (res.status >= 400 || !res.data?.address) {
    throw new Error(res.data?.message || 'خطا در ایجاد آدرس');
  }

  return res.data;
};

export const updateAddress = async (id: number, data: AddressFormType): Promise<{ message: string; address: AddressItem }> => {
  const res = await shopApiFetch(`/address/${id}`, {
    method: 'PATCH',
    body: cleanObject(data),
  });

  if (res.status >= 400 || !res.data?.address) {
    throw new Error(res.data?.message || 'خطا در ویرایش آدرس');
  }

  return res.data;
};

export const deleteAddress = async (id: number): Promise<{ message: string }> => {
  const res = await shopApiFetch(`/address/${id}`, {
    method: 'DELETE',
  });

  if (res.status >= 400) {
    throw new Error(res.data?.message || 'خطا در حذف آدرس');
  }

  return res.data;
};

export const getAddress = async (): Promise<{
  status: number;
  data: { items: AddressItem[]; pager: pager };
}> => {
  return await shopApiFetch('/address', { method: 'GET' });
};
