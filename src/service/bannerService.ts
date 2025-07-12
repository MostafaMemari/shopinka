import { BannerItem, BannerParams, BannerResponse } from '@/types/bannerType';
import { shopApiFetch } from './api';

export const getBanners = async (params: BannerParams): Promise<BannerResponse> => {
  const res = await shopApiFetch('/banner', { method: 'GET', query: { ...params, includeMainImage: true } });

  return {
    ...res.data,
  };
};

export const getBannerById = async (id: string): Promise<BannerItem> => {
  const res = await shopApiFetch(`/banner/${id}`, { method: 'GET' });

  return {
    ...res.data,
  };
};
