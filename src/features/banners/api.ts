import { BannerItem, BannerParams, BannerResponse } from '@/features/banners/types';
import { shopApiFetch } from '../../service/api';

export const getBanners = async (params: BannerParams): Promise<BannerResponse> => {
  return await shopApiFetch('/banner', { method: 'GET', query: { ...params, includeMainImage: true } });
};

export const getBannerById = async (id: string): Promise<BannerItem> => {
  return await shopApiFetch(`/banner/${id}`, { method: 'GET' });
};
