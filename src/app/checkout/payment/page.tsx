import CheckoutProgress from '@/features/checkout/components/CheckoutProgress';
import OrderNotFound from '@/features/payment/components/OrderNotFound';
import PaymentActions from '@/features/payment/components/PaymentActions';
import PaymentDetails from '@/features/payment/components/PaymentDetails';
import PaymentStatus from '@/features/payment/components/PaymentStatus';
import PaymentWarnings from '@/features/payment/components/PaymentWarnings';
import { getOrderById } from '@/features/orders/orderService';
import { formatAmount, formatDate, getRemainingTime } from '@/utils/formatter';

type PageProps = {
  searchParams: Promise<{ status: 'success' | 'failed'; orderId: string }>;
};

export default async function PaymentResult({ searchParams }: PageProps) {
  const { status, orderId } = await searchParams;

  const order = await getOrderById(Number(orderId)).catch(() => {
    return null;
  });

  if (!order) return <OrderNotFound />;

  const expiresInMinutes = getRemainingTime(order.expiresAt);
  const isSuccess = status === 'success' && order.transaction.status === 'SUCCESS';
  const payment = order.transaction || {};
  const trackingCode = payment.invoiceNumber || '---';
  const paymentDate = payment.createdAt ? formatDate(payment.createdAt) : '---';
  const amount = payment.amount ? formatAmount(payment.amount / 10) : '---';

  return (
    <>
      <CheckoutProgress currentStep="payment" />
      <div className="col-span-12">
        <div className="min-h-[320px] flex items-center justify-center">
          <div className="mx-auto w-full max-w-xl rounded-lg bg-background shadow p-6 flex flex-col items-center gap-y-8">
            <PaymentStatus isSuccess={isSuccess} orderId={orderId} />
            <PaymentDetails trackingCode={trackingCode} paymentDate={paymentDate} amount={amount} />
            {!isSuccess && <PaymentWarnings expiresInMinutes={expiresInMinutes} />}

            <PaymentActions isSuccess={isSuccess} orderId={orderId} orderStatus={order.status} />
          </div>
        </div>
      </div>
    </>
  );
}
