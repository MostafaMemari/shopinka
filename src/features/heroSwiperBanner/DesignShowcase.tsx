'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { designItems } from './heroItems';
import HeroSwiperCard from './HeroSwiperCard';

export default function DomingoHeroWithSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const getInitialSlideIndex = useCallback(() => {
    return 0;
  }, []);

  useEffect(() => {
    setActiveIndex(getInitialSlideIndex());
  }, [getInitialSlideIndex]);

  const activeItem = designItems[activeIndex] || designItems[0];
  const activeColor = activeItem.color;

  return (
    <Card className="section relative flex flex-col gap-2 items-center justify-center pt-6 pb-4 sm:gap-6" dir="rtl">
      <div className="contents md:flex md:justify-evenly md:w-full md:min-w-[700px]">
        <div className="contents md:flex flex-col items-center justify-center gap-4 basis-1/3">
          <h1 className="text-xl md:text-2xl text-center -order-2">
            <div className="text-3xl font-extrabold inline-block md:block md:mt-2">
              <span className="relative inline-block">
                <strong className="text-3xl md:text-5xl font-extrabold" style={{ color: activeColor }}>
                  {activeItem.title}
                </strong>
              </span>
            </div>
          </h1>
          <p className="text-center text-sm sm:leading-6 max-w-[250px]">همین حالا ماشینت رو خاص کن!</p>
          <Link className="w-3/5 text-center sm:w-10/12 sm:my-4 max-w-[200px] sm:max-w-[250px]" href={`${activeItem.link}`}>
            <Button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm text-primary-foreground hover:bg-primary/90 px-8 w-full sm:text-lg font-bold"
              style={{ background: activeColor }}
            >
              مشاهده برچسب‌ها
            </Button>
          </Link>
        </div>

        <Image
          alt={activeItem.title}
          fetchPriority="high"
          width={512}
          height={512}
          decoding="async"
          className="h-[230px] md:h-[400px] object-contain -order-1 md:order-1 mt-4 md:my-0"
          style={{ color: 'transparent' }}
          src={activeItem.heroImage}
        />
      </div>

      <div className="relative select-none w-full mx-auto mt-6 flex justify-center">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          modules={[Autoplay]}
          autoplay={designItems.length > 1 ? { delay: 4000, disableOnInteraction: false } : false}
          loop={designItems.length > 1}
          centeredSlides={true}
          centeredSlidesBounds={true}
          slidesPerView="auto"
          spaceBetween={12}
          className="flex"
        >
          {designItems.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <SwiperSlide key={item.id} className="!w-[120px] sm:!w-[150px] flex cursor-pointer my-1">
                <Link key={item.id} href={item.link || '/'}>
                  <HeroSwiperCard item={item} isActive={isActive} />
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="hidden sm:flex gap-4 justify-center">
        <Button
          size="icon"
          variant="default"
          onClick={() => swiperRef.current?.slidePrev()}
          className="rounded-full w-10 h-10"
          style={{ background: activeColor }}
        >
          <ChevronRight className="h-5 w-5 text-white" />
        </Button>

        <Button
          size="icon"
          variant="default"
          onClick={() => swiperRef.current?.slideNext()}
          className="rounded-full w-10 h-10"
          style={{ background: activeColor }}
        >
          <ChevronLeft className="h-5 w-5 text-white" />
        </Button>
      </div>
    </Card>
  );
}
