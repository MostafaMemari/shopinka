import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface HeroSwiperCardProps {
  item: {
    id: string;
    title: string;
    color: string;
    heroImage: string;
    thumbImage: string;
  };
  isActive: boolean;
}

function HeroSwiperCard({ item, isActive }: HeroSwiperCardProps) {
  return (
    <Card
      className={cn(
        'relative border-2 border-[var(--main-color)] transition-colors duration-300 p-0 overflow-visible',
        isActive &&
          'before:absolute before:inset-[-6px] before:rounded-[22px] before:opacity-50 before:content-[""] before:[box-shadow:inset_0_0_11px_11px_var(--light-color)]',
      )}
      style={
        {
          '--main-color': item.color,
          '--light-color': item.color,
        } as React.CSSProperties
      }
    >
      <CardContent className="relative flex aspect-[3/4] flex-col items-center overflow-hidden p-1 pt-2">
        <p className="mb-2 text-center text-sm font-semibold" style={{ color: item.color }}>
          {item.title}
        </p>
        <div className="mt-auto aspect-square w-full rounded-full" style={{ backgroundColor: item.color }} />
        <Image src={item.thumbImage} alt={item.title} fill className="absolute inset-0 top-[2px] object-cover" />
      </CardContent>
    </Card>
  );
}

export default HeroSwiperCard;
