import ProductVariants from '../VariantSelector';
import AddToCartButton from '@/features/cart/components/AddToCartButton';
import { FC } from 'react';
import { ProductDetails } from '@/features/products/ProductType';

import ProductGallery from '../ProductGallery/ProductGallery';
import ProductGuarantees from '../ProductGuarantees';
import ProductProperties from '../ProductProperties';

import FavoriteProductAction from '../ActionButtons/FavoriteProductAction';
import ShareProductAction from '../ActionButtons/ShareProductAction';
import Breadcrumb from '@/components/common/Breadcrumb';
import ProductSku from '../ProductSku';
import ProductCommentCount from '@/features/comments/components/ProductComments/ProductCommentCount';
import { ProductStatusList } from '../ProductStatusList';
import { ProductDetailsPrice } from '../ProductDetailsPrice';
import { Card } from '@/components/ui/card';
import React from 'react';

import MobileCartSticky from '@/components/common/MobileCartSticky';
import { Separator } from '@radix-ui/react-dropdown-menu';
import ProductShareIcon from '../ProductShareIcon';
import ProductFavoriteIcon from '../ProductFavoriteIcon';
import ProductImageSwiper from '../ProductImageSwiper';
import ProductAddToCard from './ProductAddToCard';

interface ProductDetailsViewProps {
  product: ProductDetails;
}

const ProductDetailsView: FC<ProductDetailsViewProps> = ({ product }) => {
  const isVariableProduct = product.type === 'VARIABLE';

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
      {/* <Breadcrumb variant="boxed" items={[{ label: 'خانه', href: '/' }, ...breadcrumbItems]} /> */}
      <Card>
        <div className="grid grow grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-4">
          <div className="col-span-4">
            {/* <div className="hidden lg:block mb-4">
              <div className="flex items-center gap-x-4">
                <FavoriteProductAction productId={product.id} isTooltip />
                <ShareProductAction />
              </div>
            </div> */}

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
              {product.name && <h1 className="text-lg font-semibold text-start">{product.name}</h1>}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 lg:gap-4 lg:space-y-0 mt-4">
                <div className="lg:col-span-7 flex flex-col">
                  <div className="flex items-center justify-start gap-x-4 text-sm font-light text-primary">
                    <ProductSku sku={product.sku ?? ''} />
                    <span className="h-4 w-px rounded-full bg-background dark:bg-muted/10"></span>
                    <ProductCommentCount key={product.id} productId={product.id} />
                  </div>

                  <div className="flexlg:justify-start">
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

                <div className="lg:col-span-5 lg:items-stretch justify-between space-y-4">
                  <ProductStatusList />

                  <ProductAddToCard product={product} />
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
};

export default ProductDetailsView;

{
  /* <div className="lg:hidden">
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

              <div className="flex items-center gap-x-4">
                <ProductShareIcon />
                <ProductFavoriteIcon productId={product.id} />
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
      </div> */
}
