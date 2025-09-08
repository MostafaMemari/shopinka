import { Image } from '../../types/imageType';
import { Pager } from '../../types/pagerType';

export type BannerItem = {
  id: string;
  link: string;
  type: 'MAIN_SLIDER' | 'SIDE';
  image: Image;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface BannerParams {
  page?: number;
  take?: number;
  name?: string;

  isActive?: boolean;
  includeImage?: boolean;
  type?: 'MAIN_SLIDER' | 'SIDE';
}

export interface BannerResponse {
  pager: Pager;
  items: BannerItem[];
}
