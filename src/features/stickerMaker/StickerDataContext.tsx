'use client';

import { FontItem } from '@/types/fontType';
import { MaterialStickerItem } from '@/types/materialStickerType';
import React, { createContext, useContext, ReactNode } from 'react';

interface StickerDataContextProps {
  materialData: MaterialStickerItem[] | undefined;
  fontData: FontItem[] | undefined;
  materialLoading: boolean;
  fontLoading: boolean;
}

const StickerDataContext = createContext<StickerDataContextProps | undefined>(undefined);

interface StickerDataProviderProps extends StickerDataContextProps {
  children: ReactNode;
}

export const StickerDataProvider = ({ children, materialData, fontData, materialLoading, fontLoading }: StickerDataProviderProps) => {
  return (
    <StickerDataContext.Provider value={{ materialData, fontData, materialLoading, fontLoading }}>{children}</StickerDataContext.Provider>
  );
};

export const useStickerData = () => {
  const context = useContext(StickerDataContext);
  if (!context) {
    throw new Error('useStickerData must be used within a StickerDataProvider');
  }
  return context;
};
