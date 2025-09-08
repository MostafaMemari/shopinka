'use client';

import PrimaryButton from '@/components/common/PrimaryButton';
import { ProductCardLogic } from '@/types/productCardLogic';
import Link from 'next/link';
import { useCartLogic } from '@/hooks/reactQuery/cart/useCartLogic';
import CartControls from '../CartControls';

interface AddToCartButtonMobileProps {
  product: ProductCardLogic;
}

export default function AddToCartButtonMobile({ product }: AddToCartButtonMobileProps) {
  const { isVariableProduct, isVariantSelected, isInCart, existingProduct, addToCart, isAddingToCart } = useCartLogic({
    product,
  });

  return (
    <>
      {isInCart ? (
        <div className="flex items-center gap-4">
          {existingProduct && <CartControls product={existingProduct} />}
          <div className="hidden lg:flex flex-col items-start text-sm">
            <span className="text-primary font-medium">در سبد شما</span>
            <Link href="/checkout/cart" className="text-blue-600 hover:underline text-sm font-normal mt-1">
              مشاهده سبد خرید
            </Link>
          </div>
        </div>
      ) : (
        <PrimaryButton
          type="submit"
          onClick={addToCart}
          isLoading={isAddingToCart}
          disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart}
          aria-label={isVariableProduct && !isVariantSelected ? 'لطفاً یک گزینه انتخاب کنید' : 'افزودن به سبد خرید'}
        >
          {isAddingToCart ? (
            <div className="animate-pulse rounded-full bg-white/30 h-5 w-5" aria-label="در حال بارگذاری" />
          ) : isVariableProduct && !isVariantSelected ? (
            'لطفاً یک گزینه انتخاب کنید'
          ) : (
            'افزودن به سبد خرید'
          )}
        </PrimaryButton>
      )}
    </>
  );
}
