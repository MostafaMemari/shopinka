import { ApiResponse, shopApiFetch } from '@/service/api';
import { FavoriteResponse } from './FavoriteType';

export const getFavorites = async (params: { page?: number; take?: number }): Promise<ApiResponse<FavoriteResponse>> => {
  return await shopApiFetch('/user/favorites', { method: 'GET', auth: true, query: { ...params } });
};

export async function isFavorite(productId: number): Promise<ApiResponse<boolean>> {
  const res = await shopApiFetch(`/product/${productId}/favorite`, { method: 'GET', auth: true });

  if (res.success) {
    return {
      ...res,
      data: res.data === 'true' ? true : false,
    };
  }

  return res;
}

export async function favoriteToggle(productId: number) {
  return await shopApiFetch(`/product/favorite-toggle/${productId}`, { method: 'PATCH', auth: true });
}
