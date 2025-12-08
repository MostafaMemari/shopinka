'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useMemo } from 'react';
import { FontItem } from '@/types/fontType';
import { MaterialStickerItem } from '@/types/materialStickerType';
import { useStickerData } from '@/features/stickerMaker/StickerDataContext';

export const useSelectedStickerAssets = () => {
  const { fontId, materialId, text, options } = useSelector((state: RootState) => state.sticker);

  const { fontData, materialData } = useStickerData();

  const selectedFont = useMemo(() => {
    if (!fontData) return null;
    return fontData.find((f: FontItem) => f.id === fontId) || null;
  }, [fontData, fontId]);

  const selectedMaterial = useMemo(() => {
    if (!materialData) return null;
    return materialData.find((m: MaterialStickerItem) => m.id === materialId) || null;
  }, [materialData, materialId]);

  return {
    fontId,
    materialId,
    text,
    options,
    fontData,
    materialData,
    selectedFont,
    selectedMaterial,
  };
};
