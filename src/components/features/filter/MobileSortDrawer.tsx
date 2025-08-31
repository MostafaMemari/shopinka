'use client';

import { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface SortOption {
  label: string;
  value: string;
}
const SORT_OPTIONS = {
  default: { label: 'پیش‌فرض', value: '' },
  newest: { label: 'جدیدترین', value: 'newest' },
  price_asc: { label: 'ارزان‌ترین', value: 'price_asc' },
  price_desc: { label: 'گران‌ترین', value: 'price_desc' },
};

function MobileSortDrawer() {
  const [sortBy, setSortBy] = useState('');
  const [open, setOpen] = useState(false);

  const handleOptionChange = (value: string) => {
    setSortBy(value);
    setOpen(false);
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-muted px-4 py-3 text-sm xs:text-base">
          <ArrowDownUp className="h-6 w-6" />
          <div>مرتب سازی</div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>مرتب سازی</DrawerTitle>
        </DrawerHeader>
        <div className="main-scroll h-full overflow-y-auto p-4">
          <RadioGroup dir="rtl" value={sortBy} onValueChange={handleOptionChange} className="flex flex-col space-y-2 divide-y">
            {Object.values(SORT_OPTIONS).map((option: SortOption) => (
              <div key={option.value} className="first:pt-0">
                <div className="relative flex items-center">
                  <RadioGroupItem value={option.value} id={`sort-${option.value}`} className="peer sr-only" />
                  <Label
                    htmlFor={`sort-${option.value}`}
                    className="block w-full cursor-pointer rounded-lg border p-4 shadow-base peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:dark:border-primary"
                  >
                    <p className="text-center text-text/90">{option.label}</p>
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileSortDrawer;
