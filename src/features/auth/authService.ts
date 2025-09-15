'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/types/constants';
import { setCookie } from '@/utils/cookie';
import { getMe } from '../../service/userService';
import { unwrap } from '@/utils/api-helpers';
import { VerifyOtpResponse } from './AuthType';
import { shopApiFetch } from '@/service/api';

export const sendOtp = async (mobile: string): Promise<{ message: string }> => {
  const res = await shopApiFetch('/auth/authenticate', {
    method: 'POST',
    body: {
      mobile,
    },
  });

  return unwrap(res);
};

export const verifyOtp = async ({ mobile, otp }: { mobile: string; otp: string }): Promise<VerifyOtpResponse> => {
  const res = await shopApiFetch('/auth/verify-authenticate-otp', {
    method: 'POST',
    body: { mobile, otp },
  });

  const data = unwrap(res);

  if (data?.accessToken && data?.refreshToken) {
    const { accessToken, refreshToken }: VerifyOtpResponse = data;

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
    ...data,
    user,
  };
};

export const signout = async (): Promise<{ status: number; data: any }> => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  const res = await shopApiFetch('/auth/signout', {
    method: 'POST',
    body: { refreshToken },
  });

  const data = unwrap(res);

  cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_NAMES.REFRESH_TOKEN);

  return {
    ...data,
  };
};
