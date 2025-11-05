'use client';

import React, { useState } from 'react';
import MobileDrawer from '@/components/common/Drawer';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ open, onClose }: SettingsDrawerProps) {
  const [lineHeight, setLineHeight] = useState(1.5);
  const [letterSpacing, setLetterSpacing] = useState(0);

  return (
    <MobileDrawer open={open} onOpenChange={onClose} showClose={false} title="تنظیمات" className="max-w-[500px] m-auto" isModal={false}>
      <div className="flex flex-col gap-6 max-h-[70vh] overflow-y-auto px-4 pt-4 pb-8 text-sm">
        <div className="flex flex-col gap-2">
          <label className="font-medium">فاصله بین خطوط</label>
          <Slider
            value={[lineHeight]}
            min={1.2}
            max={2}
            step={0.05}
            onValueChange={(val) => setLineHeight(val[0])}
            className={cn('w-full')}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-medium">فاصله بین حروف</label>
          <Slider
            value={[letterSpacing]}
            min={0}
            max={6}
            step={0.1}
            onValueChange={(val) => setLetterSpacing(val[0])}
            className={cn('w-full')}
          />
        </div>
      </div>
    </MobileDrawer>
  );
}
