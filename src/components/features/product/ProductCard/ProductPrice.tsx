import { calculateDiscount } from '@/utils/calculateDiscount';
import { formatPrice } from '@/utils/formatter';
import { FC } from 'react';

interface Props {
  basePrice?: number | null;
  salePrice?: number | null;
}

const ProductPrice: FC<Props> = ({ basePrice, salePrice }) => {
  const discount = calculateDiscount(basePrice, salePrice);
  const hasDiscount = discount > 0;

  return (
    <div className="flex flex-col">
      {hasDiscount ? (
        <>
          <div className="h-5 text-left">
            <del className="text-sm text-text/60 decoration-warning md:text-base">{basePrice && formatPrice(basePrice)}</del>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="w-9 rounded-full bg-warning py-px text-center text-sm text-white">{discount}%</p>
            </div>
            <div className="text-sm font-bold text-primary md:text-base">
              {salePrice && formatPrice(salePrice)}
              {salePrice && <span className="text-xs font-light md:text-sm"> تومان</span>}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div className="h-5 text-left"></div>
          <div className="flex items-center justify-between">
            <div></div>
            <div className="text-sm font-bold text-primary md:text-base">
              {basePrice ? (
                <>
                  {formatPrice(basePrice)}
                  <span className="text-xs font-light md:text-sm"> تومان</span>
                </>
              ) : (
                <span className="text-xs font-light md:text-sm">ناموجود</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
