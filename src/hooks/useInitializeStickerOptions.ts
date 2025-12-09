'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setColorStart, setColorSuccess, setFontStart, setFontSuccess, setLines } from '@/store/slices/stickerSlice';
import { FontItem } from '@/types/fontType';
import { MaterialStickerItem } from '@/types/materialStickerType';

export function useInitializeStickerOptions({
  fontData,
  materialData,
  fontLoading,
  materialLoading,
}: {
  fontData: FontItem[] | undefined;
  materialData: MaterialStickerItem[] | undefined;
  fontLoading: boolean;
  materialLoading: boolean;
}) {
  const dispatch = useDispatch();
  const { options, materialId, fontId } = useSelector((state: RootState) => state.sticker);

  useEffect(() => {
    if (fontLoading || materialLoading || !fontData || !materialData) return;

    const defaultFont = fontData?.find((font: FontItem) => font.isDefault);
    const defaultMaterial = materialData?.find((material: MaterialStickerItem) => material.isDefault);

    let finalFont = fontId ? fontData?.find((font: FontItem) => font.id === fontId) : null;
    let finalMaterial = materialId ? materialData?.find((material: MaterialStickerItem) => material.id === materialId) : null;
    if (finalFont) {
      const exists = fontData?.some((font: FontItem) => font.id === finalFont?.id);
      if (!exists) finalFont = null;
    }

    if (finalMaterial) {
      const exists = materialData?.some((material: MaterialStickerItem) => material.id === finalMaterial?.id);
      if (!exists) finalMaterial = null;
    }

    if (!finalFont || !finalMaterial) {
      dispatch(setColorStart());
      dispatch(setColorSuccess(defaultMaterial ? defaultMaterial.id : materialData[0]?.id));

      dispatch(setFontStart());
      dispatch(setFontSuccess(defaultFont ? defaultFont.id : fontData[0]?.id));
    }

    dispatch(setLines([]));
  }, [fontLoading, materialLoading, fontData, materialData, options, dispatch]);
}
