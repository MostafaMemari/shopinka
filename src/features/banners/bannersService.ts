import { BannerItem, BannerParams, BannerResponse } from '@/features/banners/BannerType';
import { ApiResponse, shopApiFetch } from '@/service/api';

export const getBanners = async (params: BannerParams): Promise<ApiResponse<BannerResponse>> => {
  return await shopApiFetch('/banner', { method: 'GET', query: { ...params, includeMainImage: true } });
};

export const getBannerById = async (id: string): Promise<ApiResponse<BannerItem>> => {
  return await shopApiFetch(`/banner/${id}`, { method: 'GET' });
};
