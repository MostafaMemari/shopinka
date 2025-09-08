'use client';

import { Label } from '@/components/ui';
import { Switch } from '@/components/ui/switch';
import { useResetPageOnQueryChange } from '@/hooks/useResetPageOnQueryChange';
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

  useResetPageOnQueryChange(JSON.stringify(hasDiscount));

  return (
    <div className="flex items-center justify-between">
      <Label htmlFor="onlyAvailableDesktop" className="cursor-pointer">
        فقط کالاهای دارای تخفیف
      </Label>
      <Switch
        id="onlyAvailableDesktop"
        className="cursor-pointer"
        checked={hasDiscount}
        onCheckedChange={(checked) => setHasDiscount(checked)}
      />
    </div>
  );
}

export default DiscountFilter;
