import { OrderStatus } from '@/features/orders/OrderType';
import { TransactionStatus } from '@/types/transactionType';
import { getRemainingTime } from '@/utils/formatter';
import { Item } from './OrderCardDetails';

interface RemainingTimeItemProps {
  orderStatus: OrderStatus;
  transactionStatus: TransactionStatus;
  expiresAt: string;
}

export function RemainingTimeItem({ orderStatus, transactionStatus, expiresAt }: RemainingTimeItemProps) {
  const shouldShowTimer = orderStatus === 'PENDING' && transactionStatus === 'PENDING';

  if (!shouldShowTimer) return null;

  const remainingTime = getRemainingTime(expiresAt);

  return (
    <Item
      label="زمان باقی‌مانده"
      value={
        remainingTime && remainingTime > 0 ? (
          <span className="text-red-500 dark:text-red-400">{remainingTime} دقیقه</span>
        ) : (
          <span className="text-gray-500 dark:text-gray-400">اتمام زمان</span>
        )
      }
    />
  );
}
