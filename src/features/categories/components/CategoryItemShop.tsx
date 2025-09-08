'use client';

import Image from 'next/image';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';
import { ReactNode } from 'react';
import { cn } from '@/utils/utils';

interface CategoryItemShopProps {
  name: string;
  imageUrl?: string;
  href?: string;
  onClick?: () => void;
  icon?: ReactNode;
  isButton?: boolean;
  className?: string;
}

export default function CategoryItemShop({ name, imageUrl, href, onClick, icon, isButton = false, className }: CategoryItemShopProps) {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200',
        className,
      )}
      tabIndex={0}
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center bg-gray-50 mb-2">
        {icon ? (
          icon
        ) : (
          <Image
            src={imageUrl || PlaceholderImageEnum.SQUARE}
            alt={name}
            width={80}
            height={80}
            className="object-contain w-full h-full"
            loading="lazy"
            unoptimized
          />
        )}
      </div>
      <span className="text-sm font-medium text-center text-gray-800">{name}</span>
    </div>
  );

  if (isButton) {
    return (
      <button onClick={onClick} className="w-full h-full focus:outline-none">
        {content}
      </button>
    );
  }

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
}
