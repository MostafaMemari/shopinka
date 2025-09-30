'use client';

import { useBoolean } from '@/hooks/use-boolean';
import CarouselWithThumbs from '@/features/productDetails/ProductGallery/CarouselWithThumbs';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useEffect } from 'react';
import Dialog from '@/components/common/Dialog';

export interface ImageType {
  fileUrl: string;
  title: string | null;
}

interface GalleryDialogProps {
  dialogController: ReturnType<typeof useBoolean>;
  images: ImageType[];
  title: string;
}

export default function GalleryDialog({ dialogController, images, title }: GalleryDialogProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  useEffect(() => {
    if (!isDesktop) {
      dialogController.onFalse();
    }
  }, [isDesktop, dialogController]);

  return (
    <Dialog open={dialogController.value} onOpenChange={dialogController.onToggle} title={title} size="lg" showDefaultCloseButton={false}>
      <div className="flex-1 overflow-hidden">
        <CarouselWithThumbs images={images} />
      </div>
    </Dialog>
  );
}
