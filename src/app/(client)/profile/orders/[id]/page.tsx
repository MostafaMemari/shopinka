import DashboardHeader from '@/features/profile/DashboardHeader';
import OrderCardDetails from '@/features/profile/Order/OrderCardDetails';
import OrderItems from '@/features/profile/Order/OrderItems';
import { getOrderById } from '@/features/orders/api';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DeliveryAddress from '@/features/address/components/DeliveryAddress';
import { Button } from '@/components/ui';
import { ChevronLeft } from 'lucide-react';

type PageProps = {
  params: Promise<{ id: string }>;
};

async function Page({ params }: PageProps) {
  const { id } = await params;

  const order = await getOrderById(Number(id)).catch(() => {
    return null;
  });

  if (!order) return redirect('/profile/orders');

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

      <OrderCardDetails order={order} />
      <DeliveryAddress address={order.addressSnapshot} />
      <OrderItems items={order.items} itemCount={order.quantity} />
    </div>
  );
}

export default Page;
