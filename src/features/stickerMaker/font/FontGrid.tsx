'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setFontStart, setFontSuccess } from '@/store/slices/stickerSlice';
import { FontItem } from './FontItem';
import { detectLanguage } from './detectLanguage';
import { FontItem as FontItemType } from '@/types/fontType';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';

interface Props {
  data: { items: FontItemType[] };
}

function FontGrid({ data }: Props) {
  const { selectedFont, text } = useSelectedStickerAssets();

  const gridRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleFontSelect = (font: FontItemType) => {
    dispatch(setFontStart());
    dispatch(setFontSuccess(font.id));
  };

  const isSelected = (fontId: number) => {
    return selectedFont?.id === fontId;
  };

  const filteredFonts = useMemo(() => {
    const lang = detectLanguage(text || '');
    return data?.items.filter((font: FontItemType) => {
      if (lang === 'mixed') return true;
      return lang === 'persian' ? font.isPersian : !font.isPersian;
    });
  }, [text, data?.items]);

  return (
    <div ref={gridRef} className="m-2">
      <ScrollArea className="w-full h-[94px] bg-white rounded-md shadow-md border">
        <div className="flex gap-2 px-2">
          {(filteredFonts ?? []).map((font: FontItemType) => (
            <FontItem key={font.name} font={font} isSelected={isSelected(font.id)} onSelect={() => handleFontSelect(font)} />
          ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default FontGrid;
