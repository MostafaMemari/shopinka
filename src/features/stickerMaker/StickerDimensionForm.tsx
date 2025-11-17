'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Props {
  width: string;
  height: string;
  note: string;
  setWidth: (value: string) => void;
  setHeight: (value: string) => void;
  setNote: (value: string) => void;
  handleDimensionChange: (e: React.ChangeEvent<HTMLInputElement>, setter: any) => void;
}

export default function StickerDimensionForm({ width, height, note, setWidth, setHeight, setNote, handleDimensionChange }: Props) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="عرض (cm)"
          value={width}
          onChange={(e) => handleDimensionChange(e, setWidth)}
          className="flex-1 text-right"
          dir="rtl"
        />

        <Input
          type="number"
          placeholder="طول (cm)"
          value={height}
          onChange={(e) => handleDimensionChange(e, setHeight)}
          className="flex-1 text-right"
          dir="rtl"
        />
      </div>

      <Textarea
        placeholder="توضیحات اضافی"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full text-right"
        dir="rtl"
      />

      <div className="grid grid-cols-12 gap-2">
        <Button className="col-span-6 w-full">افزودن به سبد خرید</Button>
        <div className="col-span-6 flex items-center justify-center font-medium">۲۳۰۰ تومان</div>
      </div>
    </div>
  );
}
