'use client';

import Image from '@/components/common/UnoptimizedImage';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { OrderProductItem } from '@/features/orders/OrderType';

import { BaggageClaim } from 'lucide-react';
import CustomStickerDialog from '@/features/cart/components/views/CartBasket/CustomStickerDialog';
import { useState } from 'react';
import { formatPrice } from '@/lib/utils';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';

interface OrderItemsProps {
  items: OrderProductItem[];
  itemCount: number;
}

const OrderItems: React.FC<OrderItemsProps> = ({ items, itemCount }) => {
  const [activeSticker, setActiveSticker] = useState<OrderProductItem['customSticker'] | null>(null);

  return (
    <div className="mb-8">
      <h2 className="my-6 flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
        <BaggageClaim size={24} />
        اقلام سفارش
        <span className="text-sm text-gray-600 dark:text-gray-400">({itemCount} کالا)</span>
      </h2>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const variantAttributes = item.variantSnapshot;
          const product = item?.product || item?.productVariant?.product;

          const productTitle = item.productTitle || 'بدون عنوان';
          const productSlug = product?.slug || '#';
          const productImageUrl = item.imageUrl || PlaceholderImageEnum.SQUARE;

          const priceItem = item?.unitPrice || 0;
          const isCustomSticker = item.itemType === 'CUSTOM_STICKER';
          const customSticker = item.customStickerSnapshot;

          return (
            <Card key={item.id} className="border hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    {isCustomSticker ? (
                      <button
                        type="button"
                        onClick={() => setActiveSticker(customSticker)}
                        className="w-20 h-20 flex-shrink-0 relative cursor-pointer"
                      >
                        <Image alt={productTitle} src={productImageUrl} fill className="rounded-lg object-cover shadow" />
                      </button>
                    ) : (
                      <Link href={`/product/${productSlug}`} target="_blank" className="w-20 h-20 flex-shrink-0 relative">
                        <Image alt={productTitle} src={productImageUrl} fill className="rounded-lg object-cover shadow" />
                      </Link>
                    )}

                    <div className="flex flex-col gap-2">
                      {isCustomSticker ? (
                        <button
                          type="button"
                          onClick={() => setActiveSticker(customSticker)}
                          className="text-right cursor-pointer font-medium hover:text-primary"
                        >
                          {productTitle}
                        </button>
                      ) : (
                        <Link href={`/product/${productSlug}`} target="_blank">
                          {productTitle}
                        </Link>
                      )}

                      {variantAttributes && variantAttributes.length > 0 && (
                        <div className="flex">
                          {variantAttributes.map((variant) => (
                            <div key={variant.id} className="flex">
                              {variant.colorCode && (
                                <div className="flex items-center gap-2 text-xs">
                                  <span
                                    className="h-4 w-4 rounded-full border"
                                    style={{ backgroundColor: variant.colorCode || 'transparent' }}
                                  />
                                  <span>{variant.name}</span>
                                </div>
                              )}

                              {variant.buttonLabel && (
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="h-4 w-4" />
                                  <>
                                    جنس : <span>{variant.buttonLabel}</span>
                                  </>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {isCustomSticker && (
                        <div className="flex">
                          <div className="flex items-center gap-2 text-xs">
                            <span
                              className="h-4 w-4 rounded-full border"
                              style={{ backgroundColor: customSticker?.material.colorCode || 'transparent' }}
                            />
                            <span>{customSticker?.material.name}</span>
                          </div>

                          <div className="flex items-center gap-2 text-xs">
                            <span className="h-4 w-4" />
                            فونت : <span>{customSticker?.font.displayName}</span>
                          </div>
                        </div>
                      )}

                      <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1">
                        {formatPrice(priceItem)}
                        <span className="text-xs font-normal mr-1">تومان</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-start sm:justify-center">
                    <div className="flex h-9 min-w-[90px] items-center justify-center gap-1 rounded-md border bg-muted shadow">
                      <span>تعداد:</span>
                      <span className="font-bold">{item.quantity}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        <CustomStickerDialog
          open={!!activeSticker}
          onOpenChange={(open) => {
            if (!open) setActiveSticker(null);
          }}
          customStickerValues={activeSticker}
        />
      </div>
    </div>
  );
};

export default OrderItems;
