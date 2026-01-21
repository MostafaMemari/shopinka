import { useQuery } from '@tanstack/react-query';

import { getBanners } from './bannerServices';

export const useBanners = (variant: string) => {
  return useQuery({
    queryKey: ['banners', variant],
    queryFn: () => getBanners(variant),
  });
};
