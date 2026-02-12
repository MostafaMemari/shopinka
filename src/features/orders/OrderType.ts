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
export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'CANCELLED';

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
  expiresAt: string;
  items: OrderProductItem[] | [];
  shippingInfo: null;
  shipping: ShippingItem;
  transaction: Transaction;
}

export interface OrderProductItem {
  id: number;
  orderId: number;
  productId: number;
  productVariantId: null;

  productTitle: string | null;
  imageUrl: string | null;

  price: number;
  unitPrice: number;
  quantity: number;
  createdAt: string;
  product: Product;
  productVariant: ProductVariant | null;
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
