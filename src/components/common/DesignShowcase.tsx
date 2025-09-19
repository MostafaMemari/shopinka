'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import type SwiperCore from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const designItems = [
  {
    id: 'instagram-posts',
    title: 'پست اینستاگرام',
    color: 'hsl(215 61% 26%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/b8575d6a-7feb-424d-cd7f-08d9c9c19463/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/b8575d6a-7feb-424d-cd7f-08d9c9c19463/Thumbnail/slider-thumb.png',
  },
  {
    id: 'instagram-stories',
    title: 'استوری اینستاگرام',
    color: 'hsl(41 76% 66%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/f8e71160-cd45-4755-cd80-08d9c9c19463/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/f8e71160-cd45-4755-cd80-08d9c9c19463/Thumbnail/slider-thumb.png',
  },
  {
    id: 'business-cards',
    title: 'کارت ویزیت',
    color: 'hsl(119 45% 46%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/dc823d8e-eca3-4be4-cd7e-08d9c9c19463/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/dc823d8e-eca3-4be4-cd7e-08d9c9c19463/Thumbnail/slider-thumb.png',
  },
  {
    id: 'banners',
    title: 'بنرهای تبلیغاتی',
    color: 'hsl(306 59% 41%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/1924f37e-5eaf-4466-72e7-08d9eaf7b446/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/1924f37e-5eaf-4466-72e7-08d9eaf7b446/Thumbnail/slider-thumb.png',
  },
  {
    id: 'tract',
    title: 'تراکت و فلایر',
    color: 'hsl(10 43% 49%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/f4f5a8c3-1ac6-4782-7d26-08d9eaf8417d/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/f4f5a8c3-1ac6-4782-7d26-08d9eaf8417d/Thumbnail/slider-thumb.png',
  },
  {
    id: 'brochures',
    title: 'بروشور و لیفلت',
    color: 'hsl(163 28% 53%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/8bdefa3c-7290-4a42-7d25-08d9eaf8417d/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/8bdefa3c-7290-4a42-7d25-08d9eaf8417d/Thumbnail/slider-thumb.png',
  },
  {
    id: 'story-highlight',
    title: 'هایلایت استوری',
    color: 'hsl(84 13% 48%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/1bdefa3c-7290-4a42-7d25-08d9eaf8417d/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/1bdefa3c-7290-4a42-7d25-08d9eaf8417d/Thumbnail/slider-thumb.png',
  },
  {
    id: 'booklet',
    title: 'کاتالوگ و بوکلت',
    color: 'hsl(21 14% 53%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/7edefa3c-7290-4a42-7d25-08d9caf8417d/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/7edefa3c-7290-4a42-7d25-08d9caf8417d/Thumbnail/slider-thumb.png',
  },
  {
    id: 'menu',
    title: 'منو و لیست قیمت',
    color: 'hsl(29 66% 53%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/8bdefa3c-7290-4a42-7d25-08d9eaf8416d/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/8bdefa3c-7290-4a42-7d25-08d9eaf8416d/Thumbnail/slider-thumb.png',
  },
  {
    id: 'wedding-card',
    title: 'کارت عروسی',
    color: 'hsl(21 100% 82%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/f9f5f683-d857-474e-b6cd-7a398690235b/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/f9f5f683-d857-474e-b6cd-7a398690235b/Thumbnail/slider-thumb.png',
  },
  {
    id: 'obituary',
    title: 'آگهی ترحیم',
    color: 'hsl(0 0% 36%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/087b7333-fac6-4d0a-97c0-1b6b1e1555f2/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/087b7333-fac6-4d0a-97c0-1b6b1e1555f2/Thumbnail/slider-thumb.png',
  },
  {
    id: 'prescription-form',
    title: 'سرنسخه پزشکی',
    color: 'hsl(230 71% 36%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/734e36d6-8aa6-4f68-abac-e72de97fb6f1/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/734e36d6-8aa6-4f68-abac-e72de97fb6f1/Thumbnail/slider-thumb.png',
  },
  {
    id: 'letterhead',
    title: 'سربرگ',
    color: 'hsl(54 100% 29%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/c8c0ab53-444f-41e0-9b54-fca4e0bd7049/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/c8c0ab53-444f-41e0-9b54-fca4e0bd7049/Thumbnail/slider-thumb.png',
  },
  {
    id: 'certificate',
    title: 'مدرک و سرتیفیکیت',
    color: 'hsl(343 79% 44%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/633b8981-203b-4914-b106-d6e3a84b0175/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/633b8981-203b-4914-b106-d6e3a84b0175/Thumbnail/slider-thumb.png',
  },
  {
    id: 'resume',
    title: 'رزومه',
    color: 'hsl(197 99% 41%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/181fec9f-8ec1-472f-b482-cdcb590f0f4b/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/181fec9f-8ec1-472f-b482-cdcb590f0f4b/Thumbnail/slider-thumb.png',
  },
  {
    id: 'office-set',
    title: 'ست اداری',
    color: 'hsl(100 100% 31%)',
    heroImage: 'https://api.domingo.ir/Files/Industry_Medias/2a5fd56f-2b0f-4517-b100-4382f5f4b1f3/Image/hero.png',
    thumbImage: 'https://api.domingo.ir/Files/Industry_Medias/2a5fd56f-2b0f-4517-b100-4382f5f4b1f3/Thumbnail/slider-thumb.png',
  },
];

