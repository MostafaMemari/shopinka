'use server';

import { shopApiFetch } from '@/service/api';
import { GetOrderResponse, OrderCountsResponse, OrderItem, OrderParams, OrderResponse } from '@/types/orderType';

export const getOrders = async ({ params }: { params: OrderParams }): Promise<OrderResponse> => {
  return await shopApiFetch('/order/my', { method: 'GET', query: { ...params } });
};

export const getCountOrders = async (): Promise<OrderCountsResponse> => {
  return await shopApiFetch('/order/my/counts', { method: 'GET' });
};

export const getOrderById = async (id: number): Promise<GetOrderResponse> => {
  return await shopApiFetch(`/order/my/${id}`, { method: 'GET' });
};
