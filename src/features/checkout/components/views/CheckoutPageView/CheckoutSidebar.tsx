import { CartState } from '@/features/cart/cartType';
import CheckoutCartPriceDetail from '@/features/checkout/components/views/CheckoutPageView/CheckoutCartPriceDetail';
import { ShippingItem } from '@/features/shippings/ShippingType';

interface Props {
  cart: CartState;
  selectedAddressId: number | null;
  selectedShippingItem: ShippingItem | null;
}

function CheckoutSidebar({ cart, selectedAddressId, selectedShippingItem }: Props) {
  return (
    <div className="col-span-12 lg:col-span-3">
      <CheckoutCartPriceDetail cart={cart} selectedAddressId={selectedAddressId} selectedShippingItem={selectedShippingItem} />
    </div>
  );
}

export default CheckoutSidebar;
