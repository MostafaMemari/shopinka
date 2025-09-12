'use server';

import { shopApiFetch } from '@/service/api';
import { revalidateTag } from 'next/cache';
import { Pager } from '@/types/pagerType';
import { Product, ProductParams } from '@/features/products/types';

export const getProducts = async (params?: ProductParams): Promise<{ items: Product[]; pager: Pager }> => {
  return await shopApiFetch(`/product`, {
    query: { ...params, includeMainImage: true, includeVariants: true },
  });
};

export async function refetchProducts() {
  revalidateTag('products');
}

export async function fetchProductBySlug(slug: string) {
  return await shopApiFetch(`/product/by-slug/${slug}`);
}

export async function favoriteToggle(productId: number) {
  return await shopApiFetch(`/product/favorite-toggle/${productId}`, { method: 'Patch' });
}

export async function isFavorite(productId: number): Promise<boolean> {
  const isFavorite = await shopApiFetch(`/product/${productId}/favorite`);

  return isFavorite === 'true' ? true : false;
}
