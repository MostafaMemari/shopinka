'use client';

import React, { useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface ColorItem {
  name: string;
  value: string;
}

const colors: ColorItem[] = [
  { name: 'قرمز', value: '#ef4444' },
  { name: 'آبی', value: '#3b82f6' },
  { name: 'سبز', value: '#22c55e' },
  { name: 'زرد', value: '#eab308' },
  { name: 'نارنجی', value: '#f97316' },
  { name: 'بنفش', value: '#a855f7' },
  { name: 'صورتی', value: '#ec4899' },
  { name: 'آبی آسمانی', value: '#38bdf8' },
  { name: 'خاکستری', value: '#9ca3af' },
  { name: 'مشکی', value: '#000000' },
];

export default function ColorGrid() {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  return (
    <div className="fixed left-3 right-3 bottom-22 max-w-[500px] m-auto">
      <ScrollArea
        className="w-full h-[90px] bg-white rounded-md shadow-md border"
        onWheel={(e) => {
          const target = e.currentTarget;
          if (e.deltaY !== 0) {
            e.preventDefault();
            target.scrollLeft += e.deltaY;
          }
        }}
      >
        <div className="flex gap-2 px-3 py-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => setSelectedColor(color.value)}
              className={`shrink-0 flex flex-col items-center cursor-pointer transition-all min-w-[60px]`}
            >
              <div
                className={`w-10 h-10 rounded-full border-2 ${
                  selectedColor === color.value ? 'border-primary scale-110' : 'border-gray-300'
                }`}
                style={{ backgroundColor: color.value }}
              />
              <p className="text-[10px] font-medium mt-1 text-center" style={{ direction: 'rtl' }}>
                {color.name}
              </p>
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
