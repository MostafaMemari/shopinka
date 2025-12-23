'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ProductCardLogic } from '@/types/productCardLogic';
import PrimaryButton from '@/components/common/PrimaryButton';
import { showAddToCartToast } from '@/utils/toastUtils';

import CartControls from './CartControls';
import { useCartLogic } from '../hooks/useCartLogic';
import { useCart } from '../hooks/useCart';
import { CartData } from '../cartType';

interface AddToCartButtonProps {
  product: ProductCardLogic;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { selectedVariant, existingProduct } = useCartLogic({ product });
  const { addToCart, isAddingToCart } = useCart();
  const router = useRouter();

  const isVariable = product.type === 'VARIABLE';
  const isVariantSelected = Boolean(selectedVariant);
  const isInCart = Boolean(existingProduct);

  const price = isVariable ? (selectedVariant?.basePrice ?? selectedVariant?.salePrice) : (product.basePrice ?? product.salePrice);

  const quantity = isVariable ? selectedVariant?.quantity && selectedVariant.quantity > 0 : product.quantity && product.quantity > 0;

  const addToCartHandler = () => {
    const item: CartData = {
      productId: isVariable ? null : product.id,
      productVariantId: isVariable ? selectedVariant?.id : null,
      customStickerId: null,
      quantity: 1,
    };

    addToCart(item, {
      onSuccess: () => showAddToCartToast(router),
    });
  };

  const buttonText =
    (isAddingToCart && 'در حال افزودن...') ||
    (isVariable && !isVariantSelected && 'گزینه محصول را انتخاب کنید') ||
    (!price && 'غیر قابل فروش') ||
    (!quantity && 'ناموجود') ||
    'افزودن به سبد خرید';

  return (
    <>
      {isInCart ? (
        <div className="flex items-center gap-4">
          {existingProduct && (
            <div className="w-full">
              <CartControls product={existingProduct} />
            </div>
          )}
          <div className="hidden md:flex flex-col items-start text-sm">
            <span className="text-xs font-medium text-primary">در سبد شما</span>
            <Link href="/checkout/cart" className="mt-1 whitespace-nowrap text-xs font-normal text-blue-600 hover:underline md:sm">
              مشاهده سبد خرید
            </Link>
          </div>
        </div>
      ) : (
        <PrimaryButton
          type="button"
          onClick={addToCartHandler}
          disabled={(isVariable && !isVariantSelected) || isAddingToCart || !price || !quantity}
          isLoading={isAddingToCart}
          className="flex w-full items-center justify-center gap-2 shadow-md shadow-primary/50 transition-all duration-300 hover:shadow-none"
        >
          {buttonText}
        </PrimaryButton>
      )}
    </>
  );
}

export default AddToCartButton;
