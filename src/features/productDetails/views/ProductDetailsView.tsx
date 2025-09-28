import ProductGallery from '../ProductGallery/ProductGallery';
import ProductGuarantees from '../ProductGuarantees';

import ProductImageSwiper from '../ProductImageSwiper';
import ProductVariants from '../VariantSelector';
import ProductProperties from '../ProductProperties';
import AddToCartButton from '@/features/cart/components/AddToCartButton';
import { FC } from 'react';
import ProductSku from '../ProductSku';
import ProductCommentCount from '../../comments/components/ProductComments/ProductCommentCount';

import FavoriteProductAction from '../ActionButtons/FavoriteProductAction';
import ShareProductAction from '../ActionButtons/ShareProductAction';
import MobileCartSticky from '@/components/common/MobileCartSticky';
import { Card } from '@/components/ui/card';
import { ProductDetails } from '@/features/products/ProductType';
import { ProductDetailsPrice } from '../ProductDetailsPrice';
import { ProductStatusList } from '../ProductStatusList';
import { Separator } from '@/components/ui/separator';
import Breadcrumb from '@/components/common/Breadcrumb';

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

  const AddToCard = (
    <AddToCartButton
      key={product.id}
      product={{
        id: product.id,
        basePrice: product.basePrice ?? 0,
        salePrice: product.salePrice ?? 0,
        type: product.type,
        quantity: product.quantity,
      }}
    />
  );

  const ProductVariant = (
    <ProductVariants
      defaultVariantId={product.defaultVariantId ?? undefined}
      variants={product.variants}
      attributes={product.attributes}
      productType={product.type}
    />
  );

  return (
    <>
      <div className="hidden lg:block">
        <div className="flex flex-col gap-4">
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
      </div>

      <div className="lg:hidden">
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
            <div className="flex gap-x-4 text-sm font-light text-primary md:text-base">
              <ProductSku sku={product.sku ?? ''} />
              <ProductCommentCount key={product.id} productId={product.id} />
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
      </div>
    </>
  );
};

export default ProductDetailsView;
