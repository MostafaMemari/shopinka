'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import MobileDrawer from '@/components/common/Drawer';
import StickerDimensionForm from './StickerDimensionForm';
import { measureMultilineText } from '@/utils/measureText';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import PreviewLines from './PreviewLines';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setLines } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';

interface FinalizeStickerDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
}

export default function FinalizeStickerDrawer({ isOpen, onOpenChange, trigger }: FinalizeStickerDrawerProps) {
  const { selectedFont, text, options } = useSelectedStickerAssets();
  const { lines } = useSelector((state: RootState) => state.sticker);

  const dispatch = useDispatch();

  const [width, setWidth] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  console.log('object');

  useEffect(() => {
    if (!text || !selectedFont) {
      dispatch(setLines([]));
      setWidth('');
      return;
    }

    const { total, lines } = measureMultilineText(text, { fontFamily: selectedFont.name });

    // if (width && !isNaN(Number(width)) && total.ratio) {
    //   const calculatedHeight = Number(width) / total.ratio;
    //   setHeight(calculatedHeight.toFixed(1));
    // } else {
    //   setHeight('');
    // }

    dispatch(
      setLines(
        lines.map((line, index) => ({
          text: line.text,
          ratio: line.width / line.height,
          lineNumber: index,
        })),
      ),
    );
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
          <StickerDimensionForm line={currentLine} />
        </>
      ) : (
        <div className="text-center py-4 text-gray-500">هیچ متنی برای پیش‌نمایش وجود ندارد</div>
      )}
    </MobileDrawer>
  );
}
