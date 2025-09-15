'use server';

import { shopApiFetch } from '@/service/api';
import { OrderCountsResponse, OrderItem, OrderParams, OrderResponse } from '@/features/orders/OrderType';
import { unwrap } from '@/utils/api-helpers';

export const getOrders = async ({ params }: { params: OrderParams }): Promise<OrderResponse> => {
  const res = await shopApiFetch('/order/my', { method: 'GET', query: { ...params } });

  return unwrap(res);
};

export const getCountOrders = async (): Promise<OrderCountsResponse> => {
  const res = await shopApiFetch('/order/my/counts', { method: 'GET' });

  return unwrap(res);
};

export const getOrderById = async (id: number): Promise<OrderItem> => {
  const res = await shopApiFetch(`/order/my/${id}`, { method: 'GET' });

  return unwrap(res);
};
