import { shopApiFetch } from '@/service/api';
import { FavoriteResponse } from './FavoriteType';
import { unwrap } from '@/utils/api-helpers';

export const getFavorites = async (params: { page?: number; take?: number }): Promise<FavoriteResponse> => {
  const res = await shopApiFetch('/user/favorites', { method: 'GET', query: { ...params } });

  return unwrap(res);
};

export async function isFavorite(productId: number): Promise<boolean> {
  const res = await shopApiFetch(`/product/${productId}/favorite`);

  return unwrap(res) === 'true' ? true : false;
}

export async function favoriteToggle(productId: number) {
  const res = await shopApiFetch(`/product/favorite-toggle/${productId}`, { method: 'Patch' });

  return unwrap(res);
}
