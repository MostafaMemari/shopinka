'use client';

import { FC, useMemo } from 'react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import ProductImage from './ProductImage';
import ProductPrice from './ProductPrice';
import { Product, ProductVariant } from '../../ProductType';

interface Props {
  product: Product;
  showColors?: boolean;
}

function getDisplayVariant(product: Product): ProductVariant | null {
  if (product.type !== 'VARIABLE' || !product.variants?.length) {
    return null;
  }

  const defaultVariant = product.variants.find((v) => v.id === product.defaultVariantId);

  if (defaultVariant) return defaultVariant;

  const variantsWithSale = product.variants.filter((v) => v.salePrice != null);

  if (variantsWithSale.length > 0) {
    return variantsWithSale.reduce((min, current) => ((current.salePrice ?? Infinity) < (min.salePrice ?? Infinity) ? current : min));
  }

  return product.variants.reduce((min, current) => ((current.basePrice ?? Infinity) < (min.basePrice ?? Infinity) ? current : min));
}

function getUniqueColors(product: Product) {
  if (product.type !== 'VARIABLE') return [];

  const allAttributes = product.variants.flatMap((v) => v.attributeValues);

  const colors = allAttributes.filter((attr) => attr.attributeId === 1);

  const uniqueMap = new Map(colors.map((c) => [c.id, c]));

  return Array.from(uniqueMap.values());
}

const ProductCard: FC<Props> = ({ product, showColors = false }) => {
  const imageUrl = product.mainImage?.fileUrl ?? '/placeholder-image.jpg';
  const slug = product.slug ?? '#';
  const productName = product.name ?? 'محصول بدون نام';

  const displayVariant = useMemo(() => getDisplayVariant(product), [product]);
  const colors = useMemo(() => getUniqueColors(product), [product]);

  const salePrice = product.type === 'VARIABLE' ? displayVariant?.salePrice : product.salePrice;
  const basePrice = product.type === 'VARIABLE' ? displayVariant?.basePrice : product.basePrice;
  const quantity = product.type === 'VARIABLE' ? displayVariant?.quantity : product.quantity;

  return (
    <Card className="p-px mb-0.5 hover:shadow-md transition-shadow">
      <div className="p-2 md:p-5">
        <div className="mb-2 md:mb-5 relative" draggable={false}>
          <Link href={`/product/${slug}`} aria-label={`مشاهده جزئیات ${productName}`}>
            <ProductImage src={imageUrl} alt={productName} />
          </Link>

          {showColors && colors.length > 0 && (
            <div className="absolute top-2 right-2 flex gap-1 bg-white/80 backdrop-blur px-2 py-1 rounded-full shadow-sm">
              {colors
                .slice()
                .sort((a, b) => a.id - b.id)
                .slice(0, 3)
                .map((color) => (
                  <span
                    key={color.id}
                    className="w-3 h-3 rounded-full border border-gray-300"
                    style={{ backgroundColor: color.colorCode ?? '#ccc' }}
                    title={color.name}
                  />
                ))}

              {colors.length > 3 && <span className="text-[10px] text-gray-600 font-medium">+{colors.length - 3}</span>}
            </div>
          )}
        </div>

        <div className="mb-2">
          <Link href={`/product/${slug}`} className="line-clamp-2 h-10 text-sm md:h-12 md:text-base hover:text-primary">
            <h3>{productName}</h3>
          </Link>
        </div>

        <ProductPrice salePrice={salePrice} basePrice={basePrice} quantity={quantity} />
      </div>
    </Card>
  );
};

export default ProductCard;
