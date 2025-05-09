"use client";

import { FC, useMemo } from "react";
import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/lib/types/products";
import { productSwiperConfig } from "@/config/swiper";
import Carousel from "./Carousel";

interface Props {
  title: string;
  viewAllLink: string;
  viewAllText?: string;
  products: IProduct[];
}

const CarouselProduct: FC<Props> = ({ title, viewAllLink, viewAllText = "مشاهده همه", products }) => {
  const productItems = useMemo(() => products.map((product) => <ProductCard key={product.id} product={product} />), [products]);
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

export default CarouselProduct;
