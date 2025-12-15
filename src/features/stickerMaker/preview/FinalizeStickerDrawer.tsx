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
import FinalizePreview from './FinalizePreview';

interface FinalizeStickerDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
}

export default function FinalizeStickerDrawer({ isOpen, onOpenChange, trigger }: FinalizeStickerDrawerProps) {
  const { lines } = useSelector((state: RootState) => state.sticker);

  const { selectedFont, text, options } = useSelectedStickerAssets();
  const [isFinalized, setIsFinalized] = useState(false);

  const dispatch = useDispatch();

  const [width, setWidth] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

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

  const isFirstLine = currentLineIndex === 0;
  const isLastLine = currentLineIndex === lines.length - 1;
  const currentLine = lines[currentLineIndex];

  // <div className="w-1/2 text-left font-semibold">۲٬۳۰۰ تومان</div>

  return (
    <MobileDrawer
      open={isOpen}
      onOpenChange={onOpenChange}
      trigger={trigger}
      showClose={false}
      title="پیش نمایش"
      className="max-w-[500px] m-auto"
      actions={
        isFinalized ? (
          <Button
            size="lg"
            className="w-full"
            onClick={() => {
              console.log('Add to cart');
            }}
          >
            افزودن به سبد خرید
          </Button>
        ) : (
          lines.length > 0 && (
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex w-1/2">
                {!isLastLine ? (
                  <Button className="flex-1" onClick={() => setCurrentLineIndex((i) => i + 1)}>
                    خط بعدی
                  </Button>
                ) : (
                  <Button className="flex-1" onClick={() => setIsFinalized(true)}>
                    نهایی‌سازی
                  </Button>
                )}
              </div>

              {!isFirstLine && (
                <div className="flex w-1/2">
                  <Button variant="outline" className="flex-1" onClick={() => setCurrentLineIndex((i) => i - 1)}>
                    خط قبلی
                  </Button>
                </div>
              )}
            </div>
          )
        )
      }
    >
      {lines.length > 0 ? (
        isFinalized ? (
          <FinalizePreview lines={lines} />
        ) : currentLine ? (
          <>
            <PreviewLines
              line={currentLine}
              fontFamily={selectedFont?.name}
              fontWeight={options.weight}
              fontStyle={options.style}
              fontSize={selectedFont?.size}
            />
            <StickerDimensionForm line={currentLine} />
          </>
        ) : null
      ) : (
        <div className="text-center py-4 text-gray-500">هیچ متنی برای پیش‌نمایش وجود ندارد</div>
      )}
    </MobileDrawer>
  );
}
