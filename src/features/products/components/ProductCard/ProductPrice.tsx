import TomanIcon from '@/components/common/svg/TomanIcon';
import { Badge } from '@/components/ui/badge';
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
              <Badge
                variant="destructive"
                className="w-9 rounded-tr-full rounded-tl-full rounded-br-full rounded-bl-sm bg-accent-foreground py-px text-center text-sm text-white shadow-md"
              >
                %{discount}
              </Badge>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-primary md:text-base">
              {salePrice && formatPrice(salePrice)}
              <TomanIcon className="w-5 h-5" />
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
                <div className="flex items-center gap-1">
                  {formatPrice(basePrice)}
                  <TomanIcon className="w-5 h-5" />
                </div>
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
