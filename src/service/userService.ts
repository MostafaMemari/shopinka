'use server';

import { shopApiFetch } from '@/service/api';
import { User } from '../types/userType';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/types/constants';
import { FavoriteResponse } from '@/types/favoriteType';

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;

  if (!accessToken) {
    throw new Error('No access or refresh token found');
  }

  return await shopApiFetch('/user/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};

export const getFavorites = async (params: { page?: number; take?: number }): Promise<FavoriteResponse> => {
  return await shopApiFetch('/user/favorites', { method: 'GET', query: { ...params } });
};

export const updateFullName = async (data: { fullName: string }): Promise<{ message: string; user: User }> => {
  return await shopApiFetch(`/user/profile`, { method: 'PATCH', body: { ...data } });
};
