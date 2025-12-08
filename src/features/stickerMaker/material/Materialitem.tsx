'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { MaterialStickerItem } from '@/types/materialStickerType';

interface ColorItemProps {
  item: MaterialStickerItem;
  isSelected: boolean;
  onClick: () => void;
}

export function ColorItem({ item, isSelected, onClick }: ColorItemProps) {
  const { name, colorCode } = item;
  const isGold = name === 'طلایی';

  return (
    <button
      onClick={onClick}
      className="shrink-0 flex flex-col items-center cursor-pointer transition-transform duration-150 active:scale-95 min-w-[64px]"
    >
      <div
        className={cn('w-12 h-12 rounded-full border transition-all shadow-sm', {
          'bg-gradient-to-br from-yellow-300 via-amber-300 to-yellow-500 shadow-md': isGold,
          'border-blue-500 ring-2 ring-blue-300 scale-110 shadow-md': isSelected,
          'border-gray-300 hover:border-gray-500 hover:scale-105': !isSelected,
        })}
        style={{
          background: isGold ? undefined : colorCode,
        }}
      />

      <p
        className={cn('text-[11px] font-medium mt-1.5 text-center transition-colors leading-tight', {
          'text-primary font-semibold': isSelected,
          'text-gray-700': !isSelected,
        })}
        style={{ direction: 'rtl' }}
      >
        {name}
      </p>
    </button>
  );
}
