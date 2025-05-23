'use client';
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import Image from 'next/image';

interface Props {
  images: {
    src: string;
    alt: string;
  }[];
}

export default function ProductImageSwiper({ images }: Props) {
  return (
    <div className="swiper product-image-mobile-swiper">
      <Swiper modules={[Pagination]} pagination={{ el: '.swiper-pagination' }} spaceBetween={0} slidesPerView={1} className="w-full">
        {images?.length &&
          images.map((image, index) => (
            <SwiperSlide key={index}>
              <Image src={image.src} alt={image.alt} width={500} height={500} className="mx-auto" loading="lazy" />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="swiper-pagination text-left"></div>
    </div>
  );
}
