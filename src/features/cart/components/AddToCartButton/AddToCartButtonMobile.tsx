'use client';

import PrimaryButton from '@/components/common/PrimaryButton';
import { ProductCardLogic } from '@/types/productCardLogic';
import Link from 'next/link';
import CartControls from '../CartControls';
import { useCartLogic } from '../../hooks/useCartLogic';
import { useCart } from '../../hooks/useCart';
import { CartData } from '../../cartType';
import { showAddToCartToast } from '@/utils/toastUtils';
import { useRouter } from 'next/navigation';

interface AddToCartButtonMobileProps {
  product: ProductCardLogic;
}

export default function AddToCartButtonMobile({ product }: AddToCartButtonMobileProps) {
  const { selectedVariant, existingProduct } = useCartLogic({ product });
  const router = useRouter();

  const { addToCart, isAddingToCart } = useCart();

  const isVariantSelected = !!selectedVariant;
  const isInCart = !!existingProduct;
  const isVariableProduct = product.type === 'VARIABLE';

  const addToCartHandler = () => {
    const item: CartData = {
      productId: !isVariableProduct ? product.id : null,
      productVariantId: isVariableProduct ? selectedVariant?.id : null,
      quantity: 1,
    };

    addToCart(item, {
      onSuccess: () => {
        showAddToCartToast(router);
      },
    });
  };

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
          className="w-full"
          onClick={addToCartHandler}
          isLoading={isAddingToCart}
          disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart}
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
