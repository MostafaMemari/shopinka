import { BannerItem, BannerParams, BannerResponse } from '@/features/banners/BannerType';
import { shopApiFetch } from '@/service/api';
import { unwrap } from '@/utils/api-helpers';

export const getBanners = async (params: BannerParams): Promise<BannerResponse> => {
  const res = await shopApiFetch('/banner', { method: 'GET', query: { ...params, includeMainImage: true } });

  return unwrap(res);
};

export const getBannerById = async (id: string): Promise<BannerItem> => {
  const res = await shopApiFetch(`/banner/${id}`, { method: 'GET' });

  return unwrap(res);
};
