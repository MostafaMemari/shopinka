import { COOKIE_NAMES } from '@/types/constants';
import { getCookie } from '@/utils/cookie';
import { ofetch } from 'ofetch';
import { ApiResponse } from './api';

const baseFetch = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  retry: 0,
});

export const refreshToken = async (): Promise<{ message: string; accessToken: string | null }> => {
  const refreshToken = await getCookie(COOKIE_NAMES.REFRESH_TOKEN);

  if (!refreshToken) return { message: 'No refresh token found', accessToken: null };

  return await baseFetch('/auth/refresh-token', {
    method: 'POST',
    body: { refreshToken },
  });
};
