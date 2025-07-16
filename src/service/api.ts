'use server';

import 'server-only';
import { ofetch } from 'ofetch';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/types/constants';

interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  query?: Record<string, any>;
  body?: any;
  headers?: HeadersInit;
}

interface ApiResponse<T = any> {
  status: number;
  data: T;
}

async function getAccessToken(): Promise<string | undefined> {
  return (await cookies()).get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
}

async function setAuthCookies(accessToken: string, refreshToken?: string) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    path: '/',
    expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000),
  });

  if (refreshToken) {
    cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      path: '/',
      expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000),
    });
  }
}

async function refreshAccessToken(): Promise<ApiResponse> {
  try {
    const response = await ofetch('/auth/refresh-token', {
      baseURL: process.env.API_BASE_URL,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      retry: 0,
    });

    const { accessToken, refreshToken } = response;
    await setAuthCookies(accessToken, refreshToken);

    return { status: 200, data: { message: 'Token refreshed' } };
  } catch (error: any) {
    return {
      status: error?.response?.status ?? 401,
      data: { message: error?.data?.message ?? 'خطا در تمدید توکن' },
    };
  }
}

async function doFetch(path: string, options: FetchOptions, token?: string): Promise<any> {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;

  return ofetch(path, {
    baseURL: process.env.API_BASE_URL,
    method: options.method ?? 'GET',
    query: options.query,
    body: isFormData ? options.body : options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    retry: 0,
  });
}

export const shopApiFetch = async (path: string, options: FetchOptions = {}): Promise<ApiResponse> => {
  const accessToken = await getAccessToken();

  try {
    const data = await doFetch(path, options, accessToken);
    return { status: 200, data };
  } catch (error: any) {
    const status = error?.response?.status ?? 500;

    if (status !== 401) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Shop API Error:', { path, error });
      }

      return { status, data: { message: error?.data?.message ?? 'خطایی رخ داده است' } };
    }

    const refreshResult = await refreshAccessToken();
    if (refreshResult.status !== 200) return refreshResult;

    try {
      const retryData = await doFetch(path, options, await getAccessToken());
      return { status: 200, data: retryData };
    } catch (retryError: any) {
      return {
        status: retryError?.response?.status ?? 500,
        data: {
          message: retryError?.data?.message ?? retryError?.message ?? 'خطای تلاش مجدد',
        },
      };
    }
  }
};
