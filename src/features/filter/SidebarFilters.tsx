import React from 'react';
import SearchInput from './SearchInput';
import CategorySelector from '../categories/components/CategorySelector';
import StockStatusFilter from '../shopPage/FilterDesktop/StockStatusFilter';
import DiscountFilter from '../shopPage/FilterDesktop/DiscountFilter';
import { Category } from '@/features/categories/CategoryType';
import { Card } from '@/components/ui/card';

function SidebarFilters({ categories }: { categories: Category[] }) {
  return (
    <div className="col-span-4 row-span-2 hidden md:flex md:flex-col lg:col-span-3 gap-4">
      <SearchInput />
      {categories && categories.length > 0 && (
        <Card className="px-3">
          <CategorySelector title="فیلتر بر اساس دسته‌بندی" categories={categories} />
        </Card>
      )}
      <Card className="p-3">
        <StockStatusFilter />
      </Card>
      <Card className="p-3">
        <DiscountFilter />
      </Card>
    </div>
  );
}

export default SidebarFilters;
