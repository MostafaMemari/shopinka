'use client';

import { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useQueryState } from 'nuqs';
import { Card } from '@/components/ui/card';
import MobileDrawer from '@/components/common/Drawer';

interface SortOption {
  label: string;
  value: string;
}

interface MobileSortDrawerProps {
  options: Record<string, SortOption>;
}

function MobileSortDrawer({ options }: MobileSortDrawerProps) {
  const [sortBy, setSortBy] = useQueryState('sortBy', {
    defaultValue: '',
    parse: (value) => value,
    serialize: (value) => value,
    history: 'replace',
    shallow: false,
  });

  const [open, setOpen] = useState(false);

  const handleOptionChange = (key: string) => {
    if (key === 'default' || !options[key]?.value) {
      setSortBy('');
    } else {
      setSortBy(key);
      setOpen(false);
    }
  };

  return (
    <MobileDrawer
      open={open}
      onOpenChange={setOpen}
      showClose={false}
      title="مرتب سازی"
      trigger={
        <Card className="flex flex-row w-full items-center gap-x-4 px-4 py-3 text-sm xs:text-base">
          <ArrowDownUp className="h-6 w-6" />
          <div>مرتب سازی</div>
        </Card>
      }
    >
      <div className="main-scroll h-full overflow-y-auto p-4">
        <RadioGroup dir="rtl" value={sortBy} onValueChange={handleOptionChange} className="flex flex-col space-y-2 divide-y">
          {Object.values(options).map((option: SortOption) => (
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
    </MobileDrawer>
  );
}

export default MobileSortDrawer;
