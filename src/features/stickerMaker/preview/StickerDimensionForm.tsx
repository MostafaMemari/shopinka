'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { Line, setLines, setText } from '@/store/slices/stickerSlice';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import { renderStickerImage } from './renderStickerImage';
import { RootState } from '@/store';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  line: Line;
}

export default function StickerDimensionForm({ line }: Props) {
  const { lines, text } = useSelector((state: RootState) => state.sticker);

  const dispatch = useDispatch();

  // const { text, options, selectedFont } = useSelectedStickerAssets();

  // const handleAddToCart = async () => {
  //   if (!selectedFont) return;

  //   const png = await renderStickerImage({
  //     text,
  //     fontFamily: selectedFont.name,
  //     color: '#000',
  //     weight: options.weight,
  //     style: options.style,
  //     lineHeight: selectedFont.lineHeight,
  //   });

  //   const link = document.createElement('a');
  //   link.href = png;
  //   link.download = `sticker-preview-${Date.now()}.webp`;
  //   link.click();
  // };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(setLines(lines.map((l) => (l.lineNumber === line.lineNumber ? { ...l, text: value } : l))));
    dispatch(
      setText(
        lines
          .map((l) => (l.lineNumber === line.lineNumber ? { ...l, text: value } : l))
          .map((l) => l.text)
          .join('\n'),
      ),
    );
  };

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    dispatch(
      setLines(
        lines.map((l) =>
          l.lineNumber === line.lineNumber
            ? {
                ...l,
                width: Number(value),
                height: line.ratio ? Number((Number(value) / line.ratio).toFixed(1)) : null,
              }
            : l,
        ),
      ),
    );

    // if (value === '') {
    //   setWidth('');
    //   return;
    // }

    // const numValue = Number(value);

    // if (!isNaN(numValue)) {
    //   if (numValue >= 10 && numValue <= 30) {
    //     setWidth(value);
    //   } else if (numValue > 30) {
    //   } else if (numValue < 10 && numValue > 0) {
    //     setWidth(value);
    //   }
    // }
  };

  return (
    <div className="p-4 space-y-4">
      <Input placeholder="متن..." value={line.text} onChange={handleTextChange} className="flex-1 text-right" dir="rtl" />
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="عرض (cm)"
          value={line.width ? line.width.toString() : ''}
          onChange={handleWidthChange}
          className="flex-1 text-right"
          dir="rtl"
          min="10"
          max="30"
        />
        <Input
          type="number"
          placeholder="طول (cm)"
          value={line.height ? line.height.toString() : ''}
          disabled
          className="flex-1 text-right"
          dir="rtl"
        />
      </div>
      <div>
        <Textarea placeholder="توضیحات..." className="flex-1 text-right" dir="rtl" />
      </div>
    </div>
  );
}
