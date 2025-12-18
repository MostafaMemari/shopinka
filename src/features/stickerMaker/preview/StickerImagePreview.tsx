import React, { useEffect, useState } from 'react';
import { renderStickerImage } from './renderStickerImage';

interface StickerPreviewProps {
  text: string;
  fontFamily: string;
  weight?: 'normal' | 'bold' | undefined;
  style?: 'normal' | 'italic' | undefined;
  lineHeight?: number;
  onPreviewImageChange?: (image: string | null) => void;
}

export default function StickerImagePreview({ text, onPreviewImageChange, fontFamily, weight, style, lineHeight }: StickerPreviewProps) {
  const [prewImage, setPrewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!fontFamily) return;

    setIsLoading(true);

    renderStickerImage({
      text,
      fontFamily,
      color: '#000',
      weight: weight ?? 'normal',
      style: style ?? 'normal',
      lineHeight,
    }).then((dataUrl) => {
      setPrewImage(dataUrl);
      onPreviewImageChange?.(dataUrl);
      setIsLoading(false);
    });
  }, [text, fontFamily, weight, style, lineHeight]);

  return (
    <div className="w-full h-40 flex items-center justify-center">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-gray-400">در حال بارگذاری پیش‌نمایش...</span>
        </div>
      ) : (
        prewImage && <img src={prewImage} alt="Sticker Preview" className="max-h-full max-w-full object-contain" />
      )}
    </div>
  );
}
