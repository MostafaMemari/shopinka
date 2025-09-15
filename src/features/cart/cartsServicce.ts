import { mapCartResponseToCartItemState } from '@/utils/mapCartResponse';
import { CartData, CartResponse, CartState } from '@/types/cartType';
import { unwrap } from '@/utils/api-helpers';
import { shopApiFetch } from '@/service/api';

export const createCart = async ({ cartData }: { cartData?: CartData }): Promise<void> => {
  if (cartData) {
    await shopApiFetch('/cart/item', {
      method: 'POST',
      body: {
        quantity: cartData.quantity,
        productId: cartData.productId ?? undefined,
        productVariantId: cartData.productVariantId ?? undefined,
      },
    });
  }
};

export const createCartBulk = async ({ items }: { items: CartData[] }): Promise<void> => {
  if (items.length > 0) {
    await shopApiFetch('/cart/items', {
      method: 'POST',
      body: { items },
    });
  }
};

export const createCartReplace = async ({ items }: { items: CartData[] }): Promise<void> => {
  if (items.length > 0) {
    await shopApiFetch('/cart/items/replace', {
      method: 'POST',
      body: { items },
    });
  }
};

export const getCart = async (): Promise<CartState> => {
  const res = await shopApiFetch('/cart/me', { method: 'GET' });

  const data = unwrap(res);

  const mappedItems = mapCartResponseToCartItemState(data.items);

  return {
    ...data,
    items: mappedItems,
  };
};

export const clearCart = async (): Promise<CartResponse> => {
  const res = await shopApiFetch('/cart/clear', { method: 'POST' });

  return unwrap(res);
};

export const updateQuantityItemCart = async ({ quantity, itemId }: { quantity: number; itemId: number }): Promise<CartResponse> => {
  const res = await shopApiFetch(`/cart/item/${itemId}`, { method: 'PATCH', body: { quantity } });

  return unwrap(res);
};

export const removeItemCart = async (itemId: number): Promise<CartResponse> => {
  const res = await shopApiFetch(`/cart/item/${itemId}`, { method: 'DELETE' });

  return unwrap(res);
};
