import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useRef, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFontStart, setFontSuccess } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';
import { fontsList } from '@/data/font/fontsList';
import Image from 'next/image';
import { fontType } from '@/types/font';

function FontGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const { options, text } = useSelector((state: RootState) => state.sticker);

  const handleFontSelect = (font: string) => {
    dispatch(setFontStart());
    dispatch(setFontSuccess(font));
  };

  const detectLanguage = (text: string): 'persian' | 'english' | 'mixed' => {
    if (!text.trim()) return 'persian';
    const persianRegex = /[\u0600-\u06FF]/;
    const latinRegex = /[a-zA-Z]/;

    const hasPersian = persianRegex.test(text);
    const hasLatin = latinRegex.test(text);

    if (hasPersian && !hasLatin) return 'persian';
    if (!hasPersian && hasLatin) return 'english';
    return 'mixed';
  };

  const filteredFonts = useMemo(() => {
    const lang = detectLanguage(text || '');
    return fontsList.filter((font: fontType) => {
      if (lang === 'mixed') return true;
      return lang === 'persian' ? font.isPersian : !font.isPersian;
    });
  }, [text]);

  return (
    <div ref={gridRef} className="m-2">
      <ScrollArea
        className="w-full h-[94px] bg-white rounded-md shadow-md border"
        onWheel={(e) => {
          const target = e.currentTarget;
          if (e.deltaY !== 0) {
            e.preventDefault();
            target.scrollLeft += e.deltaY;
          }
        }}
      >
        <div className="flex gap-2 px-2">
          {filteredFonts.map((font: fontType) => {
            const isSelected = options.fontFamily === font.name;
            return (
              <div
                key={font.name}
                onClick={() => handleFontSelect(font.code)}
                className="Cell relative shrink-0"
                style={{ width: '134px' }}
              >
                <div
                  className={`flex flex-col items-center cursor-pointer rounded-sm my-2 bg-white relative px-2 border ${
                    isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  <div className="w-[134px] h-[45px] overflow-hidden">
                    {font.thumbnail && (
                      <Image src={font.thumbnail} alt={font.name} width={134} height={45} className="object-cover w-full h-full" />
                    )}
                  </div>

                  <p
                    className={`truncate w-[78px] text-center text-xs my-1 ${isSelected ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                    style={{ direction: 'rtl' }}
                  >
                    {font.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default FontGrid;
