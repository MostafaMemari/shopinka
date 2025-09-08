'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import MainImage from './MainImage';
import GalleryImage from './GalleryImage';
import GalleryDialog from './GalleryDialog';
import { ProductGalleriesType } from '@/types/productGalleriesType';
import { useBoolean } from '@/hooks/use-boolean';

interface ProductGalleryProps {
  product: ProductGalleriesType;
}

export default function ProductGallery({ product }: ProductGalleryProps) {
  const galleryImageDialogController = useBoolean();

  const { selectedVariant } = useSelector((state: RootState) => state.product);

  const mainImage = product.type === 'VARIABLE' && selectedVariant?.mainImage ? selectedVariant.mainImage : product.mainImage;

  const displayedImages = product.galleryImages?.slice(0, 3);
  const hasMoreImages = product.galleryImages?.length > 3;
  const blurredImage = hasMoreImages ? product.galleryImages[3] : null;

  const modalImages = mainImage ? [mainImage, ...product.galleryImages] : product.galleryImages;

  return (
    <>
      <div className="space-y-4">
        <div onClick={galleryImageDialogController.onTrue} className="cursor-pointer">
          {mainImage && <MainImage src={mainImage.fileUrl} alt={mainImage.title ?? product.name} />}
        </div>

        {product.galleryImages?.length > 0 && (
          <div className="flex items-center justify-center gap-x-2">
            {displayedImages.map((image, index) => (
              <div key={index} onClick={galleryImageDialogController.onTrue}>
                <GalleryImage src={image.fileUrl} alt={image.title ?? product.name} isBlurred={false} />
              </div>
            ))}
            {blurredImage && (
              <div onClick={galleryImageDialogController.onTrue} className="shrink-0">
                <GalleryImage src={blurredImage.fileUrl} alt={blurredImage.title ?? product.name} isBlurred={true} />
              </div>
            )}
          </div>
        )}
      </div>

      <GalleryDialog dialogController={galleryImageDialogController} images={modalImages} title={product.name} />
    </>
  );
}
