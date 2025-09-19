import ProductGallery from '../ProductGallery/ProductGallery';
import ProductGuarantees from '../ProductGuarantees';

import ProductImageSwiper from '../ProductImageSwiper';
import ProductVariants from '../VariantSelector';
import AddToCartButtonMobile from '@/features/cart/components/AddToCartButton/AddToCartButtonMobile';
import ProductProperties from '../ProductProperties';
import AddToCartButtonDesktop from '@/features/cart/components/AddToCartButton/AddToCartButtonDesktop';
import { FC } from 'react';
import ProductSku from '../ProductSku';
import ProductCommentCount from '../../comments/components/ProductComments/ProductCommentCount';

import FavoriteProductAction from '../ActionButtons/FavoriteProductAction';
import ShareProductAction from '../ActionButtons/ShareProductAction';
import MobileCartSticky from '@/components/common/MobileCartSticky';
import { Card } from '@/components/ui/card';
import { ProductDetails } from '@/features/products/ProductType';
import { ProductDesktopDetailsPrice, ProductStickyMobilePrice } from '../ProductDetailsPrice';
import { ProductStatusList } from '../ProductStatusList';
import { Separator } from '@/components/ui/separator';
import Breadcrumb from '@/components/common/Breadcrumb';

interface ProductDetailsViewProps {
  product: ProductDetails;
}

const ProductDetailsView: FC<ProductDetailsViewProps> = ({ product }) => {
  const isVariableProduct = product.type === 'VARIABLE';
  const isEmptyVariants = !product.variants || product.variants.length === 0;
  const isValidProduct = isVariableProduct ? !isEmptyVariants : true;

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
    <>
      <div className="hidden lg:block">
        <Breadcrumb variant="boxed" items={[{ label: 'خانه', href: '/' }, ...breadcrumbItems]} />
        <Card className="mb-6">
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

                    {isValidProduct && (
                      <div className="mb-6">
                        <ProductVariants
                          variants={product.variants}
                          attributes={product.attributes}
                          productType={product.type}
                          defaultVariantId={product.defaultVariantId ?? undefined}
                        />
                      </div>
                    )}

                    <ProductProperties />
                  </div>

                  <div className="col-span-5 flex flex-col justify-between gap-4">
                    <ProductStatusList />

                    {isValidProduct && (
                      <div className="flex justify-between items-center w-full">
                        <div></div>
                        <div className="text-end">
                          <ProductDesktopDetailsPrice
                            product={{ type: product.type, basePrice: product.basePrice ?? 0, salePrice: product.salePrice }}
                          />
                        </div>
                      </div>
                    )}

                    {isValidProduct && (
                      <AddToCartButtonDesktop
                        key={product.id}
                        product={{
                          id: product.id,
                          name: product.name,
                          slug: product.slug,
                          basePrice: product.basePrice ?? 0,
                          salePrice: product.salePrice ?? 0,
                          mainImageUrl: product.mainImage?.fileUrl ?? null,
                          type: product.type,
                        }}
                      />
                    )}
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

      <div className="lg:hidden">
        <Card className="mb-6 relative p-4">
          <div className="mb-4">
            <ProductImageSwiper
              product={{
                type: product.type,
                mainImage: product.mainImage,
                galleryImages: product.galleryImages,
                name: product.name,
              }}
            />

            <Breadcrumb variant="compact" items={[{ label: 'خانه', href: '/' }, ...breadcrumbItems]} />
          </div>
          <div>
            <div className="space-y-4">
              {product.name && <h1 className="text-lg font-semibold pb-2">{product.name}</h1>}
              <div className="flex gap-x-4 text-sm font-light text-primary md:text-base">
                <ProductSku sku={product.sku ?? ''} />
                <ProductCommentCount key={product.id} productId={product.id} />
              </div>

              <Separator className="my-4" />

              <div className="mb-6 space-y-4">
                {isVariableProduct && (
                  <div className="mb-6">
                    <ProductVariants
                      defaultVariantId={product.defaultVariantId ?? undefined}
                      variants={product.variants}
                      attributes={product.attributes}
                      productType={product.type}
                    />
                  </div>
                )}

                <ProductStatusList />

                {isValidProduct && (
                  <MobileCartSticky position="bottom" className="p-1">
                    <div className="flex justify-between items-center w-full">
                      <div className="w-1/2">
                        <AddToCartButtonMobile
                          key={product.id}
                          product={{
                            id: product.id,
                            name: product.name,
                            slug: product.slug,
                            basePrice: product.basePrice ?? 0,
                            salePrice: product.salePrice ?? 0,
                            mainImageUrl: product.mainImage?.fileUrl ?? null,
                            type: product.type,
                          }}
                        />
                      </div>

                      {isValidProduct && (
                        <div className="p-2">
                          <ProductStickyMobilePrice
                            product={{
                              type: product.type,
                              basePrice: product.basePrice ?? 0,
                              salePrice: product.salePrice,
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </MobileCartSticky>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ProductDetailsView;
