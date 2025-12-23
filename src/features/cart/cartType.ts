import { AttributeValues } from '@/types/attributeType';

export interface CartItemState {
  itemId?: number;
  id: number;
  type: 'SIMPLE' | 'VARIABLE' | 'CUSTOM_STICKER';
  title: string;
  slug: string;
  thumbnail: string;
  basePrice: number;
  salePrice: number;
  discount: number;
  count: number;
  customStickerValues: {
    font: { name: string };
    material: { name: string; surface: 'MATTE' | 'GLOSSY' | 'RAINBOW' | 'REFLECTIVE'; colorCode: string };
  } | null;
  attributeValues: AttributeValues[];
}

export interface CartState {
  items: CartItemState[];
  payablePrice: number;
  totalDiscountPrice: number;
  totalPrice: number;
}

interface Lines {
  text: string;
  ratio: number;
  width: number;
  height: number;
  lineNumber: number;
}
export interface CartItem {
  id: number;
  cartId: number;
  productId: number | null;
  productVariantId: number | null;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  product: {
    id: number;
    name: string;
    salePrice: number | null;
    basePrice: number | null;
    slug: string;
    type: 'SIMPLE' | 'VARIABLE';
    mainImage: { fileUrl: string | null } | null;
  } | null;
  customSticker: {
    id: number;
    userId: number;
    fontId: number;
    materialId: number;
    previewImageId: number;
    style: 'normal' | 'bold';
    weight: 'regular' | 'italic';
    letterSpacing: number;
    finalPrice: number;
    lines: Lines[];
    description: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'PUBLISHED';
    createdAt: string;
    updatedAt: string;
    previewImage: {
      fileUrl: string;
    } | null;
    material: {
      name: string;
      surface: 'MATTE' | 'GLOSSY' | 'RAINBOW' | 'REFLECTIVE';
      colorCode: string;
    };
    font: {
      displayName: string;
    };
  };
  productVariant: {
    id: number;
    salePrice: number;
    basePrice: number;
    product: {
      name: string;
      mainImage: { fileUrl: string } | null;
      type: 'SIMPLE' | 'VARIABLE';
      slug: string;
    };
    attributeValues: AttributeValues[] | [];
  } | null;
}
export interface CartResponse {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  payablePrice: number;
  totalDiscountPrice: number;
  totalPrice: number;
  items: CartItemState[];
}

export interface CartData {
  productId: number | null | undefined;
  productVariantId: number | null | undefined;
  customStickerId: number | null | undefined;
  quantity: number;
}
