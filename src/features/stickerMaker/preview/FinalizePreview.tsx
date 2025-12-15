import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import React, { useEffect, useState } from 'react';
import { renderStickerImage } from './renderStickerImage';
import StickerSelectionSummary from './StickerSelectionSummary';

interface Props {
  lines: any[];
}

function FinalizePreview({ lines }: Props) {
  const { text, options, selectedFont, selectedMaterial } = useSelectedStickerAssets();
  const [prewImage, setPrewImage] = useState<string | null>(null);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);

  useEffect(() => {
    if (!selectedFont) return;

    setIsLoadingPreview(true);
    renderStickerImage({
      text,
      fontFamily: selectedFont.name,
      color: '#000',
      weight: options.weight,
      style: options.style,
      lineHeight: selectedFont.lineHeight,
    }).then((dataUrl) => {
      setPrewImage(dataUrl);
      setIsLoadingPreview(false);
    });
  }, []);

  console.log(selectedMaterial, selectedFont);

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-40 flex items-center justify-center">
        {isLoadingPreview ? (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400">در حال بارگذاری پیش‌ مایش...</span>
          </div>
        ) : (
          prewImage && <img src={prewImage} alt="Sticker Preview" className="max-h-full max-w-full object-contain" />
        )}
      </div>

      <StickerSelectionSummary font={selectedFont} material={selectedMaterial} />

      <div className="flex flex-col gap-2">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg border p-3 text-sm">
            <div className="flex flex-col">
              <span className="font-medium">{line.text}</span>
              <span className="text-xs text-gray-500">
                عرض: {line.width}cm × ارتفاع: {line.height}cm
              </span>
            </div>

            <span className="text-xs text-gray-400">خط {line.lineNumber + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinalizePreview;
