'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import StickerDimensionForm from './StickerDimensionForm';
import { measureMultilineText } from '@/utils/measureText';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import PreviewLines from './PreviewLines';
import { useDispatch } from 'react-redux';
import { setLines } from '@/store/slices/stickerSlice';
import LineNavigationButtons from './LineNavigationButtons';
import AppDialog from '@/components/wrappers/AppDialog';

interface FinalizeStickerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  onFinalize?: () => void;
}

export default function FinalizeStickerDialog({ isOpen, onOpenChange, onFinalize, trigger }: FinalizeStickerDialogProps) {
  const dispatch = useDispatch();

  const { selectedFont, text, options, lines } = useSelectedStickerAssets();

  const [isCurrentLineValid, setIsCurrentLineValid] = useState(false);

  const [width, setWidth] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);

  useEffect(() => {
    if (!text || !selectedFont) {
      dispatch(setLines([]));
      setWidth('');
      return;
    }

    const { lines: measuredLines } = measureMultilineText(text, { fontFamily: selectedFont.name });

    dispatch(
      setLines(
        measuredLines.map((line, index) => ({
          text: line.text,
          ratio: line.width / line.height,
          lineNumber: index + 1,
          width: lines[index]?.width || null,
          height: lines[index]?.height || null,
        })),
      ),
    );
  }, [text, selectedFont, width]);

  const isLines = lines.length > 0;
  const isFirstLine = currentLineIndex === 0;
  const isLastLine = currentLineIndex === lines.length - 1;
  const currentLine = lines[currentLineIndex];

  return (
    <AppDialog
      open={isOpen}
      onOpenChange={onOpenChange}
      trigger={trigger}
      title="پیش نمایش"
      showClose={false}
      className="max-w-[500px] m-auto"
      actions={
        isLines && (
          <LineNavigationButtons
            isFirstLine={isFirstLine}
            isLastLine={isLastLine}
            disabledNext={!isCurrentLineValid}
            disabledFinalize={!isCurrentLineValid}
            onNextLine={() => setCurrentLineIndex((i) => i + 1)}
            onPrevLine={() => setCurrentLineIndex((i) => i - 1)}
            onFinalize={onFinalize || (() => {})}
          />
        )
      }
    >
      {lines.length > 0 ? (
        currentLine ? (
          <>
            <PreviewLines
              key={currentLine.lineNumber}
              line={currentLine}
              fontFamily={selectedFont?.name}
              fontWeight={options.weight}
              fontStyle={options.style}
              fontSize={selectedFont?.size}
            />

            <StickerDimensionForm line={currentLine} onValidityChange={setIsCurrentLineValid} />
          </>
        ) : null
      ) : (
        <div className="text-center py-4 text-gray-500">هیچ متنی برای پیش‌نمایش وجود ندارد</div>
      )}
    </AppDialog>
  );
}
