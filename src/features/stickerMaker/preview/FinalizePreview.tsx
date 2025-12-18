import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';
import React from 'react';
import StickerSelectionSummary from './StickerSelectionSummary';
import StickerLineDimensions from './StickerLineDimensions';
import StickerImagePreview from './StickerImagePreview';

interface Props {
  lines: any[];
  onPreviewImageChange?: (image: string | null) => void;
}

function FinalizePreview({ lines, onPreviewImageChange }: Props) {
  const { text, options, selectedFont } = useSelectedStickerAssets();

  return (
    <div className="flex flex-col gap-4">
      <StickerImagePreview
        text={text}
        onPreviewImageChange={onPreviewImageChange}
        fontFamily={selectedFont?.name || ''}
        weight={options.weight}
        style={options.style}
        lineHeight={selectedFont?.lineHeight}
      />

      <StickerSelectionSummary />

      <div className="flex flex-col gap-2">
        {lines.map((line, index) => (
          <div key={index} className="flex items-center justify-between rounded-lg border p-3 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-medium">{line.text}</span>

              <StickerLineDimensions width={line.width} height={line.height} />
            </div>

            <span className="text-xs text-gray-400">خط {line.lineNumber + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FinalizePreview;
