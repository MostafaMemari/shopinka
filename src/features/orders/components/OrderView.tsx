import { Tabs, TabsContent } from '@/components/ui/tabs';
import DashboardHeader from '@/features/profile/DashboardHeader';
import TabContent from '@/features/profile/Order/TabContent';
import { getCountOrders } from '@/features/orders/orderService';
import ClientTabsList from './ClientTabsList';

const TABS = [
  { id: 'current', label: 'جاری' },
  { id: 'delivered', label: 'تحویل شده' },
  { id: 'canceled', label: 'لغو شده' },
] as const;

type TabId = (typeof TABS)[number]['id'];
const DEFAULT_TAB: TabId = 'current';

type OrderTabsProps = {
  searchParams: { activeTab?: string };
};

const OrderTabs = async ({ searchParams }: OrderTabsProps) => {
  // دریافت تب فعال از searchParams
  const activeTabParam = searchParams.activeTab;
  const isValidTab = activeTabParam && TABS.some((tab) => tab.id === activeTabParam);
  const tabId: TabId = (isValidTab ? activeTabParam : DEFAULT_TAB) as TabId;

  // دریافت تعداد سفارش‌ها از سرور
  const res = await getCountOrders();
  const tabCounts: Record<TabId, number> = {
    current: res.success ? res.data.current : 0,
    delivered: res.success ? res.data.delivered : 0,
    canceled: res.success ? res.data.cancelled : 0,
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="سفارشات" />
      </div>

      <Tabs defaultValue={tabId} className="w-full">
        <ClientTabsList tabs={TABS} tabCounts={tabCounts} />

        {TABS.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <TabContent tabId={tab.id} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default OrderTabs;
