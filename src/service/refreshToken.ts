'use server';

import 'server-only';
import { shopApiFetch } from '@/service/api';
import { COOKIE_NAMES } from '@/types/constants';
import { getCookie, setCookie } from '@/utils/cookie';

export const refreshToken = async (): Promise<{ status: number; data: any }> => {
  const refreshToken = await getCookie(COOKIE_NAMES.REFRESH_TOKEN);

  if (!refreshToken) {
    return { status: 401, data: { message: 'No refresh token' } };
  }

  const { accessToken } = await shopApiFetch('/auth/refresh-token', {
    method: 'POST',
    body: { refreshToken },
  });

  // if (accessToken) {
  //   await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
  //     httpOnly: true,
  //     expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000),
  //   });

  // } else {
  //   return { status: 401, data: { message: 'Failed to refresh token' } };
  // }

  return { status: 200, data: { accessToken } };
};
