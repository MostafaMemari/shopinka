'use client';

import { FC, useState } from 'react';
import StockStatusFilter from '../shopPage/FilterDesktop/StockStatusFilter';
import DiscountFilter from '../shopPage/FilterDesktop/DiscountFilter';
import CategorySelector from '../categories/components/CategorySelector';
import { Category } from '@/features/categories/types';
import { Button } from '@/components/ui/button';
import { Funnel } from 'lucide-react';
import MobileDrawer from '@/components/common/Drawer';
import { Card } from '@/components/ui/card';

interface MobileFilterProps {
  totalCount: number;
  type?: 'BLOG' | 'SHOP';
  title?: string;
  categories?: Category[];
}

const MobileFilter: FC<MobileFilterProps> = ({ totalCount, categories, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <MobileDrawer
      open={open}
      onOpenChange={setOpen}
      showClose={false}
      trigger={
        <Card className="flex flex-row w-full items-center gap-x-4 px-4 py-3 text-sm xs:text-base">
          <Funnel className="h-6 w-6" />
          <div>مرتب سازی</div>
        </Card>
      }
      title={title || 'فیلتر محصولات'}
      actions={
        <Button onClick={() => setOpen(false)} className="w-full" type="button">
          مشاهده {totalCount} محصول
        </Button>
      }
    >
      <div className="flex flex-col divide-y divide-border overflow-hidden">
        {categories && categories.length > 0 && (
          <div>
            <CategorySelector title="فیلتر بر اساس دسته‌بندی" categories={categories ?? []} />
          </div>
        )}
        <div className="py-4">
          <StockStatusFilter />
        </div>
        <div className="py-4">
          <DiscountFilter />
        </div>
      </div>
    </MobileDrawer>
  );
};

export default MobileFilter;
