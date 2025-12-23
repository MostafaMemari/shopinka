import PrimaryButton from '@/components/common/PrimaryButton';
import CartSummary from '../../CartSummary';
import { CartState } from '@/features/cart/cartType';

interface Props {
  cart: CartState;
  totalQuantity: number;
  isLoading: boolean;
  onContinue: () => void;
}

export default function CartSidebarSummary({ cart, totalQuantity, isLoading, onContinue }: Props) {
  return (
    <CartSummary
      totalQuantity={totalQuantity}
      cartPrice={cart.payablePrice}
      totalDiscountPrice={cart.totalDiscountPrice}
      totalPrice={cart.totalPrice}
    >
      <PrimaryButton className="w-full" onClick={onContinue} isLoading={isLoading}>
        ادامه فرایند خرید
      </PrimaryButton>
    </CartSummary>
  );
}
