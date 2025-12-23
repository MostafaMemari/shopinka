import { CartItemState } from '@/features/cart/cartType';
import CartPageItem from './CartPageItem';

export function CartItemsList({ items }: { items: CartItemState[] }) {
  return (
    <ul className="divide-y">
      {items.map((item, index) => (
        <li key={item.id}>
          <CartPageItem cartItem={item} isLast={index === items.length - 1} />
        </li>
      ))}
    </ul>
  );
}
