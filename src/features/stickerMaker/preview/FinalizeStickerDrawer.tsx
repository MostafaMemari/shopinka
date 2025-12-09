'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import MobileDrawer from '@/components/common/Drawer';
import StickerDimensionForm from './StickerDimensionForm';
import { measureMultilineText } from '@/utils/measureText';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import PreviewLines from './PreviewLines';
import { Button } from '@/components/ui/button';

interface FinalizeStickerDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
}

export default function FinalizeStickerDrawer({ isOpen, onOpenChange, trigger }: FinalizeStickerDrawerProps) {
  const { selectedFont, text, options } = useSelectedStickerAssets();

  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [note, setNote] = useState('');
  const [lines, setLines] = useState<{ text: string; width: number; height: number }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (!text || !selectedFont) {
      setLines([]);
      setHeight('');
      setWidth('');
      return;
    }

    const { total, lines } = measureMultilineText(text, { fontFamily: selectedFont.name });
    setLines(lines);

    if (width && !isNaN(Number(width)) && total.ratio) {
      const calculatedHeight = Number(width) / total.ratio;
      setHeight(calculatedHeight.toFixed(1));
    } else {
      setHeight('');
    }

    setCurrentLineIndex(0);
  }, [text, selectedFont, width]);

  const currentLine = lines[currentLineIndex];
  const isLastLine = currentLineIndex === lines.length - 1;

  return (
    <MobileDrawer
      open={isOpen}
      onOpenChange={onOpenChange}
      trigger={trigger}
      showClose={false}
      title="پیش نمایش"
      className="max-w-[500px] m-auto"
      actions={
        lines.length > 0 ? (
          <div className="grid grid-cols-12 gap-2">
            {!isLastLine ? (
              <Button className="col-span-6 w-full" onClick={() => setCurrentLineIndex((prev) => prev + 1)}>
                بعدی
              </Button>
            ) : (
              <Button className="col-span-6 w-full" onClick={() => setCurrentLineIndex(0)}>
                بازگشت به خط اول
              </Button>
            )}
            <div className="col-span-6 flex items-center justify-center font-medium">۲۳۰۰ تومان</div>
          </div>
        ) : null
      }
    >
      {lines.length > 0 && currentLine ? (
        <>
          <PreviewLines
            line={currentLine}
            fontFamily={selectedFont?.name}
            fontWeight={options.weight}
            fontStyle={options.style}
            lineHeight={selectedFont?.lineHeight}
          />
          <StickerDimensionForm width={width} height={height} note={note} setWidth={setWidth} setNote={setNote} />
        </>
      ) : (
        <div className="text-center py-4 text-gray-500">هیچ متنی برای پیش‌نمایش وجود ندارد</div>
      )}
    </MobileDrawer>
  );
}
