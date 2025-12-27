import ProductVariants from '../VariantSelector';
import AddToCartButton from '@/features/cart/components/AddToCartButton';
import { FC } from 'react';
import { ProductDetails } from '@/features/products/ProductType';

import ProductDesktopDetails from './ProductDesktopDetails';
import ProductMobileDetails from './ProductMobileDetails';

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
        <ProductDesktopDetails product={product} breadcrumbItems={breadcrumbItems} ProductVariant={ProductVariant} AddToCard={AddToCard} />
      </div>

      <div className="lg:hidden">
        <ProductMobileDetails product={product} breadcrumbItems={breadcrumbItems} ProductVariant={ProductVariant} AddToCard={AddToCard} />
      </div>
    </>
  );
};

export default ProductDetailsView;
