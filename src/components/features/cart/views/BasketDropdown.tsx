'use client';

import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useDropdown } from '@/hooks/useDropdown';
import Link from 'next/link';
import DesktopBasketItem from './DesktopBasketItem';
import { formatPrice } from '@/utils/formatter';
import { useCart } from '@/hooks/reactQuery/cart/useCart';
import CartIconTotalQuantity from '../CartIconTotalQuantity';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

export default function BasketDropdown() {
  const { isLogin } = useAuth();
  const { cart } = useCart(isLogin);

  const { items: cartItems, payablePrice } = cart;

  const { isOpen, dropdownRef, handleMouseEnter, handleMouseLeave, closeDropdown } = useDropdown({
    closeOnOutsideClick: false,
    openOnHover: true,
  });

  return (
    <div className="relative">
      <div className="relative hidden md:block">
        <div className="relative" ref={dropdownRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button
            className="rounded-full p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
            onClick={closeDropdown}
            aria-label="باز کردن سبد خرید"
          >
            <CartIconTotalQuantity isLogin={isLogin} />
          </button>

          <div
            className={`absolute left-0 z-10 w-[400px] rounded-lg border-t-2 border-t-primary bg-muted shadow-lg dark:bg-gray-800 transition-all duration-200 origin-top ${
              isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
            }`}
          >
            <div className="flex items-center justify-between p-5 pb-2">
              <div className="text-sm text-text/90">{cartItems?.length} مورد</div>
              <Link className="flex items-center gap-x-1 text-sm text-primary" href="/checkout/cart">
                <div>مشاهده سبد خرید</div>
                <div>
                  <HiOutlineChevronLeft className="h-5 w-5" />
                </div>
              </Link>
            </div>

            <div className="h-60">
              <ul className="main-scroll h-full space-y-2 divide-y overflow-y-auto p-5 pl-2">
                {cartItems?.length > 0 ? (
                  cartItems?.map((item) => (
                    <li key={item.id}>
                      <DesktopBasketItem item={item} />
                    </li>
                  ))
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-text/60">سبد خرید خالی است</div>
                )}
              </ul>
            </div>

            <div className="flex items-center justify-between border-t p-5">
              <div className="flex flex-col items-center gap-y-1">
                <div className="text-sm text-text/60">مبلغ قابل پرداخت</div>
                <div className="text-text/90">
                  <span className="font-bold">{formatPrice(payablePrice)}</span>
                  <span className="text-sm"> تومان</span>
                </div>
              </div>
              <Link href={isLogin ? '/checkout/shipping' : '/checkout/cart'}>
                <button className="btn-primary w-32 py-3 text-sm cursor-pointer" type="button">
                  ثبت سفارش
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
