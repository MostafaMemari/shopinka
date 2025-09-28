'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { formatPrice } from '@/utils/formatter';
import DiscountBadge from '@/components/common/DiscountBadge';
import TomanIcon from '@/components/common/svg/TomanIcon';

interface ProductPriceProps {
  product: {
    type: 'VARIABLE' | 'SIMPLE';
    salePrice: number | null;
    basePrice: number | null;
    quantity: number | null;
  };
}

export function ProductDetailsPrice({ product }: ProductPriceProps) {
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const isVariable = product.type === 'VARIABLE';

  const salePrice = isVariable ? (selectedVariant?.salePrice ?? null) : product.salePrice;
  const basePrice = isVariable ? (selectedVariant?.basePrice ?? null) : product.basePrice;
  const quantity = isVariable ? (selectedVariant?.quantity ?? null) : product.quantity;

  const discount = useMemo(() => {
    if (typeof salePrice === 'number' && typeof basePrice === 'number' && basePrice > 0) {
      return Math.round(((basePrice - salePrice) / basePrice) * 100);
    }
    return 0;
  }, [salePrice, basePrice]);

  if ((isVariable && !selectedVariant) || (!basePrice && !salePrice) || (quantity && quantity <= 0)) {
    return null;
  }
  return (
    <div>
      {discount > 0 && basePrice != null && salePrice ? (
        <div className="flex flex-col items-end">
          <div className="flex items-center gap-x-2">
            <del className="text-xs md:text-lg font-normal text-muted-foreground">{formatPrice(basePrice)}</del>
            <DiscountBadge discount={discount} className="px-1 py-0 text-[10px] w-7 md:w-9 md:text-sm" />
          </div>
          <div className="flex items-center gap-x-1">
            <span className="text-base md:text-2xl font-bold text-primary">{formatPrice(salePrice)}</span>
            <TomanIcon className="w-4 h-4 md:w-6 md:h-6" />
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-x-1">
          <span className="text-base md:text-2xl font-bold text-primary">{formatPrice(basePrice ?? 0)}</span>
          <TomanIcon className="w-4 h-4 md:w-6 md:h-6" />
        </div>
      )}
    </div>
  );
}

interface ProductPriceProps {
  product: {
    type: 'VARIABLE' | 'SIMPLE';
    salePrice: number | null;
    basePrice: number | null;
    quantity: number | null;
  };
}
