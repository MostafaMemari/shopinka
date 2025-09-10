'use client';

import { Button } from '@/components/ui/button';
import { ProductCardLogic } from '@/types/productCardLogic';
import Link from 'next/link';
import CartControls from '../CartControls';
import { useCartLogic } from '../../hooks/useCartLogic';
import { Loader2 } from 'lucide-react';

interface AddToCartButtonDesktopProps {
  product: ProductCardLogic;
}

export function AddToCartButtonDesktop({ product }: AddToCartButtonDesktopProps) {
  const { isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart, isAddingToCart } = useCartLogic({ product });

  const getButtonText = () => {
    if (isAddingToCart) return 'در حال افزودن...';
    if (isVariableProduct && !isVariantSelected) return 'لطفاً گزینه‌های محصول را انتخاب کنید';
    return 'افزودن به سبد خرید';
  };

  return (
    <div className="mb-6 flex w-full items-center gap-4">
      {isInCart ? (
        <div className="flex items-center gap-4">
          {existingProduct && (
            <div className="w-36">
              <CartControls product={existingProduct} />
            </div>
          )}
          <div className="hidden lg:flex flex-col items-start text-sm">
            <span className="font-medium text-primary">در سبد شما</span>
            <Link href="/checkout/cart" className="mt-1 text-sm font-normal text-blue-600 hover:underline whitespace-nowrap">
              مشاهده سبد خرید
            </Link>
          </div>
        </div>
      ) : (
        <Button
          type="button"
          onClick={addToCart}
          disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart}
          className="flex w-full items-center justify-center gap-2"
        >
          {isAddingToCart && <Loader2 className="h-4 w-4 animate-spin" aria-label="loading" />}
          {getButtonText()}
        </Button>
      )}
    </div>
  );
}

export default AddToCartButtonDesktop;
