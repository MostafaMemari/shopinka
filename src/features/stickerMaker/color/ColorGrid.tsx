'use client';

import React, { useRef } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setColorStart, setColorSuccess } from '@/store/slices/stickerSlice';
import { ColorItem } from './ColorItem';
import { ColorOptions } from '@/types/color/colorType';
import { useMaterialSticker } from '@/features/material-sticker/hooks/useMaterialSticker';

export function ColorGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useMaterialSticker({});

  const dispatch = useDispatch();
  const { options } = useSelector((state: RootState) => state.sticker);

  const handleColorClick = (color: ColorOptions) => {
    dispatch(setColorStart());
    dispatch(setColorSuccess(color));
  };

  return (
    <div ref={gridRef} className="m-2">
      <AnimatePresence mode="wait">
        <motion.div
          key="color-grid"
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
                    <ColorItem
                      key={item.id}
                      item={item}
                      isSelected={options.color?.value === item.colorCode}
                      onClick={handleColorClick.bind(null, {
                        backgroundMode: { from: item.backgroundFrom, to: item.backgroundTo },
                        value: item.colorCode,
                        name: item.name,
                        displayName: item.name,
                      })}
                    />
                  ))}
            </div>

            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
