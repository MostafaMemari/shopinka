'use client';

import React, { FC, useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { productSwiperConfig } from '@/config/swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../ProductCard';
import { Product } from '../../ProductType';
import SkeletonLoader from './ProductCarouselSkeleton';
import { ChevronLeft } from 'lucide-react';

interface ProductCarouselProps {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  products: Product[];
}

const ProductCarousel: FC<ProductCarouselProps> = ({ title, viewAllLink, viewAllText = 'مشاهده همه', products }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium md:text-xl lg:text-2xl">{title}</h3>
        <Link
          href={viewAllLink}
          className="flex items-center gap-2 py-2 text-sm text-primary hover:text-blue-800 transition-colors lg:text-base"
        >
          {viewAllText}
          <ChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
        </Link>
      </div>

      {products && products.length > 0 ? (
        <div className="relative overflow-hidden">
          {!isMounted && <SkeletonLoader />}
          <Swiper
            slidesPerView={productSwiperConfig.slidesPerView}
            spaceBetween={productSwiperConfig.spaceBetween}
            breakpoints={productSwiperConfig.breakpoints}
            className="product-carousel"
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[Navigation]}
            style={{ direction: 'rtl' }}
            onInit={() => setIsMounted(true)}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} />
              </SwiperSlide>
            ))}

            <div className="swiper-button-prev absolute top-1/2 -left-4 z-10 -translate-y-1/2 after:text-sm after:text-gray-600" />
            <div className="swiper-button-next absolute top-1/2 -right-4 z-10 -translate-y-1/2 after:text-sm after:text-gray-600" />
          </Swiper>
        </div>
      ) : (
        <div className="text-center">هیچ محصولی یافت نشد</div>
      )}
    </div>
  );
};

export default ProductCarousel;
