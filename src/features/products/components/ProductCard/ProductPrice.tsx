import DiscountBadge from '@/components/common/DiscountBadge';
import TomanIcon from '@/components/common/svg/TomanIcon';
import { calculateDiscount } from '@/utils/calculateDiscount';
import { formatPrice } from '@/utils/formatter';
import { FC } from 'react';

interface Props {
  basePrice?: number | null;
  salePrice?: number | null;
  quantity?: number | null;
}

const PriceWithIcon: FC<{ price: number }> = ({ price }) => (
  <div className="flex items-center gap-1 text-sm font-bold text-primary md:text-base">
    {formatPrice(price)}
    <TomanIcon className="w-5 h-5" />
  </div>
);

const ProductPrice: FC<Props> = ({ basePrice, salePrice, quantity }) => {
  const discount = calculateDiscount(basePrice, salePrice);
  const hasDiscount = discount > 0;

  if (quantity !== null && quantity !== undefined && quantity <= 0) {
    return <Wrapper>{basePrice ? <PriceWithIcon price={basePrice} /> : <Unavailable text="ناموجود" />}</Wrapper>;
  }

  if (!salePrice && !basePrice) {
    return <Wrapper>{basePrice ? <PriceWithIcon price={basePrice} /> : <Unavailable text="غیر قابل فروش" />}</Wrapper>;
  }

  return (
    <div className="flex flex-col">
      {hasDiscount ? (
        <>
          <div className="h-5 text-left">
            <del className="text-sm text-text/60 decoration-warning md:text-base">{basePrice && formatPrice(basePrice)}</del>
          </div>
          <div className="flex items-center justify-between">
            <DiscountBadge discount={discount} />
            {salePrice && <PriceWithIcon price={salePrice} />}
          </div>
        </>
      ) : (
        <Wrapper>{basePrice ? <PriceWithIcon price={basePrice} /> : <Unavailable text="ناموجود" />}</Wrapper>
      )}
    </div>
  );
};

const Wrapper: FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col">
    <div className="h-5 text-left"></div>
    <div className="flex items-center justify-between">
      <div></div>
      {children}
    </div>
  </div>
);

const Unavailable: FC<{ text: string }> = ({ text }) => <span className="text-xs font-light md:text-sm text-primary/90">{text}</span>;

export default ProductPrice;
