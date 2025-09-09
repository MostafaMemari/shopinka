'use client';

import React, { useState } from 'react';
import ProductDescription from './ProductDescription';
import ProductSpecifications from './ProductSpecifications';
import ProductComments from '@/features/comments/components/ProductComments';
import { useComment } from '@/features/comments/hooks/useComment';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

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
  const { data } = useComment({ params: { productId, page: 1 } });

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
    <Card className="p-4">
      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800 w-full lg:w-2/4">
            {tabs.map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center cursor-pointer bg-card gap-1">
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
    </Card>
  );
}
