'use client';

import { useResetPageOnQueryChange } from '@/hooks/useResetPageOnQueryChange';
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

  useResetPageOnQueryChange(JSON.stringify(isInStock));

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="inStock" className="cursor-pointer w-full">
        فقط کالاهای موجود
      </Label>
      <Switch id="inStock" checked={isInStock} onCheckedChange={(checked) => setIsInStock(checked)} />
    </div>
  );
}

export default StockStatusFilter;
