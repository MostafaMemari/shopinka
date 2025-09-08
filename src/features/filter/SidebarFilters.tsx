import React from 'react';
import SearchInput from './SearchInput';
import CategorySelector from '../categories/components/CategorySelector';
import StockStatusFilter from '../shopPage/FilterDesktop/StockStatusFilter';
import DiscountFilter from '../shopPage/FilterDesktop/DiscountFilter';
import { Category } from '@/features/categories/types';

function SidebarFilters({ categories }: { categories: Category[] }) {
  return (
    <>
      <div className="col-span-4 row-span-2 hidden md:flex md:flex-col lg:col-span-3 gap-4">
        <div className="py-1 rounded-lg bg-muted shadow-base">
          <SearchInput />
        </div>
        {categories && categories.length > 0 && (
          <div className="px-3 rounded-lg bg-muted shadow-base">
            <CategorySelector title="فیلتر بر اساس دسته‌بندی" categories={categories} />
          </div>
        )}
        <div className="p-3 rounded-lg bg-muted shadow-base">
          <StockStatusFilter />
        </div>
        <div className="p-3 rounded-lg bg-muted shadow-base">
          <DiscountFilter />
        </div>
      </div>
    </>
  );
}

export default SidebarFilters;
