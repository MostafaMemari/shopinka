import Link from 'next/link';
import Image from '@/components/common/UnoptimizedImage';
import { FlashProductOffer } from '../flashOfferTypes';
import { PlaceholderImageEnum } from '@/types/enums/PlaceholderImageEnum';

export function MiniFlashProduct({ product }: { product: FlashProductOffer }) {
  if (!product) return null;

  const productTitle = product.title;
  const productImage = product.image || PlaceholderImageEnum.SQUARE;

  return (
    <Link href={product.href} className="flex flex-col items-center gap-1">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
        {product.image ? (
          <Image src={productImage} alt={productTitle} width={40} height={40} className="object-contain" unoptimized />
        ) : null}
      </div>

      <span className="text-[10px] text-center line-clamp-1 text-muted-foreground">{productTitle}</span>
    </Link>
  );
}
