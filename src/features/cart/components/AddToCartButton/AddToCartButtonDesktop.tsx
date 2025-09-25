'use client';

import { ProductCardLogic } from '@/types/productCardLogic';
import Link from 'next/link';
import CartControls from '../CartControls';
import { useCartLogic } from '../../hooks/useCartLogic';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useCart } from '../../hooks/useCart';
import { CartData } from '../../cartType';
import { useAppSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import { setAddToCart } from '@/store/slices/pendingActionSlice';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import { AddedToCardDialogDrawer } from '../AddedToCardDialogDrawer';

interface AddToCartButtonDesktopProps {
  product: ProductCardLogic;
}

export function AddToCartButtonDesktop({ product }: AddToCartButtonDesktopProps) {
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const { selectedVariant, existingProduct } = useCartLogic({ product });

  const { addToCartMutation, isAddingToCart } = useCart();

  const isVariantSelected = !!selectedVariant;
  const isInCart = !!existingProduct;
  const isVariableProduct = product.type === 'VARIABLE';

  const addToCartHandler = () => {
    const item: CartData = {
      productId: !isVariableProduct ? product.id : null,
      productVariantId: isVariableProduct ? selectedVariant?.id : null,
      quantity: 1,
    };

    if (isLogin) {
      addToCartMutation(item);
    } else {
      dispatch(setAddToCart(item));
      dispatch(openAuthDialog());
    }
  };

  const getButtonText = () => {
    if (isAddingToCart) return 'در حال افزودن...';
    if (isVariableProduct && !isVariantSelected) return 'لطفاً گزینه‌های محصول را انتخاب کنید';
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
            disabled={(isVariableProduct && !isVariantSelected) || isAddingToCart}
            isLoading={isAddingToCart}
            className="flex w-full items-center justify-center gap-2
             shadow-md shadow-primary/50 transition-all duration-300 
             hover:shadow-none "
          >
            {getButtonText()}
          </PrimaryButton>
        )}
      </div>

      {/* <AddedToCardDialogDrawer /> */}
    </>
  );
}

export default AddToCartButtonDesktop;
