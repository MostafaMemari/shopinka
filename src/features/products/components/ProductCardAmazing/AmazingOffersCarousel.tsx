'use client';

import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '../../ProductType';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { productSwiperConfigAmazing } from '@/config/swiper';
import ProductCardAmazing from '.';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { ProductCarouselSkeleton } from './ProductCardAmazingSkeleton';

interface AmazingProductsProps {
  products: Product[];
}

export default function AmazingProducts({ products }: AmazingProductsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="bg-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
        <CardHeader className="bg-gray-200 col-span-1 md:col-span-3 lg:col-span-2 flex flex-col justify-center items-start px-1">
          <div className="flex flex-row md:flex-col items-center gap-4 w-full">
            <Image
              src="https://digikala.vimascript.ir/media/library/2025-01-27/1/file.1738002393.43484.webp"
              alt="blog"
              width={150}
              height={92}
              className="w-36 md:w-44 hidden md:block"
              unoptimized
            />

            <h2 className="block md:hidden text-xs lg:text-md font-bold text-gray-800 w-full">محصولات تخفیف‌دار</h2>

            <div className="flex flex-row md:flex-col gap-3 items-center">
              <Button variant="secondary" className="h-9 md:h-12">
                مشاهده محصولات
              </Button>

              <div className="swiper-slider-controller flex items-center shadow-md rounded-md">
                <button
                  className="swiper-button-prev-amazing cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Previous slide"
                  aria-controls="swiper-wrapper-amazing"
                >
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
                <span className="mx-2 text-gray-600">|</span>
                <button
                  className="swiper-button-next-amazing cursor-pointer"
                  tabIndex={0}
                  role="button"
                  aria-label="Next slide"
                  aria-controls="swiper-wrapper-amazing"
                >
                  <ChevronLeft className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="bg-white rounded-[var(--radius)] md:rounded-e-[var(--radius)] col-span-1 md:col-span-9 lg:col-span-10 p-0">
          <div className="relative overflow-hidden">
            {!isMounted && <ProductCarouselSkeleton />}
            <Swiper
              slidesPerView={productSwiperConfigAmazing.slidesPerView}
              spaceBetween={productSwiperConfigAmazing.spaceBetween}
              breakpoints={productSwiperConfigAmazing.breakpoints}
              loop={true}
              className="amazing-product-carousel"
              navigation={{
                nextEl: '.swiper-button-prev-amazing',
                prevEl: '.swiper-button-next-amazing',
              }}
              modules={[Navigation]}
              style={{ direction: 'rtl' }}
              onInit={() => setIsMounted(true)}
            >
              {products.map((product) => (
                <SwiperSlide key={product.id} className="flex-shrink-0 w-56">
                  <ProductCardAmazing product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
