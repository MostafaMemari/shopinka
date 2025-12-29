import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { MainFlashProduct } from './MainFlashProduct';
import { MiniFlashProduct } from './MiniFlashProduct';
import { FlashProduct } from './types';

export type FlashOfferCardProps = {
  title: string;
  subtitle?: string;
  moreLink?: string;
  mainProduct: FlashProduct;
  items: FlashProduct[];
};

export default function FlashOfferCard({ title, subtitle, moreLink, mainProduct, items }: FlashOfferCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-sm">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>

        {moreLink && (
          <Link href={moreLink} className="bg-orange-400 text-white text-xs px-3 py-1 rounded-full">
            بیشتر
          </Link>
        )}
      </div>

      <MainFlashProduct product={mainProduct} />

      <div className="flex-1" />

      <div className="mt-4 grid grid-cols-4 gap-3">
        {items.map((item) => (
          <MiniFlashProduct key={item.id} product={item} />
        ))}
      </div>
    </Card>
  );
}
