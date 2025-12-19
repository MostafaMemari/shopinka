import { CartItem, CartItemState } from '@/features/cart/cartType';

export const mapCartResponseToCartItemsState = (cartItems: CartItem[] = []): CartItemState[] => {
  return cartItems.map((item) => {
    const isSimple = item.product?.type === 'SIMPLE';
    const product = item.product || item.productVariant?.product;
    const variant = item.productVariant;
    const custom = item.customSticker;

    const id = item.product?.id ?? variant?.id ?? custom?.id ?? 0;
    const type: 'SIMPLE' | 'VARIABLE' = isSimple ? 'SIMPLE' : 'VARIABLE';
    const title = product?.name ?? `برچسب ${custom.lines.map((line) => line.text).join(' - ')}`;
    const thumbnail = product?.mainImage?.fileUrl ?? custom?.previewImage?.fileUrl ?? '';
    const slug = product?.slug ?? '';

    const basePrice = item.product?.basePrice ?? variant?.basePrice ?? custom?.finalPrice ?? 0;
    const salePrice = item.product?.salePrice ?? variant?.salePrice ?? 0;
    const discount = basePrice ? Math.round(((basePrice - salePrice) / basePrice) * 100) : 0;

    return {
      itemId: item.id,
      id,
      count: item.quantity,
      slug,
      type,
      title,
      thumbnail,
      basePrice,
      salePrice,
      discount,
      customStickerValues: {
        font: custom?.font,
        lines: custom?.lines ?? [],
        material: custom?.material,
      },
      attributeValues: variant?.attributeValues ?? [],
    };
  });
};

export const mapCartResponseToCartItemState = (cartItems: CartItem): CartItemState => {
  const isSimple = cartItems.product?.type === 'SIMPLE';
  const product = cartItems.product || cartItems.productVariant?.product;
  const variant = cartItems.productVariant;

  const id = cartItems.product?.id ?? variant?.id ?? 0;
  const type: 'SIMPLE' | 'VARIABLE' = isSimple ? 'SIMPLE' : 'VARIABLE';
  const title = product?.name ?? '';
  const thumbnail = product?.mainImage?.fileUrl ?? '';
  const slug = product?.slug ?? '';

  const basePrice = cartItems.product?.basePrice ?? variant?.basePrice ?? 0;
  const salePrice = cartItems.product?.salePrice ?? variant?.salePrice ?? 0;
  const discount = basePrice ? Math.round(((basePrice - salePrice) / basePrice) * 100) : 0;

  return {
    itemId: cartItems.id,
    id,
    count: cartItems.quantity,
    slug,
    type,
    title,
    thumbnail,
    basePrice,
    salePrice,
    discount,
    attributeValues: variant?.attributeValues ?? [],
  };
};
