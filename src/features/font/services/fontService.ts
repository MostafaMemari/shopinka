'use server';

import { ApiResponse, shopApiFetch } from '@/service/api';
import { FontParams, FontResponse } from '@/types/fontType';

export const getFonts = async (params?: FontParams): Promise<ApiResponse<FontResponse>> => {
  return await shopApiFetch(`/font`, {
    auth: true,
    query: { repliesDepth: 1, includeReplies: true, ...params },
  });
};
