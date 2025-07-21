import { OrderStatus } from '@/types/orderType';
import { RemainingTimeItem } from './RemainingTimeItem';
import { TransactionStatus } from '@/types/transactionType';
import { formatPrice } from '@/utils/formatter';

interface OrderDetailsListProps {
  orderStatus: OrderStatus;
  transactionStatus: TransactionStatus;
  expiresAt: string;
  orderNumber: string;
  totalPrice: number;
  createdAt: string;
}

export function OrderDetailsList({ orderStatus, transactionStatus, expiresAt, orderNumber, totalPrice, createdAt }: OrderDetailsListProps) {
  return (
    <div className="flex-1 flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-6 md:gap-y-4">
      <RemainingTimeItem orderStatus={orderStatus} transactionStatus={transactionStatus} expiresAt={expiresAt} />

      <Item label="شماره سفارش" value={orderNumber} />

      <Item
        label="مبلغ کل"
        value={
          <span className="text-primary-500 dark:text-primary-400 font-bold">
            {formatPrice(totalPrice)}
            <span className="text-xs font-normal mr-1">تومان</span>
          </span>
        }
      />

      <Item label="تاریخ ثبت" value={new Date(createdAt).toLocaleDateString('fa-IR')} />
    </div>
  );
}

const Item = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm md:text-base">
    <span className="text-gray-500 dark:text-gray-400">{label}:</span>
    <span className="text-gray-800 dark:text-gray-200 font-medium">{value}</span>
  </div>
);
