'use client';

import { FC, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import MobileDrawer from '@/components/ui/MobileDrawer';
import StockStatusFilter from '../shopPage/FilterDesktop/StockStatusFilter';
import DiscountFilter from '../shopPage/FilterDesktop/DiscountFilter';
import CategorySelector from '../category/CategorySelector';
import { Category } from '@/types/categoryType';

interface MobileFilterProps {
  totalCount: number;
  type?: 'BLOG' | 'SHOP';
  title?: string;
  categories?: Category[];
}

const MobileFilter: FC<MobileFilterProps> = ({ totalCount, categories, title }) => {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  return (
    <>
      <MobileDrawer
        isOpen={isOpenDrawer}
        onOpen={() => setIsOpenDrawer(true)}
        onClose={() => setIsOpenDrawer(false)}
        title={title || 'فیلتر محصولات'}
        triggerButton={
          <div className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base">
            <FiFilter className="h-6 w-6" />
            <div>فیلتر</div>
          </div>
        }
        footerActions={
          <button onClick={() => setIsOpenDrawer(false)} className="btn-primary w-full py-3 text-sm" type="button">
            مشاهده {totalCount} محصول
          </button>
        }
      >
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
      </MobileDrawer>
    </>
  );
};

export default MobileFilter;
