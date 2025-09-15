import { ApiResponse, shopApiFetch } from '@/service/api';
import { pager } from '@/types/paginationType';
import { ShippingItem } from './ShippingType';

export const getShipping = async (): Promise<ApiResponse<{ items: ShippingItem[]; pager: pager }>> => {
  return await shopApiFetch('/shipping', { method: 'GET' });
};
