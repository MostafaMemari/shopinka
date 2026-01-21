'use client';

import { useBanners } from '../bannerHooks';
import BannerCard from './BannerCard';

export default function BannerRow() {
  const { data } = useBanners('ROW_DOUBLE');

  if (!data?.length) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {data.slice(0, 2).map((banner) => (
        <BannerCard key={banner.id} banner={banner} />
      ))}
    </div>
  );
}
