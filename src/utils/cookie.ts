import { cookies } from 'next/headers';

export async function getCookie(key: string): Promise<string | undefined> {
  const cookieStore = await cookies();

  return cookieStore.get(key)?.value;
}

export async function setCookie(key: string, value: string, options?: CookieOptions) {
  const cookieStore = await cookies();

  cookieStore.set(key, value, {
    path: '/',
    ...options,
  });
}

export async function deleteCookie(key: string) {
  const cookieStore = await cookies();

  cookieStore.delete(key);
}

interface CookieOptions {
  path?: string;
  httpOnly?: boolean;
  secure?: boolean;
  maxAge?: number;
  expires?: Date;
  sameSite?: 'strict' | 'lax' | 'none';
}
