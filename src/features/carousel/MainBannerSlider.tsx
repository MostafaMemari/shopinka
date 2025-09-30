'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { mainSliderBanners } from '@/data/bannerData';

export default function MainBannerSlider() {
  return (
    <div className="relative mb-8">
      <Swiper
        rewind={true}
        loop={true}
        autoplay={{ delay: 3000 }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.main-banner-pagination',
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Navigation, Pagination, Autoplay]}
        className="banner-slider rounded-lg shadow-base"
      >
        {mainSliderBanners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href={banner.link}>
              <Image
                src={banner.image}
                alt=""
                width={800}
                height={300}
                className="max-h-[300px] w-full object-cover"
                priority={banner.id === 1}
              />
            </Link>
          </SwiperSlide>
        ))}

        <div className="swiper-button-next hidden md:flex"></div>
        <div className="swiper-button-prev hidden md:flex"></div>
        <div className="swiper-pagination main-banner-pagination"></div>
      </Swiper>
    </div>
  );
}
