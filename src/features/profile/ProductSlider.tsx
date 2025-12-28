'use client';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import Link from 'next/link';
import { OrderProductItem } from '@/features/orders/OrderType';
import Image from '@/components/common/UnoptimizedImage';
import { useState } from 'react';
import CustomStickerDialog from '../cart/components/views/CartBasket/CustomStickerDialog';

interface ProductSliderProps {
  orderProductItems: OrderProductItem[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ orderProductItems }) => {
  const [activeSticker, setActiveSticker] = useState<OrderProductItem['customSticker'] | null>(null);

  return (
    <div className="orders-product-swiper">
      <Swiper
        slidesPerView={1.1}
        spaceBetween={12}
        freeMode
        modules={[FreeMode]}
        breakpoints={{
          360: { slidesPerView: 1.2, spaceBetween: 12 },
          460: { slidesPerView: 1.6, spaceBetween: 14 },
          640: { slidesPerView: 2.2, spaceBetween: 14 },
          1000: { slidesPerView: 3.2, spaceBetween: 16 },
          1380: { slidesPerView: 4.1, spaceBetween: 18 },
        }}
      >
        {orderProductItems.map((item) => {
          const product = item?.product || item?.productVariant?.product;
          const productName = product?.name || item?.customSticker?.name || '';
          const productSlug = product?.slug;

          const productImageUrl =
            item?.product?.mainImage?.fileUrl ||
            item?.productVariant?.product?.mainImage?.fileUrl ||
            item?.customSticker?.previewImage?.fileUrl ||
            '/images/no-image.webp';

          const isCustomSticker = !!item?.customStickerId;

          return (
            <SwiperSlide key={item.id}>
              {isCustomSticker ? (
                <button
                  type="button"
                  onClick={() => setActiveSticker(item.customSticker)}
                  className="flex items-center gap-x-3 rounded-xl cursor-pointer border border-gray-100 bg-white px-2 py-2 shadow-sm transition hover:shadow-lg hover:border-primary mb-0.5"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <Image alt={productName} src={productImageUrl} className="object-contain w-14 h-14" width={60} height={60} />
                  </div>
                  <p className="line-clamp-2 text-xs sm:text-sm text-gray-700 font-medium">{productName}</p>
                </button>
              ) : (
                <Link
                  href={productSlug ? `/product/${productSlug}` : '#'}
                  className="flex items-center gap-x-3 cursor-pointer rounded-xl border border-gray-100 bg-white px-2 py-2 shadow-sm transition hover:shadow-lg hover:border-primary mb-0.5"
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                    <Image alt={productName} src={productImageUrl} className="object-contain w-14 h-14" width={60} height={60} />
                  </div>
                  <p className="line-clamp-2 text-xs sm:text-sm text-gray-700 font-medium">{productName}</p>
                </Link>
              )}
            </SwiperSlide>
          );
        })}

        <CustomStickerDialog
          open={!!activeSticker}
          onOpenChange={(open) => {
            if (!open) setActiveSticker(null);
          }}
          customStickerValues={activeSticker}
        />
      </Swiper>
    </div>
  );
};

export default ProductSlider;
