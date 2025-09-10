'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { formatPrice } from '@/utils/formatter';
import { Badge } from '@/components/ui/badge';

interface ProductPriceProps {
  product: {
    type: 'VARIABLE' | 'SIMPLE';
    salePrice: number | null;
    basePrice: number | null;
  };
}

export function ProductDesktopDetailsPrice({ product }: ProductPriceProps) {
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const isVariable = product.type === 'VARIABLE';

  const salePrice = isVariable ? (selectedVariant?.salePrice ?? null) : product.salePrice;
  const basePrice = isVariable ? (selectedVariant?.basePrice ?? null) : product.basePrice;

  const discount = useMemo(() => {
    if (typeof salePrice === 'number' && typeof basePrice === 'number' && basePrice > 0) {
      return Math.round(((basePrice - salePrice) / basePrice) * 100);
    }
    return 0;
  }, [salePrice, basePrice]);

  if (isVariable && !selectedVariant) {
    return null;
  }
  if (salePrice == null && basePrice == null) {
    return null;
  }

  return (
    <div className="space-y-2">
      {discount > 0 && basePrice != null && salePrice ? (
        <>
          <div className="flex items-center gap-x-2">
            <div>
              <del className="text-sm font-normal text-muted-foreground">{formatPrice(basePrice)}</del>
            </div>
            <Badge variant="destructive">{discount}%</Badge>
          </div>
          <div className="flex items-end gap-x-1">
            <span className="text-2xl font-bold text-primary">{formatPrice(salePrice)}</span>
            <span className="text-sm font-medium text-muted-foreground">تومان</span>
          </div>
        </>
      ) : (
        <div className="flex items-end gap-x-1">
          <span className="text-2xl font-bold text-primary">{formatPrice(basePrice ?? 0)}</span>
          <span className="text-sm font-medium text-muted-foreground">تومان</span>
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
  };
}

export function ProductMobileDetailsPrice({ product }: ProductPriceProps) {
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const isVariable = product.type === 'VARIABLE';

  const salePrice = isVariable ? (selectedVariant?.salePrice ?? null) : product.salePrice;
  const basePrice = isVariable ? (selectedVariant?.basePrice ?? null) : product.basePrice;

  const discount = useMemo(() => {
    if (typeof salePrice === 'number' && typeof basePrice === 'number' && basePrice > 0) {
      return Math.round(((basePrice - salePrice) / basePrice) * 100);
    }
    return 0;
  }, [salePrice, basePrice]);

  if (isVariable && !selectedVariant) {
    return null;
  }
  if (salePrice == null && basePrice == null) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2">
      {discount > 0 && salePrice ? (
        <>
          <span className="text-base font-bold text-primary">{formatPrice(salePrice)}</span>
          <span className="text-xs font-light text-muted-foreground">تومان</span>
          <Badge variant="destructive" className="mr-2">
            {discount}%
          </Badge>
        </>
      ) : (
        <>
          <span className="text-base font-bold text-primary">{formatPrice(basePrice ?? 0)}</span>
          <span className="text-xs font-light text-muted-foreground">تومان</span>
        </>
      )}
    </div>
  );
}

export function ProductStickyMobilePrice({ product }: ProductPriceProps) {
  const { selectedVariant } = useSelector((state: RootState) => state.product);
  const isVariable = product.type === 'VARIABLE';

  const salePrice = isVariable ? (selectedVariant?.salePrice ?? null) : product.salePrice;
  const basePrice = isVariable ? (selectedVariant?.basePrice ?? null) : product.basePrice;

  const discount = useMemo(() => {
    if (salePrice && basePrice && basePrice > 0) {
      return Math.round(((basePrice - salePrice) / basePrice) * 100);
    }
    return 0;
  }, [salePrice, basePrice]);

  if (isVariable && !selectedVariant) return null;

  return (
    <div className="flex flex-col items-start text-xs">
      {discount > 0 && salePrice ? (
        <>
          <div className="flex items-center gap-1">
            <span className="line-through text-gray-400">{formatPrice(basePrice)}</span>
            <Badge variant="destructive" className="px-1 py-0 text-[10px]">
              %{discount}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-base">{formatPrice(salePrice)}</span>
            <span className="text-gray-500">تومان</span>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-1">
          <span className="font-bold text-base">{formatPrice(basePrice ?? 0)}</span>
          <span className="text-gray-500">تومان</span>
        </div>
      )}
    </div>
  );
}
