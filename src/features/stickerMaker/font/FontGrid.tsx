'use client';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFontStart, setFontSuccess } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';
import { FontItem } from './FontItem';
import { detectLanguage } from './detectLanguage';
import { FontItem as FontItemType } from '@/types/fontType';
import { Skeleton } from '@/components/ui/skeleton';

interface Props {
  data: { items: FontItemType[] } | undefined;
  isLoading: boolean;
}

function FontGrid({ data, isLoading }: Props) {
  const gridRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();
  const { options, text } = useSelector((state: RootState) => state.sticker);

  const handleFontSelect = (font: FontItemType) => {
    dispatch(setFontStart());
    dispatch(
      setFontSuccess({
        id: font.id,
        family: font.name,
        size: font.size,
        lineHeight: font.lineHeight,
        style: 'normal',
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

  return (
    <div ref={gridRef} className="m-2">
      <ScrollArea className="w-full h-[94px] bg-white rounded-md shadow-md border">
        <div className="flex gap-2 px-2">
          {isLoading
            ? [...Array(5)].map((_, i) => (
                <div key={i}>
                  <div className="Cell relative shrink-0" style={{ width: '134px' }}>
                    <div className="flex flex-col items-center rounded-sm my-2 bg-white relative px-2 border border-gray-200">
                      <div className="w-[130px] h-[45px] overflow-hidden flex items-center justify-center">
                        <Skeleton className="w-full h-full rounded-sm" />
                      </div>

                      <Skeleton className="w-[78px] h-[12px] mt-2 rounded-sm" />
                    </div>
                  </div>
                </div>
              ))
            : (filteredFonts ?? []).map((font: FontItemType) => (
                <FontItem
                  key={font.name}
                  font={font}
                  isSelected={options?.font?.family === font.name}
                  onSelect={() => handleFontSelect(font)}
                />
              ))}
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default FontGrid;
