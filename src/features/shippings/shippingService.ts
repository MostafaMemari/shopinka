import { shopApiFetch } from '@/service/api';
import { pager } from '@/types/paginationType';
import { ShippingItem } from './ShippingType';
import { unwrap } from '@/utils/api-helpers';

export const getShipping = async (): Promise<{ items: ShippingItem[]; pager: pager }> => {
  const res = await shopApiFetch('/shipping', { method: 'GET' });

  return unwrap(res);
};
