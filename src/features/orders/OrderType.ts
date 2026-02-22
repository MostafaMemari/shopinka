import { AddressItem } from '../address/AddressType';
import { AttributeValues } from '../../types/attributeType';
import { Pager } from '../../types/pagerType';
import { ShippingItem } from '../shippings/ShippingType';
import { Transaction } from '../../types/transactionType';
import { Product, ProductVariant } from '../products/ProductType';
import { CustomStickerValues } from '../cart/cartType';

export interface Order {
  pager: Pager;
  items: OrderItem[];
}
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'FULFILLING' | 'SHIPPED' | 'CANCELLED';
export type OrderItemType = 'PRODUCT' | 'PRODUCT_VARIANT' | 'CUSTOM_STICKER';
export type CancelledOrderByType = 'USER' | 'SYSTEM' | 'ADMIN';

export interface OrderItem {
  id: number;
  userId: number;
  addressId: number;
  shippingId: number;
  orderNumber: string;
  quantity: number;
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  addressSnapshot: AddressItem;
  shippingSnapshot: ShippingItem;
  expiresAt: string;
  items: OrderProductItem[] | [];
  shippingInfo: ShippingInfo | null;
  shipping: ShippingItem;
  transaction: Transaction;

  cancelReason?: string | null;
  cancelledAt?: string | null;
  cancelledByType?: CancelledOrderByType | null;
  cancelledById?: string | null;
}

export interface ShippingInfo {
  createdAt: string;
  id: number;
  orderId: number;
  sentAt: string;
  shippingId: number;
  trackingCode: string;
  userId: number | null;
}

export interface OrderProductItem {
  id: number;
  orderId: number;
  productId: number;
  productVariantId: null;

  productTitle: string | null;
  imageUrl: string | null;
  itemType: OrderItemType;

  price: number;
  unitPrice: number;
  quantity: number;
  createdAt: string;
  product: Product;
  productVariant: ProductVariant | null;
  customStickerSnapshot: CustomStickerValues | null;

  variantSnapshot: AttributeValues[] | null;

  customStickerId: number | null;
  customSticker: CustomStickerValues | null;
}

export interface OrderResponse {
  pager: Pager;
  items: OrderItem[];
}

export interface OrderCountsResponse {
  current: number;
  delivered: number;
  cancelled: number;
}

export interface orderItemMapped {
  itemId?: number;
  id: number;
  type: 'SIMPLE' | 'VARIABLE';
  title: string;
  thumbnail: string;
  basePrice: number;
  salePrice: number;
  discount: number;
  count: number;
  attributeValues: AttributeValues[];
}

export interface OrderParams {
  page?: number;
  take?: number;
  status?: 'current' | 'delivered' | 'canceled';
}
