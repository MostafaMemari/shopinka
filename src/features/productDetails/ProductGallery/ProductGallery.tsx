'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import useFancybox from '@/hooks/useFancybox';
import { ProductGalleriesType } from '@/types/productGalleriesType';

interface ProductGalleryProps {
  product: ProductGalleriesType;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const { selectedVariant } = useSelector((state: RootState) => state.product);

  const [fancyboxRef] = useFancybox({
    Carousel: {
      infinite: false,
      Thumbs: false,
      Toolbar: {
        display: {
          left: ['close', 'fullscreen'],
          right: ['counter'],
        },
      },
    },
  });

  const mainImage = product.type === 'VARIABLE' && selectedVariant?.mainImage ? selectedVariant.mainImage : product.mainImage;

  const images = mainImage ? [mainImage, ...(product.galleryImages ?? [])] : (product.galleryImages ?? []);

  if (!images.length) return null;

  return (
    <div ref={fancyboxRef}>
      <a
        href={images[0].fileUrl}
        data-fancybox="product-gallery"
        data-caption={images[0].title ?? product.name}
        className="block cursor-zoom-in mb-2 lg:mb-4 shadow-md rounded-lg"
      >
        <img
          src={images[0].fileUrl}
          data-thumb-src={images[0].fileUrl}
          alt={images[0].title ?? product.name}
          className="mx-auto w-full rounded-lg object-contain"
        />
      </a>

      <div className="flex justify-center gap-2">
        {images.slice(1, 4).map((img, index) => (
          <a
            key={index}
            href={img.fileUrl}
            data-fancybox="product-gallery"
            data-caption={img.title ?? product.name}
            className="block cursor-zoom-in shadow"
          >
            <img
              src={img.fileUrl}
              data-thumb-src={img.fileUrl}
              alt={img.title ?? product.name}
              className="h-20 w-20 rounded-md object-cover"
            />
          </a>
        ))}
      </div>

      {images.slice(4).map((img, index) => (
        <a
          key={`hidden-${index}`}
          href={img.fileUrl}
          data-fancybox="product-gallery"
          data-caption={img.title ?? product.name}
          className="hidden shadow"
        />
      ))}
    </div>
  );
}
