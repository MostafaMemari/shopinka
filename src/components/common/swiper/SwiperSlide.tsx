'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Image from 'next/image';

const images = ['/banners/banner top 1.webp', '/banners/banner top 2.webp'];

export default function SwiperSlideExample() {
  return (
    <Swiper
      centeredSlides={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="h-[150px] md:h-[300px] w-full rounded-2xl overflow-hidden"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <Image className="object-cover" fill src={img} alt={`Slide ${index + 1}`} style={{ width: '100%', borderRadius: '10px' }} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
