'use client';

import { FC, useState } from 'react';
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import StockStatusFilter from '../shopPage/FilterDesktop/StockStatusFilter';
import DiscountFilter from '../shopPage/FilterDesktop/DiscountFilter';
import CategorySelector from '../category/CategorySelector';
import { Category } from '@/types/categoryType';
import { Button } from '@/components/ui';
import { Funnel } from 'lucide-react';

interface MobileFilterProps {
  totalCount: number;
  type?: 'BLOG' | 'SHOP';
  title?: string;
  categories?: Category[];
}

const MobileFilter: FC<MobileFilterProps> = ({ totalCount, categories, title }) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base">
          <Funnel className="h-6 w-6" />
          <div>فیلتر</div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title || 'فیلتر محصولات'}</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col divide-y divide-border rounded-lg overflow-hidden bg-muted shadow-base">
          {categories && categories.length > 0 && (
            <div className="p-4">
              <CategorySelector title="فیلتر بر اساس دسته‌بندی" categories={categories ?? []} />
            </div>
          )}
          <div className="p-4">
            <StockStatusFilter />
          </div>
          <div className="p-4">
            <DiscountFilter />
          </div>
        </div>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)} className="w-full" type="button">
            مشاهده {totalCount} محصول
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilter;
