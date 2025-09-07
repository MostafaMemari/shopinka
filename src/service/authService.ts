'use server';

import 'server-only';
import { cookies } from 'next/headers';
import { shopApiFetch } from '@/service/api';
import { COOKIE_NAMES } from '@/types/constants';
import { setCookie } from '@/utils/cookie';
import { getMe } from './userService';
import { User } from '@/types/userType';

export const sendOtp = async (mobile: string): Promise<{ message: string }> => {
  return await shopApiFetch('/auth/authenticate', {
    method: 'POST',
    body: {
      mobile,
    },
  });
};

interface VerifyOtpResponse {
  accessToken: string;
  refreshToken: string;
}

export const verifyOtp = async ({
  mobile,
  otp,
}: {
  mobile: string;
  otp: string;
}): Promise<{ accessToken: string; refreshToken: string; message: string; user: User }> => {
  const res = await shopApiFetch('/auth/verify-authenticate-otp', {
    method: 'POST',
    body: { mobile, otp },
  });

  if (res?.accessToken && res?.refreshToken) {
    const { accessToken, refreshToken }: VerifyOtpResponse = res;

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

  cookieStore.delete(COOKIE_NAMES.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_NAMES.REFRESH_TOKEN);

  return {
    ...res,
  };
};
