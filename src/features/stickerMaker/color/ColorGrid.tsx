'use client';

import React, { useRef } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setColorStart, setColorSuccess } from '@/store/slices/stickerSlice';

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

interface ColorGridProps {
  selectedColor: ColorItem | null;
}

export default function ColorGrid({ selectedColor }: ColorGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const handleColorClick = (color: ColorItem) => {
    dispatch(setColorStart());
    dispatch(setColorSuccess(color));
    console.log('🎨 رنگ انتخاب شد:', color);
  };

  return (
    <div ref={gridRef} className="m-2">
      <AnimatePresence mode="wait">
        <motion.div
          key="color-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          <ScrollArea
            className="w-full h-[90px] bg-white rounded-md shadow-md border"
            onWheel={(e) => {
              const target = e.currentTarget as HTMLElement;
              if (e.deltaY !== 0) {
                e.preventDefault();
                target.scrollLeft += e.deltaY;
              }
            }}
          >
            <div className="flex gap-2 px-3 py-2">
              {colors.map((color) => {
                const isSelected = selectedColor?.value === color.value;
                return (
                  <button
                    key={color.value}
                    onClick={() => handleColorClick(color)}
                    className="shrink-0 flex flex-col items-center cursor-pointer transition-all min-w-[60px]"
                  >
                    <div
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        isSelected
                          ? 'border-blue-500 ring-2 ring-blue-300 scale-105'
                          : 'border-gray-200 hover:scale-105 hover:border-gray-400'
                      }`}
                      style={{ backgroundColor: color.value }}
                    />
                    <p
                      className={`text-[10px] font-medium mt-1 text-center ${isSelected ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                      style={{ direction: 'rtl' }}
                    >
                      {color.name}
                    </p>
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
