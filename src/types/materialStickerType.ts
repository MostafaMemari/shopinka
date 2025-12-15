import { Pager } from './pagerType';
import { User } from './userType';

export enum SurfaceType {
  MATTE = 'MATTE',
  GLOSSY = 'GLOSSY',
  RAINBOW = 'RAINBOW',
  REFLECTIVE = 'REFLECTIVE',
}

export const surfaceLabelMap: Record<SurfaceType, string> = {
  MATTE: 'مات',
  GLOSSY: 'براق',
  RAINBOW: 'رنگ رنگ',
  REFLECTIVE: 'شب تاب',
};

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
  displayOrder: number;
  isDefault: boolean;
}

export type SortByFontParams = 'createdAt' | 'updatedAt' | 'size' | 'displayOrder' | 'lineHeight' | 'isPersian';
export type SortDirection = 'asc' | 'desc';

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
