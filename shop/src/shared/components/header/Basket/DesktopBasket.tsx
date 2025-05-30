import Link from 'next/link';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import DesktopBasketItem from './DesktopBasketItem';

interface DesktopBasketDropdownProps {
  cartItems: {
    id: number;
    title: string;
    image: string;
    quantity: number;
    color: string;
    colorHex: string;
    price: number;
  }[];
}

export default function DesktopBasketDropdown({ cartItems = [] }: DesktopBasketDropdownProps) {
  const totalPrice = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;

  return (
    <div
      className={`
        absolute left-0 top-full z-10 w-[400px] overflow-hidden rounded-lg border-t-2 border-t-primary bg-muted shadow-lg
        origin-top transition-all duration-300 ease-out
        opacity-0 scale-95 -translate-y-2 pointer-events-none
        group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 group-hover:pointer-events-auto
      `}
    >
      <div className="flex items-center justify-between p-5 pb-2">
        <div className="text-sm text-text/90">{cartItems.length} مورد</div>
        <Link className="flex items-center gap-x-1 text-sm text-primary" href="/checkout-cart">
          <div>مشاهده سبد خرید</div>
          <div>
            <HiOutlineChevronLeft className="h-5 w-5" />
          </div>
        </Link>
      </div>

      <div className="h-60">
        <ul className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-5 pl-2">
          {cartItems.map((item) => (
            <li key={item.id}>
              <DesktopBasketItem item={item} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center justify-between border-t p-5">
        <div className="flex flex-col items-center gap-y-1">
          <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
          <div className="text-text/90">
            <span className="font-bold">{totalPrice}</span>
            <span className="text-sm"> تومان</span>
          </div>
        </div>
        <Link href="/checkout-shipping">
          <button className="btn-primary w-32 py-3 text-sm" type="button">
            ثبت سفارش
          </button>
        </Link>
      </div>
    </div>
  );
}
