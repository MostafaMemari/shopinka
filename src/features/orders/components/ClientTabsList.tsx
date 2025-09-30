'use client';

import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

type Tab = {
  id: string;
  label: string;
};

type ClientTabsListProps = {
  tabs: readonly Tab[];
  tabCounts: Record<string, number>;
};

const ClientTabsList = ({ tabs, tabCounts }: ClientTabsListProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = useCallback(
    (newTab: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('activeTab', newTab);
      router.replace(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams],
  );

  return (
    <TabsList className="flex gap-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
      {tabs.map((tab) => (
        <TabsTrigger
          key={tab.id}
          value={tab.id}
          className="flex items-center gap-x-2 cursor-pointer"
          onClick={() => handleTabChange(tab.id)}
        >
          <span>{tab.label}</span>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white dark:bg-emerald-600">
            {tabCounts[tab.id] || 0}
          </span>
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default ClientTabsList;
