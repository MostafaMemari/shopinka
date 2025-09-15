'use server';

import { type MappedResponseType, ofetch, type FetchOptions, type ResponseType } from 'ofetch';
import 'server-only';

import { COOKIE_NAMES } from '@/types/constants';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import { refreshToken } from './refreshToken';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

let isRefreshingPromise: Promise<string | null> | null = null;

const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  retry: 0,
  async onRequest({ options }) {
    const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN);
    if (accessToken) {
      const headers = new Headers(options.headers as HeadersInit);
      headers.set('Authorization', `Bearer ${accessToken}`);
      options.headers = headers;
    }
  },
  // async onResponseError({ response }) {
  //   if (response.status === 401) {
  //   }
  // },
});

export async function shopApiFetch<T = any, R extends 'json' | 'text' = 'json'>(
  request: RequestInfo,
  options: FetchOptions<R> = {},
): Promise<{ success: true; data: MappedResponseType<R, T> } | { success: false; status: number; message: string }> {
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
      const newAccessToken = res?.data?.accessToken;

      if (!newAccessToken) throw new Error('No access token returned');

      await setCookie(COOKIE_NAMES.ACCESS_TOKEN, newAccessToken);
      return newAccessToken;
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

export async function publicApiFetch<T = any>(url: string, options = {}): Promise<T> {
  return await api<T>(url, options);
}
