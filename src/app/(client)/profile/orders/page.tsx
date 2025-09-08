'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import DashboardHeader from '@/features/profile/DashboardHeader';
import TabContent from '@/features/profile/Order/TabContent';
import { getCountOrders } from '@/features/orders/api';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const TABS = [
  { id: 'current', label: 'جاری' },
  { id: 'delivered', label: 'تحویل شده' },
  { id: 'canceled', label: 'لغو شده' },
] as const;

type TabId = (typeof TABS)[number]['id'];
const DEFAULT_TAB: TabId = 'current';

const OrderTabs = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeTabParam = searchParams.get('activeTab');
  const isValidTab = activeTabParam && TABS.some((tab) => tab.id === activeTabParam);
  const initialTab: TabId = (isValidTab ? activeTabParam : DEFAULT_TAB) as TabId;

  const [tabId, setTabId] = useState<TabId>(initialTab);
  const [tabCounts, setTabCounts] = useState<Record<TabId, number>>({
    current: 0,
    delivered: 0,
    canceled: 0,
  });

  useEffect(() => {
    (async () => {
      const { cancelled, current, delivered } = await getCountOrders();
      setTabCounts({ current, delivered, canceled: cancelled });
    })();
  }, []);

  const handleTabChange = (val: string) => {
    const newTab = val as TabId;
    setTabId(newTab);

    const params = new URLSearchParams(searchParams.toString());
    params.set('activeTab', newTab);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="سفارشات" />
      </div>

      <Tabs value={tabId} onValueChange={handleTabChange}>
        <TabsList className="flex gap-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-x-2 cursor-pointer">
              <span>{tab.label}</span>
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white dark:bg-emerald-600">
                {tabCounts[tab.id] || 0}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

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
