'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFontStart, setFontSuccess } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';
import { FontItem } from './FontItem';
import { detectLanguage } from './detectLanguage';
import { useFont } from '@/features/font/hooks/useFont';
import { FontItem as FontItemType } from '@/types/fontType';

function FontGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useFont({ params: { includeThumbnail: true, includeFile: true } });

  const dispatch = useDispatch();
  const { options, text } = useSelector((state: RootState) => state.sticker);

  const handleFontSelect = (font: FontItemType) => {
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
    return data?.items.filter((font: FontItemType) => {
      if (lang === 'mixed') return true;
      return lang === 'persian' ? font.isPersian : !font.isPersian;
    });
  }, [text, data?.items]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-50">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={gridRef} className="m-2">
      <ScrollArea className="w-full h-[94px] bg-white rounded-md shadow-md border">
        <div className="flex gap-2 px-2">
          {(filteredFonts ?? []).map((font: FontItemType) => (
            <FontItem key={font.name} font={font} isSelected={options.font.family === font.name} onSelect={() => handleFontSelect(font)} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default FontGrid;
