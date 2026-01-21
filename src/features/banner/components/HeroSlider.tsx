'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { useBanners } from '../bannerHooks';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function HeroSlider() {
  const { data } = useBanners('HERO_SLIDER');

  if (!data?.length)
    return (
      <Card className=" p-0 m-0">
        <Skeleton className="h-[150px] md:h-[300px] w-full" />
      </Card>
    );

  return (
    <Card className=" p-0 m-0">
      <Swiper
        centeredSlides
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation
        modules={[Autoplay, Pagination, Navigation]}
        className="h-[150px] md:h-[300px] w-full rounded-2xl overflow-hidden"
      >
        {data.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Image className="object-cover" fill src={banner.image} alt={banner.id} style={{ width: '100%', borderRadius: '10px' }} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Card>
  );
}
