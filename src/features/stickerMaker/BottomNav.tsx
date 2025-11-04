'use client';

import { Download, Palette, Settings, Type, Shirt } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { Card } from '@/components/ui/card';

interface BottomNavProps {
  showFontGrid: boolean;
  toggleFontGrid: () => void;
  showColorGrid: boolean;
  toggleColorGrid: () => void;
}

export default function BottomNav({ showFontGrid, toggleFontGrid, showColorGrid, toggleColorGrid }: BottomNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      label: 'تنظیمات',
      onClick: () => router.push('/settings'),
      icon: <Settings size={24} />,
      isActive: pathname === '/settings',
    },
    {
      label: 'استایل',
      onClick: () => router.push('/style'),
      icon: <Shirt size={24} />,
      isActive: pathname === '/style',
    },
    {
      label: 'دریافت',
      onClick: () => router.push('/download'),
      icon: <Download size={24} />,
      isActive: pathname === '/download',
      isHighlighted: true,
    },
    {
      label: 'فونت',
      onClick: toggleFontGrid,
      icon: <Type size={24} />,
      isActive: showFontGrid,
    },
    {
      label: 'رنگ',
      onClick: toggleColorGrid,
      icon: <Palette size={24} />,
      isActive: showColorGrid,
    },
  ];

  return (
    <div className="flex justify-between items-center w-full p-2 py-0">
      {navItems.map(({ label, icon, onClick, isActive, isHighlighted }) => (
        <button
          key={label}
          onClick={onClick}
          type="button"
          className={`inline-flex items-center justify-center flex-col text-xs gap-1 p-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap
              ${
                isHighlighted
                  ? 'bg-primary text-white h-[58px] w-[58px] min-w-[58px] -mt-[16px] rounded-full ring-4 ring-white'
                  : 'h-[50px] rounded-lg hover:bg-gray-100' + (isActive ? ' text-primary font-bold' : ' text-gray-500')
              }`}
        >
          {icon}
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
