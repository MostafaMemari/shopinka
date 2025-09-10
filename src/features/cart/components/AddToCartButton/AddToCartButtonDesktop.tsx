'use client';

import { Button } from '@/components/ui/button';
import { ProductCardLogic } from '@/types/productCardLogic';
import Link from 'next/link';
import CartControls from '../CartControls';
import { useCartLogic } from '../../hooks/useCartLogic';

interface AddToCartButtonDesktopProps {
  product: ProductCardLogic;
}

export function AddToCartButtonDesktop({ product }: AddToCartButtonDesktopProps) {
  const { isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart, isAddingToCart } = useCartLogic({ product });

  return (
    <div className="mb-6 flex justify-start align-center gap-4">
      {isInCart ? (
        <div className="flex items-center gap-4">
          {existingProduct && (
            <div>
              <CartControls product={existingProduct} />
            </div>
          )}
          <div className="hidden lg:flex flex-col items-start text-sm">
            <span className="text-primary font-medium">در سبد شما</span>
            <Link href="/checkout/cart" className="text-blue-600 hover:underline text-sm font-normal mt-1">
              مشاهده سبد خرید
            </Link>
          </div>
        </div>
      ) : (
        <Button
          type="submit"
          onClick={addToCart}
          aria-label={isVariableProduct && !isVariantSelected ? 'لطفاً گزینه‌های محصول را انتخاب کنید' : 'افزودن به سبد خرید'}
          disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart}
          className="flex items-center justify-center gap-2 w-full"
        >
          {isAddingToCart ? (
            <div className="animate-pulse rounded-full bg-white/30 h-5 w-5" aria-label="در حال بارگذاری" />
          ) : isVariableProduct && !isVariantSelected ? (
            'لطفاً گزینه‌های محصول را انتخاب کنید'
          ) : (
            'افزودن به سبد خرید'
          )}
        </Button>
      )}
    </div>
  );
}

export default AddToCartButtonDesktop;
