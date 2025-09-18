import Link from 'next/link';
import React from 'react';
import { Card } from '@/components/ui/card';
import { Trash2 } from 'lucide-react';
import ProductImage from '../products/components/ProductCard/ProductImage';

interface PreviewCardProps {
  slug: string;
  name: string;
  imageUrl: string;
  quantity: number;

  onClick?: () => void;
}

function PreviewCard({ slug, name, imageUrl, quantity, onClick }: PreviewCardProps) {
  return (
    <Card className="p-px mb-0.5 border-r shadow-sm hover:shadow-md transition-shadow">
      <div className="p-2 md:p-5">
        <div className="mb-2 md:mb-5" draggable={false}>
          <Link href={`/product/${slug}`}>
            <ProductImage src={imageUrl} alt={name} />
          </Link>
        </div>

        <div className="mb-2">
          <Link href={`/product/${slug}`} className="line-clamp-2 h-10 text-sm md:h-12 md:text-base hover:text-primary">
            <h3 className="text-sm md:text-base">{name}</h3>
          </Link>
        </div>

        <div className="flex items-center justify-between">
          <div className={`text-sm font-medium xs:text-base ${quantity > 0 ? 'text-primary' : 'text-red-500 dark:text-red-400'}`}>
            {quantity > 0 ? 'موجود' : 'ناموجود'}
          </div>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-background text-red-500 cursor-pointer"
            onClick={onClick}
          >
            <Trash2 className="h-6 w-6" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default PreviewCard;
