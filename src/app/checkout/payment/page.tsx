import CheckoutProgress from '@/components/features/checkout/CheckoutProgress';
import OrderNotFound from '@/components/features/payment/OrderNotFound';
import PaymentActions from '@/components/features/payment/PaymentActions';
import PaymentDetails from '@/components/features/payment/PaymentDetails';
import PaymentStatus from '@/components/features/payment/PaymentStatus';
import PaymentWarnings from '@/components/features/payment/PaymentWarnings';
import { getOrderById } from '@/service/orderService';
import { formatAmount, formatDate, getRemainingTime } from '@/utils/formatter';

type PageProps = {
  searchParams: Promise<{ status: 'success' | 'failed'; orderId: string }>;
};

export default async function PaymentResult({ searchParams }: PageProps) {
  const { status, orderId } = await searchParams;

  const res = await getOrderById(Number(orderId));

  if (res.status !== 200 || 'message' in res.data) {
    return <OrderNotFound />;
  }

  const order = res?.data;
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
        <div className="rounded-lg bg-muted p-6 min-h-[320px] flex items-center justify-center">
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
