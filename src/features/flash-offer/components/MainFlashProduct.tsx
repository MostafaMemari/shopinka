import Link from 'next/link';
import Image from '@/components/common/UnoptimizedImage';

import { FlashProductOffer } from '../flashOfferTypes';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';

export function MainFlashProduct({ product }: { product: FlashProductOffer }) {
  if (!product) return null;

  const productTitle = product.title;
  const productImage = product.image || PlaceholderImageEnum.SQUARE;
  const productPrice = product.price || '';

  return (
    <Link href={product.href} className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
        <Image src={productImage} alt={productTitle} width={48} height={48} className="object-contain" unoptimized />
      </div>

      <div className="flex-1">
        <h2 className="text-sm font-medium line-clamp-2 mb-1">{productTitle}</h2>

        {productPrice && (
          <div className="flex items-center gap-1">
            <span className="text-primary font-bold text-sm">{productPrice}</span>
            <span className="text-xs text-muted-foreground">تومان</span>
          </div>
        )}
      </div>
    </Link>
  );
}
