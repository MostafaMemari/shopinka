'use server';

import { type MappedResponseType, ofetch, type FetchOptions } from 'ofetch';
import 'server-only';

import { COOKIE_NAMES } from '@/types/constants';
import { getCookie, setCookie } from '@/utils/cookie';
import { refreshToken } from './refreshToken';

let isRefreshingPromise: Promise<string | null> | null = null;
let pendingRequests: Array<(token: string | null) => void> = []; // برای ذخیره درخواست‌های منتظر

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
        try {
          const retryRes = await api<T, R>(request, { ...options, headers });
          return { success: true, data: retryRes };
        } catch (retryErr: any) {
          return { success: false, status: retryErr?.response?.status || 500, message: retryErr?.message || 'خطای درخواست مجدد' };
        }
      }
    }

    return { success: false, status, message };
  }
}

const getNewAccessToken = async () => {
  // اگر در حال رفرش هستیم، به لیست انتظار اضافه شو
  if (isRefreshingPromise) {
    return new Promise<string | null>((resolve) => {
      pendingRequests.push(resolve);
    });
  }

  isRefreshingPromise = (async () => {
    try {
      const res = await refreshToken();

      if (res.success) {
        const newAccessToken = res?.data?.accessToken;

        if (!newAccessToken) throw new Error('No access token returned');

        await setCookie(COOKIE_NAMES.ACCESS_TOKEN, newAccessToken);

        // پاسخ به تمام درخواست‌های منتظر
        pendingRequests.forEach((resolve) => resolve(newAccessToken));
        pendingRequests = []; // پاک کردن لیست انتظار
        return newAccessToken;
      }

      // در صورت عدم موفقیت رفرش
      pendingRequests.forEach((resolve) => resolve(null));
      pendingRequests = [];
      return null;
    } catch (refreshErr) {
      pendingRequests.forEach((resolve) => resolve(null));
      pendingRequests = [];
      return null;
    } finally {
      isRefreshingPromise = null; // ریست کردن پرامیس
    }
  })();

  return isRefreshingPromise;
};
