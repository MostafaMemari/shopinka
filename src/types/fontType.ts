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

  fileId: number | null;
  file: Image | undefined;

  thumbnailId: number | null;
  thumbnail: Image | undefined;
}

export interface FontParams {
  page?: number;
  take?: number;
  includeThumbnail?: boolean;
  includeFile?: boolean;
}

export interface FontResponse {
  items: FontItem[];
  pager: Pager;
}
