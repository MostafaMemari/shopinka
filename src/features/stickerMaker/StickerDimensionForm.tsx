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

  // تابع هندلر برای اعمال محدودیت 10 تا 30
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // اجازه می‌دهیم که فیلد خالی باشد یا عدد وارد شود
    if (value === '') {
      setWidth('');
      return;
    }

    const numValue = Number(value);

    // اگر ورودی عددی معتبر است
    if (!isNaN(numValue)) {
      // فقط در صورتی که عدد وارد شده در محدوده 10 تا 30 باشد، آن را تنظیم می‌کنیم.
      // یا اگر عدد بین 0 تا 9 باشد، اجازه می‌دهیم تایپ کند تا به 10 برسد.
      // برای سخت‌گیری بیشتر می‌توان از Math.max و Math.min استفاده کرد.
      if (numValue >= 10 && numValue <= 30) {
        setWidth(value);
      } else if (numValue > 30) {
        // در صورت بزرگتر از 30، آن را به 30 محدود کنید (اختیاری: برای UX بهتر)
        // setWidth('30');
        // در غیر این صورت، ورودی را نادیده بگیرید
      } else if (numValue < 10 && numValue > 0) {
        // برای اعدادی مثل 1 تا 9 اجازه می‌دهیم وارد شود تا کاربر بتواند 10 تا 30 را وارد کند.
        setWidth(value);
      }
    }
  };

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
          onChange={handleWidthChange} // استفاده از هندلر جدید
          className="flex-1 text-right"
          dir="rtl"
          // **ویژگی‌های HTML برای محدودیت ورودی**
          min="10"
          max="30"
          // **نکته:** برخی مرورگرها محدودیت min/max را در ورودی‌های type="number" اعمال می‌کنند، اما برای اطمینان، باید منطق را در onChange نیز بررسی کنید.
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
