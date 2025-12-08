'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setText } from '@/store/slices/stickerSlice';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import { renderStickerImage } from './renderStickerImage';

interface Props {
  width: string;
  height: string;
  note: string;

  setWidth: (value: string) => void;
  setNote: (value: string) => void;
}

export default function StickerDimensionForm({ width, height, note, setWidth, setNote }: Props) {
  const dispatch = useDispatch();
  const { text, options, selectedMaterial, selectedFont } = useSelectedStickerAssets();

  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === '') {
      setWidth('');
      return;
    }

    const numValue = Number(value);

    if (!isNaN(numValue)) {
      if (numValue >= 10 && numValue <= 30) {
        setWidth(value);
      } else if (numValue > 30) {
      } else if (numValue < 10 && numValue > 0) {
        setWidth(value);
      }
    }
  };

  const handleAddToCart = async () => {
    if (!selectedFont) return;

    const png = await renderStickerImage({
      text,
      fontFamily: selectedFont.name,
      color: '#000',
      weight: options.weight,
      style: options.style,
    });

    const link = document.createElement('a');
    link.href = png;
    link.download = `sticker-preview-${Date.now()}.webp`;
    link.click();
  };

  return (
    <div className="p-4 space-y-4">
      <Textarea
        placeholder="متن..."
        value={text}
        onChange={(e) => dispatch(setText(e.target.value))}
        className="flex-1 text-right h-24 resize-none text-sm"
        dir="rtl"
      />
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="عرض (cm)"
          value={width}
          onChange={handleWidthChange}
          className="flex-1 text-right"
          dir="rtl"
          min="10"
          max="30"
        />
        <Input type="number" placeholder="طول (cm)" value={height} disabled className="flex-1 text-right" dir="rtl" />
      </div>

      <Textarea
        placeholder="توضیحات اضافی"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full text-right"
        dir="rtl"
      />

      <div className="grid grid-cols-12 gap-2">
        <Button onClick={handleAddToCart} className="col-span-6 w-full">
          افزودن به سبد خرید
        </Button>
        <div className="col-span-6 flex items-center justify-center font-medium">۲۳۰۰ تومان</div>
      </div>
    </div>
  );
}
