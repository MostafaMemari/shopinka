'use client';

import React from 'react';
import MobileDrawer from '@/components/common/Drawer';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setLetterSpacing, setLineHeight, setText } from '@/store/slices/stickerSlice';
import { addSpacerBetweenChars } from '@/utils/addSpacerBetweenChars';

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const dispatch = useDispatch();

  const { text, options } = useSelector((state: RootState) => state.sticker);

  return (
    <MobileDrawer open={open} onOpenChange={onClose} showClose={false} title="تنظیمات" className="max-w-[500px] m-auto" isModal={false}>
      <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto px-4 pt-4 pb-8 text-sm">
        <div className="flex flex-col gap-2">
          <label className="font-medium">فاصله بین خطوط</label>
          <Slider
            value={[options.lineHeight]}
            min={1.2}
            max={2}
            step={0.05}
            onValueChange={(val) => dispatch(setLineHeight(val[0]))}
            className={cn('w-full')}
          />
        </div>
        <Slider
          value={[options.letterSpacing]}
          min={0}
          max={6}
          step={1}
          onValueChange={(val) => {
            const count = Math.round(val[0]);
            dispatch(setLetterSpacing(val[0]));

            // حذف تمام spacerهای قبلی قبل از اعمال تعداد جدید
            const cleanedText = text.replace(/ـ+/g, '');
            const newText = addSpacerBetweenChars(cleanedText, count);

            console.log(newText);
            dispatch(setText(newText));
          }}
          className={cn('w-full')}
        />
      </div>
    </MobileDrawer>
  );
}
