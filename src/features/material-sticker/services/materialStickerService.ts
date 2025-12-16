'use server';

import { ApiResponse, shopApiFetch } from '@/service/api';
import { MaterialStickerResponse, MaterialStickersParams } from '@/types/materialStickerType';

export const getMaterialSticker = async (params?: MaterialStickersParams): Promise<ApiResponse<MaterialStickerResponse>> => {
  return await shopApiFetch(`/material-sticker`, {
    auth: true,
    query: { repliesDepth: 1, includeReplies: true, ...params },
  });
};
