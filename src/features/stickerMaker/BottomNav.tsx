'use client';

import { Download, Palette, Settings, Type, Shirt } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

interface BottomNavProps {
  showFontGrid: boolean;
  toggleFontGrid: () => void;
  showColorGrid: boolean;
  toggleColorGrid: () => void;
  showSettingsPanel: boolean;
  toggleSettingsPanel: () => void;
}

export default function BottomNav({
  showFontGrid,
  toggleFontGrid,
  showColorGrid,
  toggleColorGrid,
  showSettingsPanel,
  toggleSettingsPanel,
}: BottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();

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
      label: 'افزودن به سبد',
      onClick: () => router.push('/download'),
      icon: <Download size={24} />,
      isActive: pathname === '/download',
      isHighlighted: true,
    },
    {
      label: 'تنظیمات',
      onClick: toggleSettingsPanel,
      icon: <Settings size={24} />,
      isActive: showSettingsPanel,
    },
    {
      label: 'استایل',
      onClick: () => router.push('/style'),
      icon: <Shirt size={24} />,
      isActive: pathname === '/style',
    },
  ];

  return (
    <div className="flex justify-center items-center w-full h-14 bg-white rounded-2xl p-2 mb-2">
      <div className="flex justify-between items-center w-full max-w-lg">
        {navItems.map((item, index) => {
          const total = navItems.length;
          const isMiddle = index === Math.floor(total / 2);
          const isHighlighted = item.isHighlighted ?? isMiddle;

          return (
            <button
              key={item.label}
              onClick={item.onClick}
              type="button"
              className={`
            flex flex-col items-center justify-center text-xs gap-1 font-medium
            transition-colors focus-visible:outline-none focus-visible:ring-2
            focus-visible:ring-ring focus-visible:ring-offset-2
            disabled:pointer-events-none disabled:opacity-50 cursor-pointer
            ${isHighlighted ? 'z-10 -mt-4 h-14 w-14 rounded-full bg-primary text-white ring-4 ring-white' : 'flex-1 h-12 rounded-lg'}
            ${!isHighlighted && item.isActive ? 'text-primary font-bold' : ''}
            ${!isHighlighted ? 'text-gray-500' : ''}
          `}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
