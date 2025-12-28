import ProductGallery from '../ProductGallery/ProductGallery';
import ProductGuarantees from '../ProductGuarantees';
import ProductProperties from '../ProductProperties';

import FavoriteProductAction from '../ActionButtons/FavoriteProductAction';
import ShareProductAction from '../ActionButtons/ShareProductAction';
import React from 'react';
import { Card } from '@/components/ui/card';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductSku from '../ProductSku';
import ProductCommentCount from '@/features/comments/components/ProductComments/ProductCommentCount';
import { ProductStatusList } from '../ProductStatusList';
import { ProductDetailsPrice } from '../ProductDetailsPrice';
import { ProductDetails } from '@/features/products/ProductType';

interface ProductDesktopDetailsProps {
  product: ProductDetails;
  breadcrumbItems: { label: string; href: string }[];
  ProductVariant: React.ReactNode;
  AddToCard: React.ReactNode;
}

function ProductDesktopDetails({ product, breadcrumbItems, ProductVariant, AddToCard }: ProductDesktopDetailsProps) {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumb variant="boxed" items={[{ label: 'خانه', href: '/' }, ...breadcrumbItems]} />
      <Card>
        <div className="mb-10 grid grow grid-cols-12 gap-4">
          <div className="col-span-4">
            <div className="hidden lg:block mb-4">
              <div className="flex items-center gap-x-4">
                <FavoriteProductAction productId={product.id} isTooltip />
                <ShareProductAction />
              </div>
            </div>

            <ProductGallery
              product={{
                type: product.type,
                mainImage: product.mainImage,
                galleryImages: product.galleryImages,
                name: product.name,
              }}
            />
          </div>
          <div className="col-span-8 flex min-h-full flex-col">
            <div className="col-span-8 flex min-h-full flex-col">
              {product.name && <h1 className="text-lg font-semibold pb-2">{product.name}</h1>}

              <div className="grid grid-cols-12 gap-8 lg:grid">
                <div className="col-span-7">
                  <div className="mb-4 flex items-center gap-x-4 text-sm font-light text-primary">
                    <ProductSku sku={product.sku ?? ''} />
                    <span className="h-4 w-px rounded-full bg-background dark:bg-muted/10"></span>
                    <ProductCommentCount key={product.id} productId={product.id} />
                  </div>

                  <div className="mb-4">{ProductVariant}</div>

                  <ProductProperties />
                </div>

                <div className="col-span-5 flex flex-col justify-between gap-4 self-start">
                  <ProductStatusList />

                  <div className="flex items-center w-full">
                    <div className="mr-auto text-end">
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

                  {AddToCard}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <ProductGuarantees />
        </div>
      </Card>
    </div>
  );
}

export default ProductDesktopDetails;
