import { Card } from '@/components/ui/card';
import OrderCard from './OrderCard';
import { getOrders } from '@/features/orders/orderService';
import { Package } from 'lucide-react';

interface TabContentProps {
  tabId: 'current' | 'delivered' | 'canceled';
}

const TabContent: React.FC<TabContentProps> = async ({ tabId }) => {
  const res = await getOrders({ params: { status: tabId, page: 1, take: 20 } });

  const data = res.success ? res.data : null;
  const orders = data?.items || [];

  return (
    <div id={`filter-${tabId}`} role="tabpanel" aria-labelledby={`filter-${tabId}-tab`}>
      <div className="mb-8 space-y-4">
        <div className="space-y-4">
          {!orders.length && (
            <Card className="border hover:shadow-lg transition-shadow duration-300 items-center justify-center text-center gap-4 p-10">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-muted">
                <Package className="w-8 h-8 text-muted-foreground" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-semibold">سفارشی وجود ندارد</h3>
                <p className="text-sm text-muted-foreground">هنوز سفارشی در این بخش ثبت نشده است.</p>
              </div>
            </Card>
          )}

          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabContent;
