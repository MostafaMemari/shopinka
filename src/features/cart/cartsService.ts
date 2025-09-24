import { mapCartResponseToCartItemState } from '@/utils/mapCartResponse';
import { CartData, CartResponse, CartState } from '@/types/cartType';
import { ApiResponse, shopApiFetch } from '@/service/api';

export const createCart = async ({ cartData }: { cartData?: CartData }): Promise<void> => {
  if (cartData) {
    await shopApiFetch('/cart/item', {
      method: 'POST',
      auth: true,
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
      auth: true,
      body: { items },
    });
  }
};

export const createCartReplace = async ({ items }: { items: CartData[] }): Promise<void> => {
  if (items.length > 0) {
    await shopApiFetch('/cart/items/replace', {
      method: 'POST',
      auth: true,
      body: { items },
    });
  }
};

export const getCart = async (): Promise<ApiResponse<CartState>> => {
  const res = await shopApiFetch('/cart/me', { method: 'GET', auth: true });

  if (res.success) {
    const mappedItems = mapCartResponseToCartItemState(res.data.items);

    return {
      ...res,
      data: {
        ...res.data,
        items: mappedItems,
      },
    };
  }

  return res;
};

export const clearCart = async (): Promise<ApiResponse<CartResponse>> => {
  return await shopApiFetch('/cart/clear', { method: 'POST', auth: true });
};

export const updateQuantityItemCart = async ({
  quantity,
  itemId,
}: {
  quantity: number;
  itemId: number;
}): Promise<ApiResponse<CartResponse>> => {
  return await shopApiFetch(`/cart/item/${itemId}`, { method: 'PATCH', auth: true, body: { quantity } });
};

export const removeItemCart = async (itemId: number): Promise<ApiResponse<CartResponse>> => {
  return await shopApiFetch(`/cart/item/${itemId}`, { method: 'DELETE', auth: true });
};
