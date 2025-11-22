'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MobileDrawer from '@/components/common/Drawer';
import { ArrowUp, ArrowLeft } from 'lucide-react';
import StickerDimensionForm from './StickerDimensionForm';
import { measureText } from '@/utils/measureText';

interface FinalizeStickerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FinalizeStickerDrawer({ isOpen, onClose }: FinalizeStickerDrawerProps) {
  const { text, options } = useSelector((state: RootState) => state.sticker);

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (!text) {
      setHeight('');
      setWidth('');
      return;
    }
    if (!options.font.family) return;
    if (!width) setHeight('');

    const ratio = measureText(text, { fontFamily: options.font.family });

    if (width && ratio) {
      const calculatedHeight = Number(width) / ratio;
      setHeight(calculatedHeight.toFixed(1));
    }
  }, [options.font.family, width, text]);

  console.log(text);

  const displayWidth = width ? `${width} سانتی‌متر` : '?? سانتی‌متر';
  const displayHeight = height ? `${height} سانتی‌متر` : '?? سانتی‌متر';

  const dimensionLineClasses = 'absolute text-[10px] text-gray-500 font-medium whitespace-nowrap bg-white px-1 z-10';

  return (
    <MobileDrawer open={isOpen} onOpenChange={onClose} showClose={false} title="پیش نمایش" className="max-w-[500px] m-auto">
      <div className="relative border-b min-h-[120px] flex items-center justify-center">
        {width && (
          <div className={`${dimensionLineClasses} top-0 left-1/2 -translate-x-1/2 flex items-center`}>
            <ArrowLeft className="w-2 h-2 text-red-500 mr-1 rotate-180" />
            <span className="text-red-500">{displayWidth}</span>
            <ArrowLeft className="w-2 h-2 text-red-500 ml-1" />
          </div>
        )}

        {height && (
          <div className={`${dimensionLineClasses} -left-9 top-1/2 -translate-y-1/2 flex items-center transform -rotate-90`}>
            <ArrowUp className="w-2 h-2 text-red-500 mr-1 rotate-90" />
            <span className="text-red-500">{displayHeight}</span>
            <ArrowUp className="w-2 h-2 text-red-500 ml-1 -rotate-90" />
          </div>
        )}

        {width && <div className="absolute left-0 right-0 top-2 border-b border-dashed border-red-300 pointer-events-none"></div>}
        {height && <div className="absolute top-0 bottom-0 left-2 border-l border-dashed border-red-300 pointer-events-none mb-3"></div>}

        <div
          style={{
            fontFamily: options.font.family || 'inherit',
            fontWeight: options.font.weight,
            fontStyle: options.font.style,
            color: '#000000',
            fontSize: `${options.font.size * 0.8}rem`,
            lineHeight: options.font.lineHeight || 1.2,
            width: '100%',
            maxWidth: '100%',
            whiteSpace: 'pre',
            overflowX: 'auto',
          }}
          className="relative z-0 text-center p-2 mb-3"
        >
          {text}
        </div>
      </div>

      <StickerDimensionForm width={width} height={height} note={note} setWidth={setWidth} setNote={setNote} />
    </MobileDrawer>
  );
}
