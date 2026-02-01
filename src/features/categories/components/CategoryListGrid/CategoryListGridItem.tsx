'use client';

import Link from 'next/link';
import Image from '@/components/common/UnoptimizedImage';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface CategoryListGridItemProps {
  name: string;
  imageUrl?: string;
  href: string;
  className?: string;
}

export default function CategoryListGridItem({ name, imageUrl, href, className }: CategoryListGridItemProps) {
  return (
    <Link href={href} className="block">
      <Card
        className={cn(
          'flex flex-col items-center justify-center p-4 mb-1 rounded-xl cursor-pointer transition hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring',
          className,
        )}
        tabIndex={0}
      >
        <div className="w-20 h-20 flex items-center justify-center mb-2 overflow-hidden rounded-lg">
          <Image
            src={imageUrl || PlaceholderImageEnum.SQUARE}
            alt={name}
            width={80}
            height={80}
            className="w-full h-full object-contain"
            loading="lazy"
          />
        </div>

        <span className="w-full text-sm font-medium text-center text-gray-800 truncate">{name}</span>
      </Card>
    </Link>
  );
}
