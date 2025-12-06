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
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';

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

  return (
    <div ref={gridRef} className="m-2">
      <ScrollArea className="w-full h-[94px] bg-white rounded-md shadow-md border">
        <div className="flex gap-2 px-2">
          {!isLoading
            ? [...Array(5)].map((_, index) => (
                <motion.div key={index} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.03 }}>
                  <div className="Cell relative shrink-0" style={{ width: '134px' }}>
                    <div className="flex flex-col items-center rounded-sm my-2 bg-white relative px-2 border border-gray-200">
                      <div className="w-[130px] h-[45px] overflow-hidden flex items-center justify-center">
                        <Skeleton className="w-full h-full rounded-sm" />
                      </div>

                      <Skeleton className="w-[78px] h-[12px] mt-2 rounded-sm" />
                    </div>
                  </div>
                </motion.div>
              ))
            : (filteredFonts ?? []).map((font: FontItemType) => (
                <FontItem
                  key={font.name}
                  font={font}
                  isSelected={options.font.family === font.name}
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
