import { BannerType } from './bannerTypes';

const MOCK_BANNERS: BannerType[] = [
  {
    id: '1',
    image: '/banners/banner top 1.webp',
    link: '/sticker-maker',
    order: 1,
    variant: 'HERO_SLIDER',
    active: true,
  },
  {
    id: '2',
    image: '/banners/banner top 2.webp',
    link: '/shop',
    order: 2,
    variant: 'HERO_SLIDER',
    active: true,
  },
  {
    id: '3',
    image: '/banners/banner right.webp',
    link: '/sticker-maker',
    order: 1,
    variant: 'ROW_DOUBLE',
    active: true,
  },
  {
    id: '4',
    image: '/banners/banner left.webp',
    link: '/shop',
    order: 2,
    variant: 'ROW_DOUBLE',
    active: true,
  },
];

export const getBanners = async (variant: string) => {
  return MOCK_BANNERS.filter((b) => b.variant === variant && b.active).sort((a, b) => a.order - b.order);
};
