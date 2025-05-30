'use client';

import { FC, useMemo } from 'react';
import Link from 'next/link';
import { HiChevronLeft } from 'react-icons/hi';
import ProductCard from '@/Modules/product/components/ProductCard';
import { productSwiperConfig } from '@/config/swiper';
import Carousel from '../../../../shared/components/Carousel/Carousel';
import { Product } from '../../types/productType';

interface Props {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  products: Product[];
  loading?: boolean;
}

const ProductCarousel: FC<Props> = ({ title, viewAllLink, viewAllText = 'مشاهده همه', products, loading = false }) => {
  const productItems = useMemo(() => {
    if (loading) {
      return Array(4)
        .fill(null)
        .map((_, index) => <div key={index} className="p-2"></div>);
    }

    return products?.map((product) => <ProductCard key={product.id} product={product} />);
  }, [products, loading]);

  return (
    <section className="mb-8">
      <div className="container relative">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-medium md:text-lg lg:text-xl">{title}</h3>
          <Link href={viewAllLink} className="flex items-center gap-x-2 py-2 text-sm text-primary lg:text-base">
            {viewAllText}
            <HiChevronLeft className="h-5 w-5 lg:h-6 lg:w-6" />
          </Link>
        </div>
        <Carousel
          items={productItems}
          slidesPerView={productSwiperConfig.slidesPerView}
          spaceBetween={productSwiperConfig.spaceBetween}
          breakpoints={productSwiperConfig.breakpoints}
          navigation={true}
          className="product-slider"
        />
      </div>
    </section>
  );
};

export default ProductCarousel;
