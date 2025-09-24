'use server';

import { Pager } from '@/types/pagerType';
import { Product, ProductParams } from '@/features/products/ProductType';
import { ApiResponse, shopApiFetch } from '@/service/api';

export const getProducts = async (params?: ProductParams): Promise<ApiResponse<{ items: Product[]; pager: Pager }>> => {
  return await shopApiFetch(`/product`, {
    query: { ...params, includeMainImage: true, includeVariants: true },
  });
};

export async function fetchProductBySlug(slug: string) {
  return await shopApiFetch(`/product/by-slug/${slug}`);
}
