'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { BannerItem } from '@/types/bannerType';

interface BannerSliderProps {
  mainSliderBanners: BannerItem[];
  sideBanners: BannerItem[];
}

export default function BannerSlider({ mainSliderBanners, sideBanners }: BannerSliderProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const plugin = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  React.useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
      console.log('Current slide:', api.selectedScrollSnap() + 1);
    });
  }, [api]);

  console.log('Banners:', mainSliderBanners);

  return (
    <div className="relative mb-8 grid grid-cols-12 gap-x-4 gap-y-2">
      <div className="col-span-12 lg:col-span-8">
        <Carousel
          setApi={setApi}
          plugins={[plugin.current]}
          opts={{ align: 'start', loop: true, skipSnaps: false }}
          className="banner-slider group relative rounded-lg shadow-base"
        >
          <CarouselContent>
            {mainSliderBanners.map((banner) => {
              console.log(`Rendering CarouselItem for banner ${banner.id}`);
              return (
                <CarouselItem key={banner.id} className="basis-full bg-blue-200">
                  <Link href={banner.link}>
                    <Image
                      src={banner?.image?.fileUrl || 'https://via.placeholder.com/800x450'}
                      alt={banner.type || 'banner'}
                      width={800}
                      height={450}
                      className="w-full"
                      loading="eager"
                      onError={() => console.error(`Failed to load image for banner ${banner.id}: ${banner.image.fileUrl}`)}
                      onLoad={() => console.log(`Image loaded for banner ${banner.id}: ${banner.image.fileUrl}`)}
                    />
                    <p className="text-center text-white font-bold">Banner ID: {banner.id}</p>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 hidden md:inline-flex" />
          <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100 hidden md:inline-flex" />
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2">
            {Array.from({ length: count }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all ${current === index + 1 ? 'w-4 bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </Carousel>
      </div>
      <div className="col-span-12 hidden xs:block lg:col-span-4">
        <div className="flex h-full flex-row justify-between gap-x-2 lg:flex-col">
          {sideBanners.map((banner) => (
            <div key={banner.id}>
              <Link href={banner.link}>
                <Image
                  src={banner.image.fileUrl}
                  alt={banner.type || 'banner'}
                  width={400}
                  height={220}
                  className="h-full w-full rounded-lg shadow-base"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
