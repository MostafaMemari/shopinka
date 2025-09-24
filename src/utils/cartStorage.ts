import { CartItemState } from '@/features/cart/cartType';

const CART_KEY = 'cart';

export const getLocalCart = (): CartItemState[] => {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    clearLocalCart();
    return [];
  }
};

export const clearLocalCart = () => {
  localStorage.removeItem(CART_KEY);
};
