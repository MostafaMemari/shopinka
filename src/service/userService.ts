'use server';

import { shopApiFetch } from '@/service/api';
import { User } from '../types/userType';
import { COOKIE_NAMES } from '@/types/constants';
import { FavoriteResponse } from '@/features/favorite/type';
import { getCookie } from '@/utils/cookie';

export const getMe = async (): Promise<User> => {
  const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN);

  if (!accessToken) throw new Error('No access or access token found');

  return await shopApiFetch('/user/me', { method: 'GET' });
};

export const getFavorites = async (params: { page?: number; take?: number }): Promise<FavoriteResponse> => {
  return await shopApiFetch('/user/favorites', { method: 'GET', query: { ...params } });
};

export const updateFullName = async (data: { fullName: string }): Promise<{ message: string; user: User }> => {
  return await shopApiFetch(`/user/profile`, { method: 'PATCH', body: { ...data } });
};
