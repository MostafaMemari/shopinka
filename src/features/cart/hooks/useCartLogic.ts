'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { setSelectedVariant } from '@/store/slices/productSlice';
import { CartItemState } from '@/features/cart/cartType';
import { useCart } from './useCart';
import { ProductCardLogic } from '@/types/productCardLogic';

export interface ProductCardLogicProps {
  product: ProductCardLogic;
}

export const useCartLogic = ({ product }: ProductCardLogicProps) => {
  const dispatch = useDispatch();

  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const { cart } = useCart();
  const [existingProduct, setExistingProduct] = useState<CartItemState | undefined>();

  const isVariableProduct = product.type === 'VARIABLE';

  useEffect(() => {
    dispatch(setSelectedVariant(null));
  }, [product.id, dispatch]);

  const cartItemId = useMemo(() => {
    return isVariableProduct ? (selectedVariant?.id ?? product.id) : product.id;
  }, [isVariableProduct, selectedVariant, product.id]);

  useEffect(() => {
    const found = cart?.items.find((item) => item.id === cartItemId);
    if (found?.id !== existingProduct?.id || found?.count !== existingProduct?.count) {
      setExistingProduct(found);
    }
  }, [cart, cartItemId, existingProduct]);

  return {
    selectedVariant,
    existingProduct,
  };
};
