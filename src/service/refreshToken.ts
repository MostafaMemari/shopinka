'use server';

import 'server-only';
import { ApiResponse, shopApiFetch } from '@/service/api';
import { COOKIE_NAMES } from '@/types/constants';
import { getCookie } from '@/utils/cookie';

export const refreshToken = async (): Promise<ApiResponse<{ message: string; accessToken: string }>> => {
  const refreshToken = await getCookie(COOKIE_NAMES.REFRESH_TOKEN);

  if (!refreshToken) return { success: false, status: 401, message: 'No refresh token' };

  return await shopApiFetch('/auth/refresh-token', {
    method: 'POST',
    body: { refreshToken },
  });
};
