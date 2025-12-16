import { ApiResponse, shopApiFetch } from '@/service/api';

export interface CustomStickerPricingData {
  fontId: number;
  materialId: number;
  lines: {
    lineNumber: number;
    width: number;
    height: number;
  }[];
}

export const customStickerPricing = async (data: CustomStickerPricingData): Promise<ApiResponse<{ message: string; pricing: number }>> => {
  return await shopApiFetch('/custom-sticker/pricing', { method: 'POST', auth: true, body: { ...data } });
};
