'use server';

import { ofetch, type FetchOptions, type FetchResponse, type ResponseType, type MappedResponseType } from 'ofetch';
import 'server-only';

import { COOKIE_NAMES } from '@/types/constants';
import { deleteCookie, getCookie, setCookie } from '@/utils/cookie';
import { refreshToken } from './refreshToken';

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
  async onResponseError({ response }) {
    if (response.status === 401) {
      console.error('Unauthorized response. Attempting to refresh token...');
    }
  },
});

const getNewAccessToken = async () => {
  if (isRefreshingPromise) {
    return isRefreshingPromise;
  }

  isRefreshingPromise = (async () => {
    try {
      const res = await refreshToken();
      const newAccessToken = res?.data?.accessToken;

      if (!newAccessToken) {
        throw new Error('No access token returned');
      }

      await setCookie(COOKIE_NAMES.ACCESS_TOKEN, newAccessToken);
      return newAccessToken;
    } catch (refreshErr) {
      await deleteCookie(COOKIE_NAMES.ACCESS_TOKEN);
      await deleteCookie(COOKIE_NAMES.REFRESH_TOKEN);
      console.error('Failed to refresh token', refreshErr);
      return null;
    } finally {
      isRefreshingPromise = null;
    }
  })();

  return isRefreshingPromise;
};

export async function shopApiFetch<T = any, R extends ResponseType = 'json'>(
  request: RequestInfo,
  options: FetchOptions<R> = {},
): Promise<MappedResponseType<R, T>> {
  try {
    return await api<T, R>(request, options);
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?._data?.message;

    if (status === 401 && message?.toLowerCase().includes('expired')) {
      const newAccessToken = await getNewAccessToken();

      if (newAccessToken) {
        const headers = new Headers(options.headers as HeadersInit);
        headers.set('Authorization', `Bearer ${newAccessToken}`);

        return await api<T, R>(request, {
          ...options,
          headers,
        });
      } else {
        throw new Error('Unauthorized: Unable to refresh token');
      }
    }

    throw err;
  }
}
