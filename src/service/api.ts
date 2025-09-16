'use server';

import { type MappedResponseType, ofetch, type FetchOptions } from 'ofetch';
import 'server-only';

import { COOKIE_NAMES } from '@/types/constants';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import { refreshToken } from './refreshToken';

let isRefreshingPromise: Promise<string | null> | null = null;

export type ApiResponse<T> = { success: true; data: T } | { success: false; status: number; message: string };

const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  retry: 0,
  async onRequest({ options }) {
    if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
      const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN);
      if (accessToken) {
        const headers = new Headers(options.headers as HeadersInit);
        headers.set('Authorization', `Bearer ${accessToken}`);
        options.headers = headers;
      }
    }
  },
});

export async function shopApiFetch<T = any, R extends 'json' | 'text' = 'json'>(
  request: RequestInfo,
  options: FetchOptions<R> = {},
): Promise<ApiResponse<MappedResponseType<R, T>>> {
  try {
    const res = await api<T, R>(request, options);

    return { success: true, data: res };
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?._data?.message || err?.message || 'خطای نامعلوم';

    if (status === 401 && message.toLowerCase().includes('expired')) {
      const newAccessToken = await getNewAccessToken();

      if (newAccessToken) {
        const headers = new Headers(options.headers as HeadersInit);
        headers.set('Authorization', `Bearer ${newAccessToken}`);

        const retryRes = await api<T, R>(request, { ...options, headers });
        return { success: true, data: retryRes };
      } else {
        throw new Error('Unauthorized: Unable to refresh token');
      }
    }

    return { success: false, status, message };
  }
}

const getNewAccessToken = async () => {
  if (isRefreshingPromise) return isRefreshingPromise;

  isRefreshingPromise = (async () => {
    try {
      const res = await refreshToken();
      if (res.success) {
        const newAccessToken = res?.data?.accessToken;

        if (!newAccessToken) throw new Error('No access token returned');

        await setCookie(COOKIE_NAMES.ACCESS_TOKEN, newAccessToken);
        return newAccessToken;
      }

      return null;
    } catch (refreshErr) {
      await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN);
      await deleteCookie(COOKIE_NAMES.REFRESH_TOKEN);
      return null;
    } finally {
      isRefreshingPromise = null;
    }
  })();

  return isRefreshingPromise;
};
