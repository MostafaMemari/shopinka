import { FontType } from '@/types/font';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export function FontItem({ font, isSelected, onSelect }: { font: FontType; isSelected: boolean; onSelect: () => void }) {
  const itemRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <div ref={itemRef} onClick={onSelect} className="Cell relative shrink-0" style={{ width: '134px' }}>
      <div
        className={`flex flex-col items-center cursor-pointer rounded-sm my-2 bg-white relative px-2 border ${
          isSelected ? 'border-primary bg-blue-50' : 'border-gray-200'
        }`}
      >
        <div className="w-[130px] h-[45px] overflow-hidden flex items-center justify-center">
          {visible && font.thumbnail ? (
            <Image src={font.thumbnail} alt={font.name} width={130} height={45} className="w-full h-full object-contain" />
          ) : (
            <div className="w-full h-full bg-gray-100 animate-pulse" />
          )}
        </div>

        <p
          className={`truncate w-[78px] text-center text-xs my-1 ${isSelected ? 'text-primary font-semibold' : 'text-gray-700'}`}
          style={{ direction: 'rtl' }}
        >
          {font.displayName}
        </p>
      </div>
    </div>
  );
}
