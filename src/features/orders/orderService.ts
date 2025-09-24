'use server';

import { ApiResponse, shopApiFetch } from '@/service/api';
import { OrderCountsResponse, OrderItem, OrderParams, OrderResponse } from '@/features/orders/OrderType';

export const getOrders = async ({ params }: { params: OrderParams }): Promise<ApiResponse<OrderResponse>> => {
  return await shopApiFetch('/order/my', { method: 'GET', auth: true, query: { ...params } });
};

export const getCountOrders = async (): Promise<ApiResponse<OrderCountsResponse>> => {
  return await shopApiFetch('/order/my/counts', { method: 'GET', auth: true });
};

export const getOrderById = async (id: number): Promise<ApiResponse<OrderItem>> => {
  return await shopApiFetch(`/order/my/${id}`, { method: 'GET', auth: true });
};
