'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useQueryState } from 'nuqs';
import React from 'react';

function DiscountFilter() {
  const [hasDiscount, setHasDiscount] = useQueryState<boolean>('hasDiscount', {
    parse: (value) => value === 'true',
    serialize: (value) => (value ? 'true' : ''),
    defaultValue: false,
    history: 'replace',
    shallow: false,
  });

  const [, setPage] = useQueryState('page', { defaultValue: '1', history: 'replace', shallow: false });

  const handleToggle = () => {
    setPage('1');
    setHasDiscount(!hasDiscount);
  };

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="hasDiscount" className="cursor-pointer w-full">
        فقط کالاهای دارای تخفیف
      </Label>
      <Switch id="hasDiscount" checked={hasDiscount} onCheckedChange={handleToggle} />
    </div>
  );
}

export default DiscountFilter;
