'use client';

import React from 'react';

import { calculateDiscount, formatPrice } from '@/lib/utils';

interface ProductCartPriceProps {
  basePrice?: number | null;
  salePrice?: number | null;
}

export default function ProductCartPrice({ salePrice, basePrice }: ProductCartPriceProps) {
  const isAvailable = basePrice != null && basePrice > 0;
  const discount = isAvailable && salePrice != null ? calculateDiscount(basePrice, salePrice) : 0;
  const hasDiscount = discount > 0 && salePrice != null;

  return (
    <div className="flex flex-col items-end text-sm text-gray-800">
      {hasDiscount && <span className="line-through text-gray-500 text-xs">{formatPrice(basePrice ?? 0)} تومان</span>}

      <div className="text-lg lg:text-xl font-bold text-primary">
        {formatPrice(salePrice ? salePrice : (basePrice ?? 0))} <span className="text-xs">تومان</span>
      </div>
    </div>
  );
}
