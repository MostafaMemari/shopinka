'use server';

import { type MappedResponseType, ofetch, type FetchOptions } from 'ofetch';
import 'server-only';

import { COOKIE_NAMES } from '@/types/constants';
import { getCookie } from '@/utils/cookie';
import { refreshToken } from './refreshToken';

export type ApiResponse<T> = { success: true; data: T } | { success: false; status: number; message: string };

type ExtraOptions = {
  revalidate?: string | string[] | boolean;
  cache?: number;
  auth?: boolean;
};

const api = ofetch.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  retry: 0,
  async onRequest({ options }) {
    if (typeof window === 'undefined' && process.env.NEXT_PHASE !== 'phase-production-build') {
      const extra = options as FetchOptions & ExtraOptions;
      if (extra.auth) {
        const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN);
        if (accessToken) {
          const headers = new Headers(options.headers as HeadersInit);
          headers.set('Authorization', `Bearer ${accessToken}`);
          options.headers = headers;
        }
      }
    }
  },
});

export async function shopApiFetch<T = any, R extends 'json' | 'text' = 'json'>(
  request: RequestInfo,
  options: FetchOptions<R> & ExtraOptions = {},
): Promise<ApiResponse<MappedResponseType<R, T>>> {
  try {
    const { revalidate, cache, auth, ...restOptions } = options;

    if (revalidate !== undefined) {
      (restOptions as any).next = { revalidate };
    }

    if (cache !== undefined) {
      const headers = new Headers(restOptions.headers as HeadersInit);
      headers.set('Cache-Control', `s-maxage=${cache}`);
      restOptions.headers = headers;
    }

    if (auth) {
      const accessToken = await getCookie(COOKIE_NAMES.ACCESS_TOKEN);
      if (accessToken) {
        const headers = new Headers(restOptions.headers as HeadersInit);
        headers.set('Authorization', `Bearer ${accessToken}`);
        restOptions.headers = headers;
      }
    }

    const res = await api<T, R>(request, restOptions);
    return { success: true, data: res };
  } catch (err: any) {
    const status = err?.response?.status;
    const message = err?.response?._data?.message || err?.message || 'خطای نامعلوم';

    if (status === 401 && message.toLowerCase().includes('expired')) {
      const res = await refreshToken();

      if (res.accessToken) {
        const newAccessToken = res?.accessToken;

        if (newAccessToken) {
          const headers = new Headers(options.headers as HeadersInit);
          headers.set('Authorization', `Bearer ${newAccessToken}`);
          try {
            const retryRes = await api<T, R>(request, { ...options, headers });
            return { success: true, data: retryRes };
          } catch (retryErr: any) {
            return {
              success: false,
              status: retryErr?.response?.status || 500,
              message: retryErr?.message || 'خطای درخواست مجدد',
            };
          }
        }
      }
    }

    return { success: false, status, message };
  }
}
