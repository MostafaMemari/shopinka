'use client';

import React, { useState } from 'react';
import ProductDescription from './ProductDescription';
import ProductSpecifications from './ProductSpecifications';
import ProductComments from '@/components/features/productDetails/Comment/ProductComments';
import { useComment } from '@/hooks/reactQuery/comment/useComment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

interface Tab {
  id: string;
  title: string;
  count?: number;
}

interface Props {
  description: string;
  specifications: Array<{
    title: string;
    values: string[];
  }>;
  productId: number;
}

export default function ProductTabs({ description, specifications, productId }: Props) {
  const { data, isLoading } = useComment({ params: { productId, page: 1 } });

  const tabs: Tab[] = [
    { id: 'description', title: 'معرفی' },
    { id: 'specs', title: 'مشخصات' },
    { id: 'comments', title: 'دیدگاه ها', count: data?.pager.totalCount || 0 },
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return <ProductDescription description={description} />;
      case 'specs':
        return <ProductSpecifications specifications={specifications} />;
      case 'comments':
        return <ProductComments productId={productId} />;
      default:
        return null;
    }
  };

  const handleTabChange = (val: string) => {
    setActiveTab(val);
  };

  return (
    <div className="rounded-lg bg-muted p-4 shadow-base">
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="flex gap-x-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-x-2 cursor-pointer">
                <span>{tab.title}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white dark:bg-emerald-600">
                    {tab.count}
                  </span>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {tabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id}>
              <div className="space-y-16 divide-y">{renderTabContent()}</div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
