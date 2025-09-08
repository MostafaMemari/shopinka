import { mapCartResponseToCartItemState } from '@/utils/mapCartResponse';
import { shopApiFetch } from '@/service/api';
import { CartData, CartResponse, CartState } from '@/types/cartType';

export const createCart = async ({ cartData }: { cartData?: CartData }): Promise<void> => {
  if (cartData) {
    console.log(cartData);

    const res = await shopApiFetch('/cart/item', {
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

  const mappedItems = mapCartResponseToCartItemState(res.items);

  return {
    ...res,
    items: mappedItems,
  };
};

export const clearCart = async (): Promise<CartResponse> => {
  return await shopApiFetch('/cart/clear', { method: 'POST' });
};

export const updateQuantityItemCart = async ({ quantity, itemId }: { quantity: number; itemId: number }): Promise<CartResponse> => {
  return await shopApiFetch(`/cart/item/${itemId}`, { method: 'PATCH', body: { quantity } });
};

export const removeItemCart = async (itemId: number): Promise<CartResponse> => {
  return await shopApiFetch(`/cart/item/${itemId}`, { method: 'DELETE' });
};
