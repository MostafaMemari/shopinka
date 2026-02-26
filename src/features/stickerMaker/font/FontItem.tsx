'use client';

import { type FontItem as FontType } from '@/types/fontType';
import Image from '@/components/common/UnoptimizedImage';
import { useEffect, useRef, useState } from 'react';

interface Props {
  font: FontType;
  isSelected: boolean;
  onSelect: () => void;
}

export function FontCard({ font, isSelected, onSelect }: Props) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = itemRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  const active = mounted && isSelected;

  return (
    <div ref={itemRef} onClick={onSelect} className="relative shrink-0" style={{ width: '134px' }}>
      <div
        className={`flex flex-col items-center cursor-pointer rounded-sm my-2 bg-white relative px-2 border transition-colors ${
          active ? 'border-primary bg-blue-50' : 'border-gray-200'
        }`}
      >
        <div className="w-[130px] h-[45px] overflow-hidden flex items-center justify-center">
          {visible && font.thumbnail ? (
            <Image src={font.thumbnail.fileUrl} alt={font.name} width={130} height={45} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-gray-100 animate-pulse" />
          )}
        </div>

        <p
          className={`truncate w-[78px] text-center text-xs my-1 ${active ? 'text-primary font-semibold' : 'text-gray-700'}`}
          style={{ direction: 'rtl' }}
        >
          {font.displayName}
        </p>
      </div>
    </div>
  );
}
