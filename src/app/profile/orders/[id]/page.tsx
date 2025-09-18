import DashboardHeader from '@/features/profile/DashboardHeader';
import OrderCardDetails from '@/features/profile/Order/OrderCardDetails';
import OrderItems from '@/features/profile/Order/OrderItems';
import { getOrderById } from '@/features/orders/orderService';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DeliveryAddress from '@/features/address/components/DeliveryAddress';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function Page({ params }: PageProps) {
  const { id } = await params;

  const res = await getOrderById(Number(id));

  if (!res?.success) return redirect('/');

  const order = res.data;

  if (!order) return redirect('/profile/orders');

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-4 lg:mb-10 flex flex-col items-center justify-between gap-y-6 sm:flex-row">
        <DashboardHeader title={`جزئیات سفارش #${order.orderNumber}`} />
        <Link href="/profile/orders">
          <Button variant="outline" size="sm">
            بازگشت
            <ChevronLeft />
          </Button>
        </Link>
      </div>

      <OrderCardDetails order={order} />
      <DeliveryAddress address={order.addressSnapshot} />
      <OrderItems items={order.items} itemCount={order.quantity} />
    </div>
  );
}

export default Page;
