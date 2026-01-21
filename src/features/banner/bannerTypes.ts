export type BannerVariant = 'HERO_SLIDER' | 'ROW_DOUBLE';

export interface BannerType {
  id: string;
  image: string;
  link: string;
  order: number;
  variant: BannerVariant;
  active: boolean;
}
