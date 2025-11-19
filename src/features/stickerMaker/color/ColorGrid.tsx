'use client';

import React, { useRef } from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { setColorStart, setColorSuccess } from '@/store/slices/stickerSlice';
import { ColorItem } from './ColorItem';

export interface ColorItemType {
  name: string;
  value: string;
}

const colors: ColorItemType[] = [
  { name: 'سفید', value: 'white' },
  { name: 'مشکی', value: 'black' },
  { name: 'طلایی', value: 'gold' },
  { name: 'قرمز', value: 'red' },
  { name: 'زرد', value: 'yellow' },
];

export function ColorGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  const dispatch = useDispatch();

  const { options } = useSelector((state: RootState) => state.sticker);

  const handleColorClick = (color: ColorItemType) => {
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
            className={`w-full  bg-white rounded-md shadow-md border`}
            onWheel={(e) => {
              const target = e.currentTarget as HTMLElement;
              if (e.deltaY !== 0) {
                e.preventDefault();
                target.scrollLeft += e.deltaY + e.deltaX;
              }
            }}
          >
            <div className="flex gap-3 px-4 py-3">
              {(colors ?? []).map((item) => (
                <ColorItem
                  key={item.value}
                  item={item}
                  isSelected={options.color?.value === item.value}
                  onClick={handleColorClick.bind(null, { name: item.name, value: item.value })}
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
