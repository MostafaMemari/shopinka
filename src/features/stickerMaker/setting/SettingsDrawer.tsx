'use client';

import React from 'react';
import MobileDrawer from '@/components/common/Drawer';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setLetterSpacing, setText } from '@/store/slices/stickerSlice';
import { addSpacerBetweenChars } from '@/utils/addSpacerBetweenChars';
import TextStyleToolbar from './TextStyleToolbar';

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const dispatch = useDispatch();

  const { text, options } = useSelector((state: RootState) => state.sticker);

  return (
    <MobileDrawer open={open} onOpenChange={onClose} showClose={false} title="تنظیمات" className="max-w-[500px] m-auto" isModal={false}>
      <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto px-4 pb-8 text-sm">
        <TextStyleToolbar />

        <div className="flex flex-col gap-2">
          <label className="font-medium">فاصله بین حروف</label>
          <Slider
            value={[options?.letterSpacing || 0]}
            min={0}
            max={2}
            step={1}
            onValueChange={(val) => {
              const count = Math.round(val[0]);
              dispatch(setLetterSpacing(val[0]));

              const cleanedText = text.replace(/ـ+/g, '');
              const newText = addSpacerBetweenChars(cleanedText, count);

              console.log(newText);
              dispatch(setText(newText));
            }}
            className={cn('w-full')}
          />
        </div>
      </div>
    </MobileDrawer>
  );
}
