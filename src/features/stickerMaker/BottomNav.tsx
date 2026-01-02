'use client';

import PrimaryButton from '@/components/common/PrimaryButton';
import { Palette, Settings, Type } from 'lucide-react';
import React, { useState } from 'react';
import FinalizeStickerDrawer from './preview/FinalizeStickerDrawer';
import FinalizeSummaryDrawer from './preview/FinalizeSummaryDrawer';
import FinalizeStickerDialog from './preview/FinalizeStickerDialog';
import FinalizeSummaryDialog from './preview/FinalizeSummaryDialog';

interface BottomNavProps {
  showFontGrid: boolean;
  toggleFontGrid: () => void;
  showColorGrid: boolean;
  toggleColorGrid: () => void;
  showSettingsPanel: boolean;
  toggleSettingsPanel: () => void;
  onAddToCart?: () => void;
}

export default function BottomNav({
  showFontGrid,
  toggleFontGrid,
  showColorGrid,
  toggleColorGrid,
  showSettingsPanel,
  toggleSettingsPanel,
}: BottomNavProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFinalDrawerOpen, setIsFinalDrawerOpen] = useState(false);

  const navItems = [
    {
      label: 'رنگ',
      onClick: toggleColorGrid,
      icon: <Palette size={24} />,
      isActive: showColorGrid,
    },
    {
      label: 'فونت',
      onClick: toggleFontGrid,
      icon: <Type size={24} />,
      isActive: showFontGrid,
    },
    {
      label: 'تنظیمات',
      onClick: toggleSettingsPanel,
      icon: <Settings size={24} />,
      isActive: showSettingsPanel,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-12 items-center w-full h-14 bg-white rounded-2xl shadow-md">
        <div className="col-span-8 grid grid-cols-12">
          {navItems.map((item) => (
            <div key={item.label} className="col-span-4 flex justify-center">
              <button
                onClick={item.onClick}
                type="button"
                className={`
            flex flex-col items-center justify-center text-xs gap-1 font-medium
            transition-colors focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2
            disabled:pointer-events-none disabled:opacity-50 cursor-pointer
            ${item.isActive ? 'text-primary' : 'text-gray-700'}
          `}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </div>
          ))}
        </div>

        <div className="col-span-4 flex justify-end px-1">
          <PrimaryButton
            onClick={() => setIsDrawerOpen(true)}
            className="flex w-full items-center justify-center gap-2 shadow-md shadow-primary/50 transition-all duration-300 hover:shadow-none"
          >
            نهایی سازی
          </PrimaryButton>

          {isDrawerOpen && (
            // <FinalizeStickerDrawer isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} onFinalize={() => setIsFinalDrawerOpen(true)} />
            <FinalizeStickerDialog isOpen={isDrawerOpen} onOpenChange={setIsDrawerOpen} onFinalize={() => setIsFinalDrawerOpen(true)} />
          )}

          {isFinalDrawerOpen && (
            <FinalizeSummaryDialog
              isOpen={isFinalDrawerOpen}
              onOpenChange={setIsFinalDrawerOpen}
              onCloseFinalizeSticker={() => setIsDrawerOpen(false)}
            />
            // <FinalizeSummaryDrawer
            //   isOpen={isFinalDrawerOpen}
            //   onOpenChange={setIsFinalDrawerOpen}
            //   onCloseFinalizeSticker={() => setIsDrawerOpen(false)}
            // />
          )}
        </div>
      </div>
    </>
  );
}
