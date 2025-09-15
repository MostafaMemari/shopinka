'use server';

import { revalidateTag } from 'next/cache';
import { Pager } from '@/types/pagerType';
import { Product, ProductParams } from '@/features/products/ProductType';
import { unwrap } from '@/utils/api-helpers';
import { shopApiFetch } from '@/service/api';

export const getProducts = async (params?: ProductParams): Promise<{ items: Product[]; pager: Pager }> => {
  const res = await shopApiFetch(`/product`, {
    query: { ...params, includeMainImage: true, includeVariants: true },
  });

  return unwrap(res);
};

export async function refetchProducts() {
  revalidateTag('products');
}

export async function fetchProductBySlug(slug: string) {
  const res = await shopApiFetch(`/product/by-slug/${slug}`);

  return unwrap(res);
}
