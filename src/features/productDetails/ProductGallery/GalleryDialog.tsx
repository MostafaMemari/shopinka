'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useBoolean } from '@/hooks/use-boolean';
import CarouselWithThumbs from '@/features/productDetails/ProductGallery/CarouselWithThumbs';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useEffect } from 'react';

export interface ImageType {
  fileUrl: string;
  title: string | null;
}

interface Props {
  dialogController: ReturnType<typeof useBoolean>;
  images: ImageType[];
  title: string;
}

export default function GalleryDialog({ dialogController, images, title }: Props) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (!isDesktop) {
      dialogController.onFalse();
    }
  }, [isDesktop]);

  return (
    <Dialog open={dialogController.value} onOpenChange={dialogController.onToggle}>
      <DialogContent className="max-w-[95%] overflow-hidden flex flex-col">
        <DialogHeader className="p-0">
          <DialogTitle className="line-clamp-1 text-sm md:text-lg mb-3">{title}</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <CarouselWithThumbs images={images} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
