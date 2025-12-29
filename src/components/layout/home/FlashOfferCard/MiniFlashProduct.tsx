import Link from 'next/link';
import { FlashProduct } from './types';
import Image from 'next/image';

export function MiniFlashProduct({ product }: { product: FlashProduct }) {
  if (!product) return null;

  return (
    <Link href={product.href} className="flex flex-col items-center gap-1">
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center">
        {product.image ? (
          <Image src={product.image} alt={product.title} width={40} height={40} className="object-contain" unoptimized />
        ) : null}
      </div>

      <span className="text-[10px] text-center line-clamp-1 text-muted-foreground">{product.title}</span>
    </Link>
  );
}
