import { getStatusConfig } from '@/config/orderStatusConfig';
import { OrderItem } from '@/features/orders/OrderType';
import React from 'react';
import RetryPaymentButton from '../../payment/components/RetryPaymentButton';
import { RemainingTimeItem } from './RemainingTimeItem';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn, formatPrice } from '@/lib/utils';

interface OrderCardDetailsProps {
  order: OrderItem;
}

function OrderCardDetails({ order }: OrderCardDetailsProps) {
  const orderId = order.id;
  const orderStatus = order.status;
  const transactionStatus = order.transaction.status;
  const orderNumber = order.orderNumber;
  const paymentOrder = order.transaction.amount;
  const createdAt = new Date(order.createdAt).toLocaleDateString('fa-IR');
  const updatedAt = new Date(order.updatedAt).toLocaleDateString('fa-IR');
  const expiresAt = new Date(order.expiresAt).toLocaleTimeString('fa-IR');

  const config = getStatusConfig(orderStatus, transactionStatus);

  return (
    <>
      <div className={cn('my-6 flex items-center gap-3 text-lg', config.headerColor)}>
        {config.headerIcon}
        <h2 className="font-semibold text-base md:text-lg">{config.headerLabel}</h2>
      </div>

      <Card className="border hover:shadow-lg transition-shadow duration-300">
        <CardContent className="flex flex-col lg:flex-row p-4 gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <RemainingTimeItem orderStatus={orderStatus} transactionStatus={transactionStatus} expiresAt={expiresAt} />

            <Item label="شماره سفارش" value={orderNumber} />

            <Item
              label="مبلغ کل"
              value={
                <span className="text-primary-500 dark:text-primary-400 font-bold">
                  {formatPrice(paymentOrder / 10)}
                  <span className="text-xs font-normal mr-1">تومان</span>
                </span>
              }
            />

            <Item label="تاریخ ثبت" value={createdAt} />
          </div>

          {config.showProgress && (
            <div className="flex flex-col justify-center w-full md:w-2/5 max-w-md mx-auto gap-3">
              <div className={`flex items-center gap-2 ${config.statusColor}`}>
                {config.statusIcon}
                <span className="text-sm font-semibold md:text-base">{config.statusLabel}</span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">{config.statusDescription}</p>
              <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 right-0 rounded-full transition-all duration-500 ${config.progressColor}`}
                  style={{ width: `${config.progress}%` }}
                />
              </div>
              <div className={`flex justify-between text-xs md:text-sm ${config.statusColor}`}>
                <span>
                  <span className="mr-1">تاریخ:</span> {updatedAt}{' '}
                </span>
                <span>
                  <span className="mr-1">ساعت:</span> {updatedAt}{' '}
                </span>
              </div>
            </div>
          )}
        </CardContent>

        {orderStatus === 'PENDING' && (
          <CardFooter className="border-t border-gray-200 dark:border-gray-700 text-left">
            <RetryPaymentButton orderId={orderId} />
          </CardFooter>
        )}
      </Card>
    </>
  );
}

export const Item = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm md:text-base">
    <span className="text-gray-500 dark:text-gray-400">{label}:</span>
    <span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span>
  </div>
);

export default OrderCardDetails;
