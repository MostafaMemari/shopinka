'use client';

import * as React from 'react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { IColor } from '../utils/productVariants';
import { cn } from '@/lib/utils';

interface Props {
  colors: IColor[];
  selectedColor: string | null;
  onColorChange: (id: string) => void;
  label?: string;
}

export default function ColorSelector({ colors, selectedColor, onColorChange, label }: Props) {
  if (!colors?.length) return null;

  const sortedColors = React.useMemo(() => {
    return [...colors].sort((a, b) => a.id.localeCompare(b.id));
  }, [colors]);

  return (
    <div>
      {label && <div className="mb-4 text-sm font-medium text-muted-foreground">{label}</div>}

      <RadioGroup value={selectedColor ?? ''} onValueChange={onColorChange} className="flex flex-wrap gap-2">
        {sortedColors.map((color) => (
          <div key={color.id} className="flex items-center space-x-2">
            <RadioGroupItem value={color.id} id={color.id} disabled={color.isDisabled} className="peer sr-only" />
            <Label
              htmlFor={color.id}
              className={cn('flex cursor-pointer items-center gap-x-2 rounded-full border-2 px-3 py-2 shadow-sm transition-colors', {
                'opacity-50 cursor-not-allowed': color.isDisabled,
                'border-primary': selectedColor === color.id,
                'border-border': selectedColor !== color.id,
              })}
            >
              <div
                className="h-6 w-6 rounded-full border"
                style={{
                  backgroundColor: color.color,
                  borderColor: 'var(--border)',
                }}
              />
              <span className="text-sm text-foreground">{color.name}</span>
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
