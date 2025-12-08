'use client';

import React, { useRef } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setColorStart, setColorSuccess } from '@/store/slices/stickerSlice';
import { ColorItem } from './Materialitem';
import { MaterialStickerItem } from '@/types/materialStickerType';
import { useSelectedStickerAssets } from '@/hooks/useSelectedStickerAssets';

interface Props {
  data: { items: MaterialStickerItem[] } | undefined;
  isLoading: boolean;
}

export function MaterialGrid({ data, isLoading }: Props) {
  const { selectedMaterial } = useSelectedStickerAssets();

  const gridRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const handleMaterialClick = (material: MaterialStickerItem) => {
    dispatch(setColorStart());
    dispatch(setColorSuccess(material.id));
  };

  const isSelected = (materialId: number) => {
    return selectedMaterial?.id === materialId;
  };

  return (
    <div ref={gridRef} className="m-2">
      <AnimatePresence mode="wait">
        <motion.div
          key="material-grid"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
        >
          <ScrollArea
            className="w-full bg-white rounded-md shadow-md border"
            onWheel={(e) => {
              const target = e.currentTarget as HTMLElement;
              if (e.deltaY !== 0) {
                e.preventDefault();
                target.scrollLeft += e.deltaY + e.deltaX;
              }
            }}
          >
            <div className="flex gap-3 px-2 py-2">
              {isLoading
                ? [...Array(5)].map((_, i) => (
                    <div key={i} className="flex flex-col items-center min-w-[64px]">
                      <div className="w-12 h-12 rounded-full border bg-gray-200 animate-pulse shadow-sm mb-1.5" />

                      <div className="w-10 h-[11px] bg-gray-200 rounded animate-pulse" />
                    </div>
                  ))
                : (data?.items ?? []).map((item) => (
                    <ColorItem key={item.id} item={item} isSelected={isSelected(item.id)} onClick={handleMaterialClick.bind(null, item)} />
                  ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
