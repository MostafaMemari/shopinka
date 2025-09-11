'use client';

import Link from 'next/link';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getStatusConfig } from '@/config/orderStatusConfig';
import ProductSlider from '../ProductSlider';
import { OrderItem } from '@/features/orders/types';
import RetryPaymentButton from '../../payment/components/RetryPaymentButton';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';
import { RemainingTimeItem } from './RemainingTimeItem';
import { formatPrice } from '@/utils/formatter';

interface OrderCardProps {
  order: OrderItem;
}

const Item = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm md:text-base">
    <span className="text-gray-500 dark:text-gray-400">{label}:</span>
    <span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span>
  </div>
);

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const config = getStatusConfig(order.status, order.transaction.status);
  const formattedPrice = formatPrice(order.totalPrice);
  const formattedDate = new Date(order.createdAt).toLocaleDateString('fa-IR') || 'نامشخص';
  const formattedTime = new Date(order.createdAt).toLocaleTimeString('fa-IR') || 'نامشخص';

  return (
    <Card className="mt-6">
      <Link href={`/profile/orders/${order.id}`} aria-label={`مشاهده جزئیات سفارش ${order.orderNumber}`} className="block">
        <CardHeader className="flex items-center justify-between border-b mb-4">
          <div className={cn('flex items-center gap-2', config.headerColor)}>
            {config.headerIcon}
            <span className="font-semibold text-base md:text-lg">{config.headerLabel}</span>
          </div>
          <ChevronLeft size={25} />
        </CardHeader>

        <CardContent className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-4">
            <div className="flex-1 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-4">
              <RemainingTimeItem orderStatus={order.status} transactionStatus={order.transaction.status} expiresAt={order.expiresAt} />

              <Item label="شماره سفارش" value={order.orderNumber} />

              <Item
                label="مبلغ کل"
                value={
                  <span className="text-primary-500 dark:text-primary-400 font-bold">
                    {formattedPrice}
                    <span className="text-xs font-normal mr-1">تومان</span>
                  </span>
                }
              />

              <Item label="تاریخ ثبت" value={formattedDate} />
            </div>
          </div>

          <div className="flex flex-col justify-center w-full md:w-2/5 max-w-md mx-auto gap-3">
            <div className={cn('flex items-center gap-2', config.statusColor)}>
              {config.statusIcon}
              <span className="text-sm font-semibold md:text-base">{config.statusLabel}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm">{config.statusDescription}</p>
            {config.showProgress && (
              <>
                <div className="relative h-2px bg-gray-200 dark:bg-gray-200 dark rounded-full overflow-hidden">
                  <div
                    className={cn('absolute inset-y-0 right-0 rounded-full transition-all duration-500', config.progressColor)}
                    style={{ width: `${config.progress}%` }}
                  />
                </div>
                <div className={cn('flex justify-between text-xs md:text-sm', config.statusColor)}>
                  <span>
                    <span className="mr-1">تاریخ: </span>
                    {formattedDate}
                  </span>
                  <span>
                    <span className="mr-1">ساعت: </span>
                    {formattedTime}
                  </span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Link>

      {order.items?.length > 0 && (
        <div className="pt-4 px-4 border-t border-gray-200 dark:border-gray-700 mt-4">
          <ProductSlider orderProductItems={order.items} />
        </div>
      )}

      {order.status === 'PENDING' && (
        <CardFooter className="border-t border-gray-200 dark:border-gray-700 text-left">
          <RetryPaymentButton orderId={order.id} />
        </CardFooter>
      )}
    </Card>
  );
};

export default OrderCard;
