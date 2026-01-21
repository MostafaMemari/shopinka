import FlashOfferCard from '@/features/flash-offer/components/FlashOfferCard';
import { useFlashOffer } from '../flashOfferHooks';
import { Product } from '@/features/products/ProductType';

interface Props {
  products: Product[];
}

export default function FlashOfferSection({ products }: Props) {
  const { flashOfferItems, mainProduct } = useFlashOffer(products);

  if (!mainProduct) return null;

  return (
    <FlashOfferCard
      title="پیشنهادات لحظه‌ای"
      subtitle="لذت بررسی و خرید آنلاین محصولات"
      items={flashOfferItems}
      mainProduct={mainProduct}
    />
  );
}
