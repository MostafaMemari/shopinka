'use client';

import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { ImageType } from './GalleryDialog';
import Image from 'next/image';

interface CarouselWithThumbsProps {
  images: ImageType[];
}

export default function CarouselWithThumbs({ images }: CarouselWithThumbsProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleThumbClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <div dir="rtl">
      <Carousel className="max-w-[70%] m-auto" setApi={setApi}>
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <Card className="p-0">
                <Image
                  className="h-full w-full object-cover rounded-xl"
                  src={img.fileUrl}
                  alt={img.title ?? `تصویر ${index + 1}`}
                  width={50}
                  height={50}
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="text-center text-sm text-gray-500">
        {current} / {count}
      </div>

      <Carousel className="w-full">
        <CarouselContent className="flex gap-2">
          {images.map((img, index) => (
            <CarouselItem
              key={index}
              className={cn(
                'basis-1/5 cursor-pointer',
                current === index + 1 ? 'opacity-100 border-2 border-blue-500 rounded-lg p-0' : 'opacity-50',
              )}
              onClick={() => handleThumbClick(index)}
            >
              <Card className="p-0">
                <CardContent className="p-0 flex aspect-square items-center justify-center relative overflow-hidden rounded-lg">
                  <Image src={img.fileUrl} alt={img.title ? img.title : `تصویر ${index + 1}`} fill className="object-cover" />
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
