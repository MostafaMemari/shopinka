import { Image } from './imageType';
import { Pager } from './pagerType';

export interface FontItem {
  id: number;
  name: string;
  displayName: string;
  lineHeight: number;
  size: number;
  isPersian: boolean;
  difficultyRatio: number;
  displayOrder: number;

  fileId: number | null;
  file: Image | undefined;

  thumbnailId: number | null;
  thumbnail: Image | undefined;

  isDefault: boolean;
}

export interface FontParams {
  page?: number;
  take?: number;
  includeThumbnail?: boolean;
  includeFile?: boolean;
  sortBy?: SortByFontParams;
  sortDirection?: SortDirection;
}

export type SortByFontParams = 'createdAt' | 'updatedAt' | 'size' | 'displayOrder' | 'lineHeight' | 'isPersian';
export type SortDirection = 'asc' | 'desc';

export interface FontResponse {
  items: FontItem[];
  pager: Pager;
}
