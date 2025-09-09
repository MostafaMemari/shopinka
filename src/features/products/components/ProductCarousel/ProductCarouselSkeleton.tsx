'use client';

import ProductCardSkeleton from '../ProductCard/ProductCardSkeleton';

const ProductCarouselSkeleton = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="flex space-x-2 rtl:space-x-reverse">
        {[...Array(6)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductCarouselSkeleton;
