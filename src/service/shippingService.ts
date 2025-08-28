import { shopApiFetch } from '@/service/api';
import { pager } from '@/types/paginationType';
import { ShippingItem } from '../types/shippingType';

export const getShipping = async (): Promise<{ status: number; data: { items: ShippingItem[]; pager: pager } }> => {
  return await shopApiFetch('/shipping', { method: 'GET' });
};
