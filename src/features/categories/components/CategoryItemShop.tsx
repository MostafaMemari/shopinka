'use client';

import Image from 'next/image';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui';

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
    <Card
      className={cn(
        'flex flex-col items-center justify-center p-4 hover:shadow-md transition-shadow duration-200 mb-1 cursor-pointer',
        className,
      )}
      tabIndex={0}
    >
      <div className="w-20 h-20 rounded-lg overflow-hidden flex items-center justify-center mb-2">
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
    </Card>
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
