'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ColorItemType } from '@/types/color/colorType';

interface ColorItemProps {
  item: ColorItemType;
  isSelected: boolean;
  onClick: () => void;
}

export function ColorItem({ item, isSelected, onClick }: ColorItemProps) {
  const { name, value } = item;
  const isGold = value === 'gold';

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="shrink-0 flex flex-col items-center cursor-pointer transition-all min-w-[60px]"
    >
      <div
        className={cn('w-10 h-10 rounded-full border-2 transition-all shadow-sm', {
          'bg-gradient-to-r from-amber-200 to-yellow-500': isGold,
          'border-blue-500 ring-2 ring-blue-300 scale-110': isSelected,
          'border-gray-300 hover:border-gray-500 hover:scale-105': !isSelected,
        })}
        style={{ background: isGold ? undefined : value }}
      />

      <p
        className={`text-[10px] font-medium mt-1.5 text-center transition-colors ${
          isSelected ? 'text-primary font-bold' : 'text-gray-700'
        }`}
        style={{ direction: 'rtl' }}
      >
        {name}
      </p>
    </motion.button>
  );
}
