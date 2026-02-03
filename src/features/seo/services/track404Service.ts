'use server';

import { ApiResponse, shopApiFetch } from '@/service/api';

export type Seo404Payload = {
  path: string;
  referrer?: string;
  userAgent?: string;
};

export const trackSeo404 = async (data: Seo404Payload): Promise<ApiResponse<{ success: boolean }>> => {
  return await shopApiFetch('/seo-404-log', { method: 'POST', body: data });
};
