import OrderCard from './OrderCard';
import { getOrders } from '@/features/orders/orderService';

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
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabContent;
