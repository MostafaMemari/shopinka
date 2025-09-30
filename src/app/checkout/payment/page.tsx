import OrderNotFound from '@/features/payment/components/OrderNotFound';
import PaymentActions from '@/features/payment/components/PaymentActions';
import PaymentDetails from '@/features/payment/components/PaymentDetails';
import PaymentWarnings from '@/features/payment/components/PaymentWarnings';
import { getOrderById } from '@/features/orders/orderService';
import { formatAmount, formatDate, getRemainingTime } from '@/utils/formatter';
import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

type PageProps = {
  searchParams: Promise<{ status: 'success' | 'failed'; orderId: string }>;
};

export default async function PaymentResult({ searchParams }: PageProps) {
  const { status, orderId } = await searchParams;

  const res = await getOrderById(Number(orderId)).catch(() => {
    return null;
  });

  if (!res?.success) return <OrderNotFound />;

  const order = res.data;

  const expiresInMinutes = getRemainingTime(order.expiresAt);
  const isSuccess = status === 'success' && order.transaction.status === 'SUCCESS';
  const payment = order.transaction || {};
  const trackingCode = payment.invoiceNumber || '---';
  const paymentDate = payment.createdAt ? formatDate(payment.createdAt) : '---';
  const amount = payment.amount ? formatAmount(payment.amount / 10) : '---';

  return (
    <div className="col-span-12">
      <div className="min-h-[320px] flex items-center justify-center">
        <Card className="mx-auto w-full max-w-xl shadow p-6 flex flex-col items-center gap-y-8">
          <div className="flex flex-col items-center gap-4">
            {isSuccess ? (
              <CheckCircle className={cn('h-20 w-20 text-green-600', { 'text-green-600': isSuccess, 'text-red-600': !isSuccess })} />
            ) : (
              <XCircle className={cn('h-20 w-20', { 'text-green-600': isSuccess, 'text-red-600': !isSuccess })} />
            )}
            <h1 className={cn('text-center text-lg font-bold md:text-xl', { 'text-green-600': isSuccess, 'text-red-600': !isSuccess })}>
              پرداخت سفارش {orderId} {isSuccess ? 'موفق' : 'ناموفق'} بود
            </h1>
            <p className="max-w-md text-center text-sm text-muted-foreground md:text-base">
              {isSuccess ? 'پرداخت با موفقیت انجام شد. سفارش شما در حال پردازش است.' : 'پرداخت ناموفق بود. لطفاً دوباره تلاش کنید.'}
            </p>
          </div>
          <PaymentDetails trackingCode={trackingCode} paymentDate={paymentDate} amount={amount} />
          {!isSuccess && <PaymentWarnings expiresInMinutes={expiresInMinutes} />}

          <PaymentActions isSuccess={isSuccess} orderId={orderId} orderStatus={order.status} />
        </Card>
      </div>
    </div>
  );
}
