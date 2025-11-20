'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFontStart, setFontSuccess } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';
import { fontsList } from '@/data/font/fontsList';
import { FontType } from '@/types/font';
import { FontItem } from './FontItem';
import { detectLanguage } from './detectLanguage';

function FontGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { options, text } = useSelector((state: RootState) => state.sticker);

  const handleFontSelect = (font: FontType) => {
    dispatch(setFontStart());
    dispatch(
      setFontSuccess({
        family: font.name,
        size: font.size,
        style: 'normal',
        lineHeight: font.lineHeight ?? 1.5,
        weight: 'normal',
      }),
    );
  };

  const filteredFonts = useMemo(() => {
    const lang = detectLanguage(text || '');
    return fontsList.filter((font: FontType) => {
      if (lang === 'mixed') return true;
      return lang === 'persian' ? font.isPersian : !font.isPersian;
    });
  }, [text]);

  return (
    <div ref={gridRef} className="m-2">
      <ScrollArea className="w-full h-[94px] bg-white rounded-md shadow-md border">
        <div className="flex gap-2 px-2">
          {(filteredFonts ?? []).map((font: FontType) => (
            <FontItem key={font.name} font={font} isSelected={options.font.family === font.name} onSelect={() => handleFontSelect(font)} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default FontGrid;
