import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import React, { useRef } from 'react';
import { fonts } from './fontData';

interface FontGridProps {
  selectedFont: string;
  onFontSelect: (font: string) => void;
}

function FontGrid({ selectedFont, onFontSelect }: FontGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleFontSelect = (font: string) => onFontSelect(font);

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
        <div className="flex gap-1.5 px-2 py-2">
          {fonts.map((font) => (
            <div
              key={font.name}
              onClick={() => handleFontSelect(font.name)}
              className={`shrink-0 flex flex-col items-center cursor-pointer rounded-sm border transition-colors min-w-[85px] px-1.5 py-1 ${
                selectedFont === font.name ? 'bg-gray-100 border-gray-400' : 'hover:bg-gray-50'
              }`}
            >
              <div className="w-[75px] h-9 bg-gray-100 rounded-sm overflow-hidden border">
                {/* {font.image && <Image src={font.image} alt={font.name} width={75} height={36} className="object-cover w-full h-full" />} */}
              </div>
              <p className="text-[10px] font-medium mt-1 truncate w-[70px] text-center" style={{ direction: 'rtl' }}>
                {font.name}
              </p>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}

export default FontGrid;
