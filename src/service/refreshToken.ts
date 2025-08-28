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

  const res = await shopApiFetch('/auth/refresh-token', {
    method: 'POST',
    body: { refreshToken },
  });

  if (res.status === 200 || res.status === 201) {
    const { accessToken, refreshToken: newRefreshToken } = res.data;

    await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000),
    });

    await setCookie(COOKIE_NAMES.REFRESH_TOKEN, newRefreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000),
    });
  }

  return res
};
