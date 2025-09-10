'use client';

import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface ButtonOption {
  slug: string;
  label: string;
  isDisabled?: boolean;
}

interface Props {
  options: ButtonOption[];
  selectedOption: string | null;
  onOptionChange: (value: string) => void;
  title?: string;
}

export default function ButtonSelector({ options, selectedOption, onOptionChange, title }: Props) {
  if (!options?.length) return null;

  return (
    <div>
      {title && <div className="mb-4 text-sm font-medium text-muted-foreground">{title}</div>}

      <RadioGroup value={selectedOption ?? ''} onValueChange={onOptionChange} className="flex flex-wrap gap-2">
        {options.map((option) => (
          <div key={option.slug} className="flex items-center space-x-2">
            <RadioGroupItem value={option.slug} id={option.slug} disabled={option.isDisabled} className="peer sr-only" />
            <Label
              htmlFor={option.slug}
              className={`cursor-pointer rounded-full border px-4 py-2 text-sm shadow-sm transition-colors
                ${option.isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                ${selectedOption === option.slug ? 'border-primary text-primary' : 'border-border'}
              `}
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
