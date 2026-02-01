import ProductVariants from '../VariantSelector';
import { FC } from 'react';
import { ProductDetails } from '@/features/products/ProductType';

import ProductGallery from '../ProductGallery/ProductGallery';
import ProductProperties from '../ProductProperties';

import ProductCommentCount from '@/features/comments/components/ProductComments/ProductCommentCount';
import { ProductStatusList } from '../ProductStatusList';
import { Card } from '@/components/ui/card';
import React from 'react';

import ProductAddToCard from './ProductAddToCard';
import BreadcrumbCompact from '@/features/breadcrumb/components/BreadcrumbCompact';
import ProductActionToggle from './ProductActionToggle';
import Link from 'next/link';

interface ProductDetailsViewProps {
  product: ProductDetails;
}

const ProductDetailsView: FC<ProductDetailsViewProps> = ({ product }) => {
  const breadcrumbItems =
    product?.categories?.slice(0, 2).map((_, index) => {
      const href = `/product-category/${product.categories
        .slice(0, index + 1)
        .map((c) => c.slug)
        .join('/')}`;
      return {
        label: product.categories[index].name,
        href,
      };
    }) || [];

  return (
    <div className="flex flex-col">
      <div className="mb-3 mt-1">
        <BreadcrumbCompact items={[{ label: 'خانه', href: '/' }, ...breadcrumbItems]} />
      </div>
      <Card>
        <div className="grid grow grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4">
          <div className="flex flex-col items-center justify-center gap-3 col-span-4">
            <ProductActionToggle productId={product.id} productName={product.name} isTooltip />

            <div className="mb-4">
              <ProductGallery
                product={{
                  type: product.type,
                  mainImage: product.mainImage,
                  galleryImages: product.galleryImages,
                  name: product.name,
                }}
              />
            </div>
          </div>
          <div className="col-span-8 lg:grid-cols-12 flex flex-col">
            <div className="flex flex-col">
              {product.name && <h1 className="text-md md:text:lg font-semibold text-start">{product.name}</h1>}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 lg:space-y-0 mt-4">
                <div className="lg:col-span-7 flex flex-col">
                  <div className="flex items-center justify-start gap-x-4 mb-2 text-sm font-light text-primary md:text-sm">
                    {product.sku && <Link href="#">کد کالا {product.sku}</Link>}

                    <span className="h-4 w-px rounded-full bg-background dark:bg-muted/10"></span>

                    <ProductCommentCount key={product.id} productId={product.id} />
                  </div>

                  <div className="flex lg:justify-start">
                    <ProductVariants
                      defaultVariantId={product.defaultVariantId ?? undefined}
                      variants={product.variants}
                      attributes={product.attributes}
                      productType={product.type}
                    />
                  </div>

                  <div className="flex flex-col gap-2 items-center lg:items-start">
                    <ProductProperties />
                  </div>
                </div>

                <div className="lg:col-span-5 lg:items-stretch justify-between md:space-y-4">
                  <ProductStatusList />

                  <ProductAddToCard product={product} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductDetailsView;
