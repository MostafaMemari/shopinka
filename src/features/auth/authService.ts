'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/types/constants';
import { setCookie } from '@/utils/cookie';
import { getMe } from '../../service/userService';
import { VerifyOtpResponse } from './AuthType';
import { ApiResponse, shopApiFetch } from '@/service/api';

export const sendOtp = async (mobile: string): Promise<ApiResponse<{ message: string }>> => {
  return await shopApiFetch('/auth/authenticate', {
    method: 'POST',
    auth: false,
    body: {
      mobile,
    },
  });
};

export const verifyOtp = async ({ mobile, otp }: { mobile: string; otp: string }): Promise<ApiResponse<VerifyOtpResponse>> => {
  const res = await shopApiFetch('/auth/verify-authenticate-otp', {
    method: 'POST',
    auth: false,
    body: { mobile, otp },
  });

  if (res.success) {
    if (res.data?.accessToken && res.data?.refreshToken) {
      const { accessToken, refreshToken }: VerifyOtpResponse = res.data;

      await setCookie(COOKIE_NAMES.ACCESS_TOKEN, accessToken, {
        httpOnly: true,
        expires: new Date(Date.now() + Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) * 1000),
      });

      await setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
        httpOnly: true,
        expires: new Date(Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRE_TIME) * 1000),
      });
    }

    const user = await getMe();

    return {
      ...res,
      data: {
        ...res.data,
        user: user.success ? user.data : undefined,
      },
    };
  }

  return res;
};

export const signout = async (): Promise<ApiResponse<{ status: number; data: any }>> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  const res = await shopApiFetch('/auth/signout', {
    method: 'POST',
    body: { refreshToken },
  });

  if (res.success) {
    cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN);
    cookieStore.delete(COOKIE_NAMES.REFRESH_TOKEN);

    return {
      ...res.data,
    };
  }
  return res;
};
