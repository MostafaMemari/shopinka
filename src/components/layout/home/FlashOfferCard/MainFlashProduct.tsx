import Link from 'next/link';
import { FlashProduct } from './types';
import Image from '@/components/common/UnoptimizedImage';

export function MainFlashProduct({ product }: { product: FlashProduct }) {
  if (!product) return null;

  return (
    <Link href={product.href} className="flex items-center gap-3 bg-slate-50 rounded-2xl p-3">
      <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
        {product.image ? (
          <Image src={product.image} alt={product.title} width={48} height={48} className="object-contain" unoptimized />
        ) : null}
      </div>

      <div className="flex-1">
        <h2 className="text-sm font-medium line-clamp-2 mb-1">{product.title}</h2>

        {product.price && (
          <div className="flex items-center gap-1">
            <span className="text-primary font-bold text-sm">{product.price}</span>
            <span className="text-xs text-muted-foreground">تومان</span>
          </div>
        )}
      </div>
    </Link>
  );
}
