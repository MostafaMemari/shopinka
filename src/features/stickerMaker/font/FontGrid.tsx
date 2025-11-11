import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useRef } from 'react';
import { fonts } from './fontData';
import { useDispatch, useSelector } from 'react-redux';
import { setFontStart, setFontSuccess } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';

function FontGrid() {
  const gridRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { selectedFont } = useSelector((state: RootState) => state.sticker);

  const handleFontSelect = (font: string) => {
    dispatch(setFontStart());
    dispatch(setFontSuccess(font));
  };

  return (
    <div ref={gridRef} className="m-2">
      <ScrollArea
        className="w-full h-[90px] bg-white rounded-md shadow-md border"
        onWheel={(e) => {
          const target = e.currentTarget;
          if (e.deltaY !== 0) {
            e.preventDefault();
            target.scrollLeft += e.deltaY;
          }
        }}
      >
        <div className="flex gap-2 px-2 py-2">
          {fonts.map((font) => {
            const isSelected = selectedFont === font.variable;
            return (
              <button
                key={font.name}
                onClick={() => handleFontSelect(font.variable)}
                className={`shrink-0 flex flex-col items-center cursor-pointer transition-all min-w-[85px] px-1.5 py-1 rounded-md border-2 ${
                  isSelected
                    ? 'border-blue-500 ring-2 ring-blue-300 scale-105 bg-blue-50'
                    : 'border-gray-200 hover:scale-105 hover:border-gray-400 bg-white'
                }`}
              >
                <div className="w-[75px] h-9 bg-gray-100 rounded-sm overflow-hidden border">
                  {/* {font.image && <Image src={font.image} alt={font.name} width={75} height={36} className="object-cover w-full h-full" />} */}
                </div>
                <p
                  className={`text-[10px] font-medium mt-1 text-center ${isSelected ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
                  style={{ direction: 'rtl' }}
                >
                  {font.name}
                </p>
              </button>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default FontGrid;