export default function DomingoHeroWithSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperCore | null>(null);

  const getInitialSlideIndex = useCallback(() => {
    return 0;
  }, []);

  useEffect(() => {
    setActiveIndex(getInitialSlideIndex());
  }, [getInitialSlideIndex]);

  const handleItemClick = useCallback((index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideToLoop(index, 300);
    }
  }, []);

  const activeItem = designItems[activeIndex] || designItems[0];
  const activeColor = activeItem.color;

  return (
    <Card className="section relative flex flex-col gap-2 items-center justify-center pt-6 pb-4 sm:gap-6" dir="rtl">
      <div className="contents md:flex md:justify-evenly md:w-full md:min-w-[700px]">
        <div className="contents md:flex flex-col items-center justify-center gap-4 basis-1/3">
          <h1 className="text-xl md:text-2xl text-center -order-2">
            طراحی آنلاین با
            <div className="text-3xl font-extrabold inline-block md:block md:mt-2">
              <span className="relative inline-block">
                <strong
                  className="bg-clip-text text-transparent bg-no-repeat bg-gradient-primary bg-gradient-to-r md:text-5xl"
                  style={{
                    background: `linear-gradient(to right, ${activeColor}, ${activeColor})`,
                  }}
                >
                  دومینگو
                </strong>
              </span>
            </div>
          </h1>
          <p className="text-center text-sm sm:leading-6 max-w-[250px]">
            به سرعت و با استفاده از ابزارهای حرفه‌ای، طرح‌هایی الهام‌بخش و خلاقانه ایجاد کنید
          </p>
          <Link className="w-3/5 text-center sm:w-10/12 my-2 sm:my-4 max-w-[200px] sm:max-w-[250px]" href={`/${activeItem.id}`}>
            <Button
              className="inline-flex items-center justify-center whitespace-nowrap text-sm text-primary-foreground hover:bg-primary/90 h-15 rounded-2xl px-8 w-full sm:text-lg font-bold"
              style={{ background: activeColor }}
            >
              طراحی {activeItem.title}
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
              <SwiperSlide
                key={item.id}
                onClick={() => handleItemClick(index)}
                className="!w-[120px] sm:!w-[150px] flex cursor-pointer my-1"
              >
                <Card
                  className={cn(
                    'relative border-2 border-[var(--main-color)] transition-colors duration-300 p-0 overflow-visible',
                    isActive &&
                      'before:absolute before:inset-[-6px] before:rounded-[22px] before:opacity-50 before:content-[""] before:[box-shadow:inset_0_0_11px_11px_var(--light-color)]',
                  )}
                  style={
                    {
                      '--main-color': item.color,
                      '--light-color': item.color,
                    } as React.CSSProperties
                  }
                >
                  <CardContent className="relative flex aspect-[3/4] flex-col items-center overflow-hidden p-1 pt-2">
                    <p className="mb-2 text-center text-sm font-semibold" style={{ color: item.color }}>
                      {item.title}
                    </p>
                    <div className="mt-auto aspect-square w-full rounded-full" style={{ backgroundColor: item.color }} />
                    <Image src={item.thumbImage} alt={item.title} fill className="absolute inset-0 top-[2px] object-cover" />
                  </CardContent>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="hidden sm:flex gap-4 justify-center mt-4">
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
