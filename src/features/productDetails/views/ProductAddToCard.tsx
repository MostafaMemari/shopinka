import MobileCartSticky from '@/components/common/MobileCartSticky';
import AddToCartButton from '@/features/cart/components/AddToCartButton';
import React from 'react';
import { ProductDetailsPrice } from '../ProductDetailsPrice';
import { ProductDetails } from '@/features/products/ProductType';

interface Props {
  product: ProductDetails;
}

function ProductAddToCard({ product }: Props) {
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

  return (
    <>
      <div className="hidden lg:flex flex-col space-y-4">
        <div className="flex w-full justify-center lg:justify-end">
          <div className="text-center lg:text-end">
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

        <div className="w-full flex justify-center lg:justify-start">{AddToCard}</div>
      </div>

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
    </>
  );
}

export default ProductAddToCard;
