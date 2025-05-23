import { FC } from 'react';

import { IProduct } from '@/lib/types/products';

import ProductPrice from './ProductPrice';
import Link from 'next/link';
import Image from 'next/image';

interface Props {
  product: IProduct;
}

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <div className="border-gradient group relative rounded-base p-px before:absolute before:-inset-px before:h-[calc(100%+2px)] before:w-[calc(100%+2px)] before:rounded-base">
      <div className="relative rounded-xl bg-muted p-2 shadow-base md:p-5">
        <div className="mb-2 md:mb-5" draggable={false}>
          <Link href="45345534">
            <Image
              src={product.mainImage.fileUrl}
              alt={product.name}
              width={200}
              height={200}
              className="mx-auto w-32 rounded-lg md:w-auto"
            />
          </Link>
        </div>
        <div className="mb-2">
          <Link href="" className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">
            {product.name}
          </Link>
        </div>
        <ProductPrice discount={50} newPrice={product?.basePrice} oldPrice={product?.salePrice} />
      </div>
    </div>
  );
};

export default ProductCard;
