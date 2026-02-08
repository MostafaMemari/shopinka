'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import AppDialog from '@/components/wrappers/AppDialog';
import StickerDimensionForm from './StickerDimensionForm';
import PreviewLines from './PreviewLines';
import LineNavigationButtons from './LineNavigationButtons';

import { measureMultilineText } from '@/utils/measureText';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import { setLines } from '@/store/slices/stickerSlice';

interface FinalizeStickerDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
  onFinalize?: () => void;
}

export default function FinalizeStickerDialog({ isOpen, onOpenChange, onFinalize, trigger }: FinalizeStickerDialogProps) {
  const dispatch = useDispatch();

  const { selectedFont, text, options, lines } = useSelectedStickerAssets();

  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isCurrentLineValid, setIsCurrentLineValid] = useState(false);
  const [, setWidth] = useState('');

  useEffect(() => {
    if (!isOpen) {
      dispatch(setLines([]));
      setCurrentLineIndex(0);
      setIsCurrentLineValid(false);
      setWidth('');
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (!isOpen) return;

    if (!text || !selectedFont) {
      dispatch(setLines([]));
      return;
    }

    const { lines: measuredLines } = measureMultilineText(text, {
      fontFamily: selectedFont.name,
    });

    dispatch(
      setLines(
        measuredLines.map((line, index) => ({
          text: line.text,
          ratio: line.width / line.height,
          lineNumber: index + 1,
          width: lines[index]?.width ?? null,
          height: lines[index]?.height ?? null,
        })),
      ),
    );
  }, [text, selectedFont, isOpen]);

  const hasLines = lines.length > 0;
  const isFirstLine = currentLineIndex === 0;
  const isLastLine = currentLineIndex === lines.length - 1;
  const currentLine = lines[currentLineIndex];

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      dispatch(setLines([]));
      setCurrentLineIndex(0);
      setIsCurrentLineValid(false);
    }
    onOpenChange(open);
  };

  return (
    <AppDialog
      open={isOpen}
      onOpenChange={handleOpenChange}
      trigger={trigger}
      title="پیش‌نمایش"
      showClose={false}
      className="max-w-[500px] m-auto"
      actions={
        hasLines && (
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
      {hasLines && currentLine ? (
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
      ) : (
        <div className="py-4 text-center text-gray-500">هیچ متنی برای پیش‌نمایش وجود ندارد</div>
      )}
    </AppDialog>
  );
}
