'use client';

import { useQueryState } from 'nuqs';
import React from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

function StockStatusFilter() {
  const [isInStock, setIsInStock] = useQueryState<boolean>('stockStatus', {
    parse: (value) => value === 'instock',
    serialize: (value) => (value ? 'instock' : ''),
    defaultValue: false,
    history: 'replace',
    shallow: false,
  });

  const [, setPage] = useQueryState('page', { defaultValue: '1', history: 'replace', shallow: false });

  const handleToggle = () => {
    setPage('1');
    setIsInStock(!isInStock);
  };

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="inStock" className="cursor-pointer w-full">
        فقط کالاهای موجود
      </Label>
      <Switch id="inStock" checked={isInStock} onCheckedChange={handleToggle} />
    </div>
  );
}

export default StockStatusFilter;
