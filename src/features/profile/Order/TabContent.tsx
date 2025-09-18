'use client';

import EmptyState from '../EmptyState';
import ErrorState from '../ErrorState';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useOrder } from '@/features/orders/useOrders';
import OrderCard from './OrderCard';
import { Box } from 'lucide-react';

interface TabContentProps {
  tabId: 'current' | 'delivered' | 'canceled';
}

const TabContent: React.FC<TabContentProps> = ({ tabId }) => {
  const { data, isLoading, error } = useOrder({ params: { status: tabId } });

  const orders = data?.items || [];

  const orderPager = data?.pager ?? { totalCount: 0, totalPages: 1 };

  return (
    <div id={`filter-${tabId}`} role="tabpanel" aria-labelledby={`filter-${tabId}-tab`}>
      <div className="mb-8 space-y-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorState message={error.message} />
        ) : orderPager?.totalCount === 0 ? (
          <EmptyState icon={<Box className="w-full h-full" />} />
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TabContent;
