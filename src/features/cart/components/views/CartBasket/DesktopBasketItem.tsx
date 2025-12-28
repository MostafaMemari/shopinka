'use client';

import { useState } from 'react';
import Image from '@/components/common/UnoptimizedImage';
import Link from 'next/link';

import { CartItemState } from '@/features/cart/cartType';
import CartControls from '@/features/cart/components/CartControls';
import CartItemAttributes from '@/features/cart/components/CartItemAttributes';

import BasketItemPrice from './BasketItemPrice';
import CustomStickerDialog from './CustomStickerDialog';

export interface ItemCardBasketProp {
  item: CartItemState;
}

export default function DesktopBasketItem({ item }: ItemCardBasketProp) {
  const [open, setOpen] = useState(false);

  const attributes = item.type === 'VARIABLE' && item.attributeValues ? item.attributeValues : [];

  const productUrl = `/product/${item.slug}`;
  const isCustomSticker = item.type === 'CUSTOM_STICKER' || item.customStickerValues !== null;

  return (
    <>
      <div className="flex items-center gap-x-3 py-3 border-b border-gray-100">
        <div className="relative min-w-fit">
          {isCustomSticker ? (
            <button type="button" onClick={() => setOpen(true)} className="focus:outline-none cursor-pointer">
              <Image alt={item.title} className="h-16 w-16 object-cover rounded" src={item.thumbnail ?? ''} width={64} height={64} />
            </button>
          ) : (
            <Link href={productUrl}>
              <Image alt={item.title} className="h-16 w-16 object-cover rounded" src={item.thumbnail ?? ''} width={64} height={64} />
            </Link>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          {isCustomSticker ? (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-sm font-medium text-gray-900 truncate block text-right cursor-pointer"
            >
              {item.title}
            </button>
          ) : (
            <Link href={productUrl} className="text-sm font-medium text-gray-900 truncate block">
              {item.title}
            </Link>
          )}

          <div className="flex items-center gap-x-2 text-sm text-text/60">
            <div>تعداد: {item.count}</div>
            <CartItemAttributes type={item.type} attributes={attributes} />
          </div>

          <div className="flex items-center justify-between gap-x-2">
            <BasketItemPrice salePrice={item.salePrice * item.count} basePrice={item.basePrice * item.count} />

            <div className="w-24">
              <CartControls className="h-10" product={item} />
            </div>
          </div>
        </div>
      </div>

      {isCustomSticker && <CustomStickerDialog open={open} onOpenChange={setOpen} customStickerValues={item.customStickerValues} />}
    </>
  );
}
