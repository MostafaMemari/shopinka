'use client';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Bold, Italic, AlignLeft, AlignCenter, AlignRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setTextAlign, toggleFontWeight, toggleFontStyle } from '@/store/slices/stickerSlice';

export default function TextStyleToggleGroup() {
  const dispatch = useDispatch();
  const { options } = useSelector((state: RootState) => state.sticker);

  const itemClass =
    'data-[state=on]:bg-[var(--primary)] data-[state=on]:text-[white] cursor-pointer text-muted-foreground hover:bg-muted transition-colors rounded-md';

  const activeStyles = [...(options.fontWeight === 'bold' ? ['bold'] : []), ...(options.fontStyle === 'italic' ? ['italic'] : [])];

  return (
    <div className="flex justify-between items-center pb-4 border-b border-border">
      <ToggleGroup
        type="single"
        value={options.textAlign}
        onValueChange={(value) => value && dispatch(setTextAlign(value as 'left' | 'center' | 'right'))}
        className="gap-1"
        dir="rtl"
      >
        <ToggleGroupItem value="left" aria-label="چپ‌چین" className={itemClass}>
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="وسط‌چین" className={itemClass}>
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="راست‌چین" className={itemClass}>
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <ToggleGroup
        type="multiple"
        value={activeStyles}
        className="gap-1"
        dir="rtl"
        onValueChange={(values) => {
          if (values.includes('bold') !== (options.fontWeight === 'bold')) dispatch(toggleFontWeight());
          if (values.includes('italic') !== (options.fontStyle === 'italic')) dispatch(toggleFontStyle());
        }}
      >
        <ToggleGroupItem value="bold" aria-label="بولد" className={itemClass}>
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="ایتالیک" className={itemClass}>
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
