import React, { ReactNode } from 'react';
import { formatPrice } from '@/utils/formatter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CartSummaryProps {
  totalQuantity?: number;
  totalPrice?: number;
  totalDiscountPrice?: number;
  payablePrice?: number;
  points?: number;
  shippingNote?: string;
  shippingPrice?: number;
  children?: ReactNode;
  cartPrice?: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  totalQuantity,
  totalPrice,
  totalDiscountPrice,
  payablePrice,
  shippingNote,
  shippingPrice,
  cartPrice,
  children,
}) => {
  return (
    <Card>
      <CardContent className="p-0 divide-y divide-gray-200">
        {totalQuantity != null && totalPrice != null && totalPrice > 0 && (
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 font-medium">قیمت کالاها ({totalQuantity})</span>
            <div className="text-sm text-gray-900">
              <span className="font-bold">{formatPrice(totalPrice)}</span>
              <span className="text-xs mr-1">تومان</span>
            </div>
          </div>
        )}

        {totalDiscountPrice != null && totalDiscountPrice > 0 && (
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 font-medium">تخفیف کالاها</span>
            <div className="text-sm text-red-500">
              <span className="font-bold">{formatPrice(totalDiscountPrice)}</span>
              <span className="text-xs mr-1">تومان</span>
            </div>
          </div>
        )}

        {shippingPrice != null && shippingPrice > 0 && (
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 font-medium">هزینه ارسال</span>
            <div className="text-sm text-gray-900">
              <span className="font-bold">{formatPrice(shippingPrice)}</span>
              <span className="text-xs mr-1">تومان</span>
            </div>
          </div>
        )}

        {cartPrice != null && cartPrice > 0 && (
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 font-medium">جمع کل سبد خرید</span>
            <div className="text-sm text-gray-900">
              <span className="font-bold">{formatPrice(cartPrice)}</span>
              <span className="text-xs mr-1">تومان</span>
            </div>
          </div>
        )}

        {payablePrice != null && payablePrice > 0 && (
          <div className="flex justify-between items-center py-4">
            <span className="text-sm text-gray-600 font-medium">مبلغ قابل پرداخت</span>
            <div className="text-sm text-gray-900">
              <span className="font-bold">{formatPrice(payablePrice)}</span>
              <span className="text-xs mr-1">تومان</span>
            </div>
          </div>
        )}

        {shippingNote && <div className="py-4 text-xs text-gray-500 leading-relaxed">{shippingNote}</div>}

        {children && <div className="py-4">{children}</div>}
      </CardContent>
    </Card>
  );
};

export default CartSummary;
