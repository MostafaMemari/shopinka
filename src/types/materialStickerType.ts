import { Pager } from './pagerType';
import { User } from './userType';

export enum SurfaceType {
  MATTE = 'MATTE',
  GLOSSY = 'GLOSSY',
  RAINBOW = 'RAINBOW',
  REFLECTIVE = 'REFLECTIVE',
}

export interface MaterialStickerItem {
  id: number;
  name: string;
  colorCode: string;
  surface: SurfaceType;
  pricePerCM: number | null;
  profitPercent: number;
  backgroundFrom: string;
  backgroundTo: string;
  customStickers?: User | null;
  isDefault: boolean;
}

export interface MaterialStickersParams {
  page?: number;
  take?: number;
  includeThumbnail?: boolean;
  includeFile?: boolean;
}

export interface MaterialStickerResponse {
  items: MaterialStickerItem[];
  pager: Pager;
}
