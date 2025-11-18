'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setText } from '@/store/slices/stickerSlice';

interface Props {
  width: string;
  height: string;
  note: string;

  setWidth: (value: string) => void;
  setNote: (value: string) => void;
}

export default function StickerDimensionForm({ width, height, note, setWidth, setNote }: Props) {
  const dispatch = useDispatch();
  const { text } = useSelector((state: RootState) => state.sticker);

  return (
    <div className="p-4 space-y-4">
      <Input
        type="text"
        placeholder="لطفا متن خود را اینجا وارد کنید"
        value={text}
        onChange={(e) => dispatch(setText(e.target.value))}
        className="flex-1 text-right"
        dir="rtl"
      />
      <div className="flex gap-4">
        <Input
          type="number"
          placeholder="عرض (cm)"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="flex-1 text-right"
          dir="rtl"
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
        <Button className="col-span-6 w-full">افزودن به سبد خرید</Button>
        <div className="col-span-6 flex items-center justify-center font-medium">۲۳۰۰ تومان</div>
      </div>
    </div>
  );
}
