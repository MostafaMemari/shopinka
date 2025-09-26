'use client';

import { ProductCardLogic } from '@/types/productCardLogic';
import Link from 'next/link';
import CartControls from '../CartControls';
import { useCartLogic } from '../../hooks/useCartLogic';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useCart } from '../../hooks/useCart';
import { CartData } from '../../cartType';
import { showAddToCartToast } from '@/utils/toastUtils';
import { useRouter } from 'next/navigation';

interface AddToCartButtonDesktopProps {
  product: ProductCardLogic;
}

export function AddToCartButtonDesktop({ product }: AddToCartButtonDesktopProps) {
  const { selectedVariant, existingProduct } = useCartLogic({ product });
  const router = useRouter();

  const { addToCart, isAddingToCart } = useCart();

  const isVariantSelected = !!selectedVariant;
  const isInCart = !!existingProduct;
  const isVariableProduct = product.type === 'VARIABLE';

  const price = isVariableProduct ? selectedVariant?.basePrice || selectedVariant?.salePrice : product.basePrice || product.salePrice;

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

  const getButtonText = () => {
    if (isAddingToCart) return 'در حال افزودن...';
    if (isVariableProduct && !isVariantSelected) return 'لطفاً گزینه‌های محصول را انتخاب کنید';
    if (!price) return 'ناموجود';
    return 'افزودن به سبد خرید';
  };

  return (
    <>
      <div className="mb-6 flex w-full items-center gap-4">
        {isInCart ? (
          <div className="flex items-center gap-4">
            {existingProduct && (
              <div className="w-36">
                <CartControls product={existingProduct} />
              </div>
            )}
            <div className="hidden md:flex flex-col items-start text-sm">
              <span className="font-medium text-xs md:sm text-primary">در سبد شما</span>
              <Link href="/checkout/cart" className="mt-1 text-xs md:sm font-normal text-blue-600 hover:underline whitespace-nowrap">
                مشاهده سبد خرید
              </Link>
            </div>
          </div>
        ) : (
          <PrimaryButton
            type="button"
            onClick={addToCartHandler}
            disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart || !price}
            isLoading={isAddingToCart}
            className="flex w-full items-center justify-center gap-2
             shadow-md shadow-primary/50 transition-all duration-300 
             hover:shadow-none "
          >
            {getButtonText()}
          </PrimaryButton>
        )}
      </div>
    </>
  );
}

export default AddToCartButtonDesktop;
