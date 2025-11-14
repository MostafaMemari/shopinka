'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import MobileDrawer from '@/components/common/Drawer';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface FinalizeStickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinalizeStickerDrawer({ isOpen, onClose }: FinalizeStickerDrawerProps) {
  const { text, options } = useSelector((state: RootState) => state.sticker);

  const [width, setWidth] = useState(''); // عرض (عمودی)
  const [height, setHeight] = useState(''); // طول (افقی)
  const [note, setNote] = useState('');
  const [price, setPrice] = useState<number | null>(null);

  const displayWidth = width ? `${width} سانتی‌متر` : '?? سانتی‌متر';
  const displayHeight = height ? `${height} سانتی‌متر` : '?? سانتی‌متر';

  const dimensionLineClasses = 'absolute text-[10px] text-gray-500 font-medium whitespace-nowrap bg-white px-1 z-10';

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    const value = e.target.value;
    if (value === '' || (Number(value) > 0 && !isNaN(Number(value)))) {
      setter(value);
    }
  };

  return (
    <MobileDrawer open={isOpen} onOpenChange={onClose} showClose={false} title="تنظیمات" className="max-w-[500px] m-auto">
      <div className="relative p-4 border-b min-h-[150px] flex items-center justify-center">
        {height && (
          <div className={`${dimensionLineClasses} bottom-0 left-1/2 -translate-x-1/2 flex items-center`}>
            <ArrowLeft className="w-2 h-2 text-red-500 mr-1 rotate-180" />
            <span className="text-red-500">{displayHeight}</span>
            <ArrowLeft className="w-2 h-2 text-red-500 ml-1" />
          </div>
        )}

        {width && (
          <div className={`${dimensionLineClasses} -left-8 top-1/2 -translate-y-1/2 flex items-center transform -rotate-90`}>
            <ArrowUp className="w-2 h-2 text-red-500 mr-1 rotate-90" />
            <span className="text-red-500">{displayWidth}</span>
            <ArrowUp className="w-2 h-2 text-red-500 ml-1 -rotate-90" />
          </div>
        )}

        {height && <div className="absolute left-0 right-0 bottom-2 border-b border-dashed border-red-300 pointer-events-none"></div>}
        {width && <div className="absolute top-0 bottom-0 left-2 border-l border-dashed border-red-300 pointer-events-none"></div>}

        <div
          style={{
            fontFamily: options.fontFamily,
            lineHeight: options.lineHeight,
            textAlign: options.textAlign,
            fontWeight: options.fontWeight,
            fontStyle: options.fontStyle,
            color: options.color?.value || '#000000',
            whiteSpace: 'pre-wrap',
            fontSize: '1.5rem',
          }}
          className="p-4 relative z-0"
        >
          {text}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex gap-4">
          <Input
            type="number"
            placeholder="عرض (cm)"
            value={width}
            onChange={(e) => handleDimensionChange(e, setWidth)}
            className="flex-1 text-right"
            dir="rtl"
          />

          <Input
            type="number"
            placeholder="طول (cm)"
            value={height}
            onChange={(e) => handleDimensionChange(e, setHeight)}
            className="flex-1 text-right"
            dir="rtl"
          />
        </div>

        <Textarea
          placeholder="توضیحات اضافی"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full text-right"
          dir="rtl"
        />

        <Button className="w-full">محاسبه قیمت</Button>
      </div>
    </MobileDrawer>
  );
}
