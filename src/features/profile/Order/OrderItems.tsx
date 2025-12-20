import Image from 'next/image';
import Link from 'next/link';

import { Card, CardContent } from '@/components/ui/card';
import { OrderProductItem } from '@/features/orders/OrderType';
import { formatPrice } from '@/utils/formatter';
import { BaggageClaim } from 'lucide-react';

interface OrderItemsProps {
  items: OrderProductItem[];
  itemCount: number;
}

const OrderItems: React.FC<OrderItemsProps> = ({ items, itemCount }) => {
  return (
    <div className="mb-8">
      <h2 className="my-6 flex items-center gap-3 text-lg font-semibold text-gray-800 dark:text-gray-200">
        <BaggageClaim size={24} />
        اقلام سفارش
        <span className="text-sm text-gray-600 dark:text-gray-400">({itemCount} کالا)</span>
      </h2>

      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const variantAttributes = item.productVariant?.attributeValues;
          const primaryAttribute = variantAttributes?.[0] || null;
          const product = item?.product || item?.productVariant?.product;
          const productName = product?.name || `برچسب ${item?.customSticker?.lines.map((line: any) => line.text).join(' ')}` || '';
          const productSlug = product?.slug || '';
          const productImageUrl =
            item?.product?.mainImage?.fileUrl ||
            item?.productVariant?.product?.mainImage?.fileUrl ||
            item?.customSticker?.previewImage?.fileUrl ||
            '/images/no-image.webp';

          const priceItem = item?.unitPrice || 0;

          return (
            <Card key={item.id} className="border hover:shadow-lg transition-shadow duration-300">
              <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Link href={`/product/${productSlug}`} target="_blank" className="w-20 h-20 flex-shrink-0 relative">
                      <Image
                        alt={productName}
                        src={productImageUrl}
                        fill
                        className="rounded-lg object-cover shadow"
                        sizes="(max-width: 640px) 80px, 96px"
                      />
                    </Link>

                    <div className="flex flex-col gap-2">
                      <Link href={`/product/${productSlug}`} target="_blank">
                        {productName}
                      </Link>

                      {primaryAttribute && (
                        <div className="flex items-center gap-2 text-xs">
                          <span
                            className="h-4 w-4 rounded-full border"
                            style={{ backgroundColor: primaryAttribute.colorCode || 'transparent' }}
                          />
                          <span>{primaryAttribute.name}</span>
                        </div>
                      )}

                      <div className="text-sm text-primary-600 dark:text-primary-400 font-semibold mt-1">
                        {formatPrice(priceItem)} <span className="text-xs font-normal mr-1">تومان</span>
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
      </div>
    </div>
  );
};

export default OrderItems;
