'use client';

import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MobileDrawer from '@/components/common/Drawer';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import StickerDimensionForm from './StickerDimensionForm';
import { usePersianTextRatio } from '@/hooks/useCanvasTextMetrics';

interface FinalizeStickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinalizeStickerDrawer({ isOpen, onClose }: FinalizeStickerDrawerProps) {
  const { text, options } = useSelector((state: RootState) => state.sticker);

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [note, setNote] = useState('');

  const ratio = usePersianTextRatio(text, options.fontFamily);

  const handleDimensionChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<number | ''>>) => {
    const value = e.target.value;

    if (value !== '' && (isNaN(Number(value)) || Number(value) <= 0)) return;

    const parsed = value === '' ? '' : Number(value);
    setter(parsed);

    if (setter === setWidth && parsed !== '' && ratio) {
      const calculatedHeight = parsed / ratio;
      setHeight(calculatedHeight.toFixed(1));
    }
  };

  const displayWidth = width ? `${width} سانتی‌متر` : '?? سانتی‌متر';
  const displayHeight = height ? `${height} سانتی‌متر` : '?? سانتی‌متر';

  const dimensionLineClasses = 'absolute text-[10px] text-gray-500 font-medium whitespace-nowrap bg-white px-1 z-10';

  return (
    <MobileDrawer open={isOpen} onOpenChange={onClose} showClose={false} title="تنظیمات" className="max-w-[500px] m-auto">
      {/* پیش‌نمایش استیکر */}
      <div className="relative p-2 border-b min-h-[120px] flex items-center justify-center">
        {/* خط و ابعاد width */}
        {width && (
          <div className={`${dimensionLineClasses} top-0 left-1/2 -translate-x-1/2 flex items-center`}>
            <ArrowLeft className="w-2 h-2 text-red-500 mr-1 rotate-180" />
            <span className="text-red-500">{displayWidth}</span>
            <ArrowLeft className="w-2 h-2 text-red-500 ml-1" />
          </div>
        )}

        {/* خط و ابعاد height */}
        {height && (
          <div className={`${dimensionLineClasses} -left-9 top-1/2 -translate-y-1/2 flex items-center transform -rotate-90`}>
            <ArrowUp className="w-2 h-2 text-red-500 mr-1 rotate-90" />
            <span className="text-red-500">{displayHeight}</span>
            <ArrowUp className="w-2 h-2 text-red-500 ml-1 -rotate-90" />
          </div>
        )}

        {/* خطوط راهنما */}
        {width && <div className="absolute left-0 right-0 top-2 border-b border-dashed border-red-300 pointer-events-none"></div>}
        {height && <div className="absolute top-0 bottom-0 left-2 border-l border-dashed border-red-300 pointer-events-none"></div>}

        {/* متن استیکر */}
        <div
          style={{
            border: '1px dashed #ccc',
            display: 'inline-block',
          }}
        >
          <div
            style={{
              fontFamily: options.fontFamily,
              fontWeight: options.fontWeight,
              fontStyle: options.fontStyle,
              color: options.color?.value || '#000000',
              whiteSpace: 'pre-wrap',
              fontSize: '1.6rem',
            }}
            className="relative z-0"
          >
            {text}
          </div>
        </div>
      </div>

      {/* فرم تغییر ابعاد */}
      <StickerDimensionForm
        width={width}
        height={height}
        note={note}
        setWidth={setWidth}
        setHeight={setHeight}
        setNote={setNote}
        handleDimensionChange={handleDimensionChange}
      />
    </MobileDrawer>
  );
}
