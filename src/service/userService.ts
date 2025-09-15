'use server';

import { ApiResponse, shopApiFetch } from '@/service/api';
import { User } from '../types/userType';
import { COOKIE_NAMES } from '@/types/constants';
import { getCookie } from '@/utils/cookie';

export const getMe = async (): Promise<ApiResponse<User>> => {
  const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN);

  if (!accessToken) return { success: false, status: 401, message: 'No access token' };

  return await shopApiFetch('/user/me', { method: 'GET' });
};

export const updateFullName = async (data: { fullName: string }): Promise<ApiResponse<{ message: string; user: User }>> => {
  return await shopApiFetch(`/user/profile`, { method: 'PATCH', body: { ...data } });
};
