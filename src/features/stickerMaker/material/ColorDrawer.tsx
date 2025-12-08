'use client';

import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import MobileDrawer from '@/components/common/Drawer';
import { Button } from '@/components/ui/button';

interface ColorItem {
  name: string;
  value: string;
  finishes?: string[]; // انواع فینیش‌های قابل انتخاب
}

const colors: ColorItem[] = [
  { name: 'قرمز', value: '#ef4444', finishes: ['مات', 'براق', 'شبرنگ', 'شب‌تاب'] },
  { name: 'آبی', value: '#3b82f6', finishes: ['مات', 'براق'] },
  { name: 'سبز', value: '#22c55e', finishes: ['مات', 'براق'] },
  { name: 'زرد', value: '#eab308', finishes: ['مات', 'شبرنگ'] },
  { name: 'نارنجی', value: '#f97316', finishes: ['مات', 'براق', 'شب‌تاب'] },
  { name: 'بنفش', value: '#a855f7' }, // بدون فینیش خاص
  { name: 'صورتی', value: '#ec4899', finishes: ['براق'] },
  { name: 'آبی آسمانی', value: '#38bdf8', finishes: ['مات'] },
  { name: 'خاکستری', value: '#9ca3af' },
  { name: 'مشکی', value: '#000000', finishes: ['مات', 'براق'] },
];

interface ColorDrawerProps {
  open: boolean;
  onClose: () => void;
  onSelect?: (result: { color: ColorItem; finish?: string }) => void;
}

export default function ColorDrawer({ open, onClose, onSelect }: ColorDrawerProps) {
  const [selectedColor, setSelectedColor] = useState<ColorItem | null>(null);
  const [selectedFinish, setSelectedFinish] = useState<string | null>(null);

  const handleColorSelect = (color: ColorItem) => {
    setSelectedColor(color);
    setSelectedFinish(null);

    // اگه فینیش نداشت، مستقیم انتخاب نهایی انجام بده
    if (!color.finishes || color.finishes.length === 0) {
      onSelect?.({ color });
      onClose();
    }
  };

  const handleFinishSelect = (finish: string) => {
    if (!selectedColor) return;
    setSelectedFinish(finish);
    onSelect?.({ color: selectedColor, finish });
    onClose();
  };

  return (
    <MobileDrawer
      open={open}
      onOpenChange={onClose}
      title={!selectedColor ? 'انتخاب رنگ' : 'انتخاب نوع برچسب'}
      className="max-w-[500px] m-auto"
    >
      {!selectedColor ? (
        // مرحله اول: انتخاب رنگ
        <ScrollArea className="h-full">
          <div className="grid grid-cols-5 gap-2 px-3 pb-2">
            {colors.map((color) => (
              <button
                key={color.value}
                onClick={() => handleColorSelect(color)}
                className="shrink-0 flex flex-col items-center cursor-pointer transition-all min-w-[60px]"
              >
                <div className={`w-10 h-10 rounded-full border-2 ${'border-gray-300'}`} style={{ backgroundColor: color.value }} />
                <p className="text-[10px] font-medium mt-1 text-center" style={{ direction: 'rtl' }}>
                  {color.name}
                </p>
              </button>
            ))}
          </div>
        </ScrollArea>
      ) : (
        // مرحله دوم: انتخاب نوع فینیش (مات / براق / ...)
        <div className="flex flex-col items-center justify-center gap-4 py-6">
          <div className="w-16 h-16 rounded-full border" style={{ backgroundColor: selectedColor.value }}></div>

          <div className="flex flex-wrap justify-center gap-3">
            {selectedColor.finishes?.map((finish) => (
              <Button key={finish} variant={selectedFinish === finish ? 'default' : 'outline'} onClick={() => handleFinishSelect(finish)}>
                {finish}
              </Button>
            ))}
          </div>

          <Button variant="ghost" onClick={() => setSelectedColor(null)}>
            بازگشت به انتخاب رنگ
          </Button>
        </div>
      )}
    </MobileDrawer>
  );
}
