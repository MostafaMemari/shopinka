'use server';

import { shopApiFetch } from '@/service/api';
import { User } from '../types/userType';
import { COOKIE_NAMES } from '@/types/constants';
import { getCookie } from '@/utils/cookie';
import { unwrap } from '@/utils/api-helpers';

export const getMe = async (): Promise<User | null> => {
  const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN);

  if (!accessToken) return null;

  const res = await shopApiFetch('/user/me', { method: 'GET' });

  return unwrap(res);
};

export const updateFullName = async (data: { fullName: string }): Promise<{ message: string; user: User }> => {
  const res = await shopApiFetch(`/user/profile`, { method: 'PATCH', body: { ...data } });

  return unwrap(res);
};
