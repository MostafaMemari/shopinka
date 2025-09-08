'use client';

import { FC } from 'react';
import ProductPrice from './ProductPrice';
import Link from 'next/link';
import ProductImage from './ProductImage';
import { Product } from '@/features/products/productType';
import { Card } from '@/components/ui';

interface Props {
  product: Product;
}

const ProductCard: FC<Props> = ({ product }) => {
  const imageUrl = product.mainImage?.fileUrl ?? '/placeholder-image.jpg';
  const slug = product.slug ?? '#';
  const productName = product.name ?? 'محصول بدون نام';
  const isVariableProduct = product.type === 'VARIABLE';

  const defaultVariant = isVariableProduct
    ? (product.variants.find((v) => v.id === product.defaultVariantId) ??
      (product.variants.length > 0
        ? product.variants.reduce((cheapest, current) => {
            const cheapestPrice = cheapest.basePrice ?? cheapest.salePrice ?? Infinity;
            const currentPrice = current.basePrice ?? current.salePrice ?? Infinity;
            return currentPrice < cheapestPrice ? current : cheapest;
          })
        : null))
    : null;

  const salePrice = isVariableProduct ? defaultVariant?.salePrice : product.salePrice;
  const basePrice = isVariableProduct ? defaultVariant?.basePrice : product.basePrice;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    image: imageUrl,
    description: product.name ?? productName,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IRR',
      price: salePrice ?? basePrice ?? 0,
      availability: product.quantity && product.quantity > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <Card className="p-px mb-0.5">
      <div className="p-2 md:p-5">
        <div className="mb-2 md:mb-5" draggable={false}>
          <Link href={`/product/${slug}`} aria-label={`مشاهده جزئیات ${productName}`}>
            <ProductImage src={imageUrl} alt={productName} />
          </Link>
        </div>
        <div className="mb-2">
          <Link href={`/product/${slug}`} className="line-clamp-2 h-10 text-sm md:h-12 md:text-base hover:text-primary">
            <h3 className="text-sm md:text-base">{productName}</h3>
          </Link>
        </div>
        <ProductPrice salePrice={salePrice} basePrice={basePrice} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </div>
    </Card>
  );
};

export default ProductCard;
