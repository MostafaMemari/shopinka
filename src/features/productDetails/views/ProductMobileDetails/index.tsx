import { Card } from '@/components/ui/card';
import React from 'react';
import { Heart, Share2 } from 'lucide-react';

import Breadcrumb from '@/components/common/Breadcrumb';
import ProductCommentCount from '@/features/comments/components/ProductComments/ProductCommentCount';
import MobileCartSticky from '@/components/common/MobileCartSticky';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ProductDetails } from '@/features/products/ProductType';

import ProductImageSwiper from '../../ProductImageSwiper';
import ProductSku from '../../ProductSku';
import { ProductDetailsPrice } from '../../ProductDetailsPrice';
import { ProductStatusList } from '../../ProductStatusList';

interface ProductMobileDetailsProps {
  product: ProductDetails;
  breadcrumbItems: { label: string; href: string }[];
  ProductVariant: React.ReactNode;
  AddToCard: React.ReactNode;
}

function ProductMobileDetails({ product, breadcrumbItems, ProductVariant, AddToCard }: ProductMobileDetailsProps) {
  const isVariableProduct = product.type === 'VARIABLE';

  return (
    <Card className="relative p-4">
      <div className="mb-4">
        <ProductImageSwiper
          product={{
            type: product.type,
            mainImage: product.mainImage,
            galleryImages: product.galleryImages,
            name: product.name,
          }}
        />

        <div className="mt-4">
          <Breadcrumb variant="compact" items={[{ label: 'خانه', href: '/' }, ...breadcrumbItems]} />
        </div>
      </div>
      <div className="space-y-4">
        {product.name && <h1 className="text-lg font-semibold">{product.name}</h1>}
        <div className="flex items-center justify-between gap-x-4 text-sm font-light text-primary md:text-base">
          <div className="flex items-center gap-x-4">
            <ProductSku sku={product.sku ?? ''} />
            <ProductCommentCount key={product.id} productId={product.id} />
          </div>
        </div>

        <Separator className="my-4" />

        <div className="mb-4 space-y-4">
          {isVariableProduct && <div className="mb-4">{ProductVariant}</div>}

          <MobileCartSticky position="bottom" className="p-0">
            <div className="flex justify-between items-center w-full">
              <div className="w-1/2 mx-1">{AddToCard}</div>

              <div className="p-2">
                <ProductDetailsPrice
                  product={{
                    type: product.type,
                    basePrice: product.basePrice ?? 0,
                    salePrice: product.salePrice,
                    quantity: product.quantity,
                  }}
                />
              </div>
            </div>
          </MobileCartSticky>

          <div className="hidden md:flex justify-between items-center w-full">
            <div className="w-1/2">{AddToCard}</div>

            <div className="text-end">
              <ProductDetailsPrice
                product={{
                  type: product.type,
                  basePrice: product.basePrice ?? 0,
                  salePrice: product.salePrice,
                  quantity: product.quantity,
                }}
              />
            </div>
          </div>

          <ProductStatusList />
        </div>
      </div>
    </Card>
  );
}

export default ProductMobileDetails;
