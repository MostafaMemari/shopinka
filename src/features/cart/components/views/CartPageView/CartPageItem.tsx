import React, { useState } from 'react';
import Link from 'next/link';
import Image from '@/components/common/UnoptimizedImage';
import { Package } from 'lucide-react';

import { CartItemState } from '@/features/cart/cartType';
import CartItemAttributes from '@/features/cart/components/CartItemAttributes';
import CartControls from '@/features/cart/components/CartControls';

import ProductCartPrice from '../../ProductCartPrice';
import CartItemCustomSticker from '../../CartItemCustomSticker';
import CustomStickerDialog from '../CartBasket/CustomStickerDialog';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';

interface CartPageItemProps {
  cartItem: CartItemState;
  isLast?: boolean;
}

function CartPageItem({ cartItem, isLast = false }: CartPageItemProps) {
  const [open, setOpen] = useState(false);

  const attributes = cartItem.type === 'VARIABLE' && cartItem.attributeValues ? cartItem.attributeValues : [];
  const productUrl = `/product/${cartItem.slug}`;
  const isCustomSticker = cartItem.type === 'CUSTOM_STICKER' || cartItem.customStickerValues !== null;
  const productThumbnail = cartItem.thumbnail.length ? cartItem.thumbnail : PlaceholderImageEnum.SQUARE;

  return (
    <>
      <div className={`py-4 px-2 sm:px-4 flex gap-4 items-center border-b border-gray-200 ${isLast ? 'border-b-0' : ''}`}>
        <div className="flex-shrink-0">
          {isCustomSticker ? (
            <button type="button" onClick={() => setOpen(true)} className="focus:outline-none cursor-pointer">
              <Image
                alt={cartItem.title}
                src={productThumbnail}
                width={96}
                height={96}
                loading="lazy"
                className="w-24 h-24 rounded-md object-cover border"
              />
            </button>
          ) : (
            <Link href={productUrl}>
              <Image
                alt={cartItem.title}
                src={productThumbnail}
                width={96}
                height={96}
                loading="lazy"
                className="w-24 h-24 rounded-md object-cover border"
              />
            </Link>
          )}
        </div>

        <div className="flex-1 flex flex-col justify-between space-y-2">
          {isCustomSticker ? (
            <button
              onClick={() => setOpen(true)}
              className="cursor-pointer text-sm text-start sm:text-base font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
            >
              {cartItem.title}
            </button>
          ) : (
            <Link href={productUrl} className="text-sm sm:text-base font-medium text-gray-900 hover:text-blue-600 line-clamp-2">
              {cartItem.title}
            </Link>
          )}

          <div className="flex items-center mt-1 gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Package className="w-4 h-4 text-gray-400" />
              <span>{isCustomSticker ? 'سفارشی‌ سازی‌ شده' : 'موجود در انبار'}</span>
            </div>

            <div className="text-xs text-gray-500">
              <CartItemAttributes type={cartItem.type} attributes={attributes} />
              {cartItem.customStickerValues && <CartItemCustomSticker customStickerValues={cartItem.customStickerValues} />}
            </div>
          </div>

          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <CartControls product={cartItem} className="h-8 lg:h-10" />
              <span className="text-xs hidden lg:block text-gray-600 shrink-0 whitespace-nowrap">تعداد: {cartItem.count}</span>
            </div>
            <ProductCartPrice salePrice={cartItem.salePrice * cartItem.count} basePrice={cartItem.basePrice * cartItem.count} />
          </div>
        </div>
      </div>

      {isCustomSticker && <CustomStickerDialog open={open} onOpenChange={setOpen} customStickerValues={cartItem.customStickerValues} />}
    </>
  );
}

export default CartPageItem;
