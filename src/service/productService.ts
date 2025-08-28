'use server';

import { shopApiFetch } from '@/service/api';
import { revalidateTag } from 'next/cache';
import { Pager } from '@/types/pagerType';
import { Product, ProductParams } from '../types/productType';

// export const getProducts = unstable_cache(
//   async (params?: ProductParams): Promise<{ items: Product[]; pager: Pager }> => {
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     const response = await ofetch(`/product`, {
//       baseURL: process.env.API_BASE_URL,
//       method: 'GET',
//       query: { ...params, includeMainImage: true },
//     });

//     return {
//       items: response.items,
//       pager: response.pager,
//     };
//   },
//   ['products'],
//   { tags: ['products'] },
// );

export async function getProducts(params?: ProductParams): Promise<{ items: Product[]; pager: Pager }> {
  return await shopApiFetch(`/product`, {
    query: { ...params, includeMainImage: true, includeVariants: true },
  });
}

export async function refetchProducts() {
  revalidateTag('products');
}

export async function fetchProductBySlug(slug: string) {
  return await shopApiFetch(`/product/by-slug/${slug}`);
}

export async function favoriteToggle(productId: number) {
  return await shopApiFetch(`/product/favorite-toggle/${productId}`);
}

export async function isFavorite(productId: number) {
  return await shopApiFetch(`/product/${productId}/favorite`);
}
