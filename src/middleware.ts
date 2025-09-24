import { NextRequest, NextResponse } from 'next/server';
import { getCookie } from './utils/cookie';
import { COOKIE_NAMES } from './types/constants';
import { refreshToken as refreshTokenResponse } from './service/refreshToken';

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_NAMES.ACCESS_TOKEN)?.value;
  const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

  if (!accessToken && refreshToken) {
    const refreshTokenCookie = await getCookie(COOKIE_NAMES.REFRESH_TOKEN);

    if (refreshTokenCookie) {
      const res = await refreshTokenResponse();

      if (res?.accessToken) {
        const newAccessToken = res.accessToken;
        const expiredTime = Number(process.env.ACCESS_TOKEN_EXPIRE_TIME) || 3600;

        const response = NextResponse.next();

        response.cookies.set(COOKIE_NAMES.ACCESS_TOKEN, newAccessToken, {
          maxAge: expiredTime,
          path: '/',
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
        });

        return response;
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
