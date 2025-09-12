'use client';

import { Select as ShadcnSelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { forwardRef } from 'react';

type SelectProps = {
  options: { id: string | number; name: string }[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const Select = forwardRef<HTMLButtonElement, SelectProps>(
  ({ options, value, onValueChange, placeholder = 'انتخاب کنید', className, disabled = false }, ref) => {
    return (
      <ShadcnSelect onValueChange={onValueChange} value={value} disabled={disabled}>
        <SelectTrigger className={cn('w-full', className)} ref={ref}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.id} value={option.name}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    );
  },
);

export default Select;
