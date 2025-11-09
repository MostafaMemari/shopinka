'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

interface ColorItem {
  name: string;
  value: string;
  finishes?: string[];
}

const colors: ColorItem[] = [
  { name: 'قرمز', value: '#ef4444', finishes: ['مات', 'براق', 'شبرنگ', 'شب‌تاب'] },
  { name: 'آبی', value: '#3b82f6', finishes: ['مات', 'براق'] },
  { name: 'سبز', value: '#22c55e', finishes: ['مات', 'براق'] },
  { name: 'زرد', value: '#eab308', finishes: ['مات', 'شبرنگ'] },
  { name: 'نارنجی', value: '#f97316', finishes: ['مات', 'براق', 'شب‌تاب'] },
  { name: 'بنفش', value: '#a855f7' },
  { name: 'صورتی', value: '#ec4899', finishes: ['براق'] },
  { name: 'آبی آسمانی', value: '#38bdf8', finishes: ['مات'] },
  { name: 'خاکستری', value: '#9ca3af' },
  { name: 'مشکی', value: '#000000', finishes: ['مات', 'براق'] },
];

interface ColorGridProps {
  selectedColor: ColorItem | null;
  onColorSelect: (color: ColorItem | null) => void;
  onFinishSelect?: (finish: string | null) => void;
  onClose: () => void;
}

export default function ColorGrid({ selectedColor, onColorSelect, onFinishSelect, onClose }: ColorGridProps) {
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // انتخاب رنگ
  const handleColorClick = (color: ColorItem) => {
    if (color.finishes && color.finishes.length > 0) {
      // اگر finish دارد: وارد مرحله‌ی بعد شو
      onColorSelect(color);
      setSelectedFinish(null);
      console.log('🎨 رنگ انتخاب شد (منتظر finish):', color);
    } else {
      // اگر finish ندارد: نهایی و بسته شو
      console.log('✅ رنگ نهایی بدون finish:', color);
      onColorSelect(color);
      onClose();
    }
  };

  // انتخاب finish
  const handleFinishClick = (finish: string) => {
    if (!selectedColor) return;
    setSelectedFinish(finish);
    console.log('✅ انتخاب نهایی:', { color: selectedColor, finish });
    onFinishSelect?.(finish);
    onClose();
  };

  // کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (gridRef.current && !gridRef.current.contains(event.target as Node)) {
        console.log('❌ کلیک خارج از محدوده');
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={gridRef} className="m-2">
      <AnimatePresence mode="wait">
        {!selectedColor ? (
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
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => handleColorClick(color)}
                    className="shrink-0 flex flex-col items-center cursor-pointer transition-all min-w-[60px]"
                  >
                    <div
                      className="w-10 h-10 rounded-full border-2 border-gray-200 hover:scale-105 transition-transform"
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
          </motion.div>
        ) : (
          <motion.div
            key="finish-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-md shadow-md border py-4 flex flex-col items-center gap-4"
          >
            <div className="w-12 h-12 rounded-full border" style={{ backgroundColor: selectedColor.value }}></div>

            <div className="flex flex-wrap justify-center gap-3">
              {selectedColor.finishes?.map((finish) => (
                <Button key={finish} variant={selectedFinish === finish ? 'default' : 'outline'} onClick={() => handleFinishClick(finish)}>
                  {finish}
                </Button>
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                console.log('🔙 بازگشت به انتخاب رنگ');
                onColorSelect(null);
                setSelectedFinish(null);
              }}
            >
              بازگشت به انتخاب رنگ
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
