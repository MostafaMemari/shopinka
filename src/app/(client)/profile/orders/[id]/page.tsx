import DashboardHeader from '@/components/features/profile/DashboardHeader';
import OrderCardDetails from '@/components/features/profile/Order/OrderCardDetails';
import OrderItems from '@/components/features/profile/Order/OrderItems';
import { getOrderById } from '@/service/orderService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import DeliveryAddress from '@/components/features/address/DeliveryAddress';
import { Button } from '@/components/ui';
import { ChevronLeft } from 'lucide-react';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function Page({ params }: PageProps) {
  const { id } = await params;
  const res = await getOrderById(Number(id));

  if (res.status !== 200 || 'message' in res.data) {
    return notFound();
  }

  const order = res.data;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-10 flex flex-col items-center justify-between gap-y-6 sm:flex-row">
        <DashboardHeader title={`جزئیات سفارش #${order.orderNumber}`} />
        <Link href="/profile/orders">
          <Button className="cursor-pointer">
            بازگشت
            <ChevronLeft />
          </Button>
        </Link>
      </div>

      <OrderCardDetails
        orderStatus={order.status}
        transactionStatus={order.transaction.status}
        orderNumber={order.orderNumber}
        paymentOrder={order.transaction.amount}
        createdAt={order.createdAt}
        updatedAt={order.updatedAt}
        expiresAt={order.expiresAt}
        orderId={order.id}
      />
      <DeliveryAddress address={order.addressSnapshot} />
      <OrderItems items={order.items} itemCount={order.quantity} />
    </div>
  );
}

export default Page;
