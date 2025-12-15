'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import MobileDrawer from '@/components/common/Drawer';
import StickerDimensionForm from './StickerDimensionForm';
import { measureMultilineText } from '@/utils/measureText';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import PreviewLines from './PreviewLines';
import { useDispatch, useSelector } from 'react-redux';
import { setLines } from '@/store/slices/stickerSlice';
import { RootState } from '@/store';
import FinalizeSummaryDrawer from './FinalizeSummaryDrawer';
import LineNavigationButtons from './LineNavigationButtons';

interface FinalizeStickerDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
}

export default function FinalizeStickerDrawer({ isOpen, onOpenChange, trigger }: FinalizeStickerDrawerProps) {
  const dispatch = useDispatch();

  const { lines } = useSelector((state: RootState) => state.sticker);

  const { selectedFont, text, options } = useSelectedStickerAssets();

  const [isFinalDrawerOpen, setIsFinalDrawerOpen] = useState(false);

  const [width, setWidth] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (!text || !selectedFont) {
      dispatch(setLines([]));
      setWidth('');
      return;
    }

    const { total, lines } = measureMultilineText(text, { fontFamily: selectedFont.name });

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

  return (
    <>
      <FinalizeSummaryDrawer isOpen={isFinalDrawerOpen} onOpenChange={setIsFinalDrawerOpen} lines={lines} />

      <MobileDrawer
        open={isOpen}
        onOpenChange={onOpenChange}
        trigger={trigger}
        showClose={false}
        title="پیش نمایش"
        className="max-w-[500px] m-auto"
        actions={
          <LineNavigationButtons
            isFirstLine={isFirstLine}
            isLastLine={isLastLine}
            onNextLine={() => setCurrentLineIndex((i) => i + 1)}
            onPrevLine={() => setCurrentLineIndex((i) => i - 1)}
            onFinalize={() => setIsFinalDrawerOpen(true)}
          />
        }
      >
        {lines.length > 0 ? (
          currentLine ? (
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
    </>
  );
}
