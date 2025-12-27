import PrimaryButton from '@/components/common/PrimaryButton';
import { CartState } from '@/features/cart/cartType';

import CartSummary from '../../CartSummary';
import useIsMdUp from '@/hooks/useIsMdUp';

interface Props {
  cart: CartState;
  totalQuantity: number;
  isLoading: boolean;
  onContinue: () => void;
}

export default function CartSidebarSummary({ cart, totalQuantity, isLoading, onContinue }: Props) {
  const isMdUp = useIsMdUp();

  return (
    <CartSummary
      totalQuantity={totalQuantity}
      cartPrice={cart.payablePrice}
      totalDiscountPrice={cart.totalDiscountPrice}
      totalPrice={cart.totalPrice}
    >
      {isMdUp && (
        <PrimaryButton className="w-full" onClick={onContinue} isLoading={isLoading}>
          ادامه فرایند خرید
        </PrimaryButton>
      )}
    </CartSummary>
  );
}
