import { Category, CategoryParams } from './CategoryType';
import { unstable_cache } from 'next/cache';
import { ofetch } from 'ofetch';
import { Pager } from '@/types/pagerType';
import { ApiResponse, ExtraOptions, shopApiFetch } from '@/service/api';

export async function getCategories(params?: CategoryParams) {
  return await shopApiFetch('/category', {
    query: { ...params },
  });
}

export const getCategoryBySlug = async (slug: string, options?: ExtraOptions): Promise<ApiResponse<Category>> => {
  return await shopApiFetch(`/category/by-slug/${slug}`, { method: 'GET', ...options });
};

// export const getCategoryBySlug = unstable_cache(
//   async (slug: string): Promise<Category | never> => {
//     const res = await ofetch(`/category/by-slug/${slug}`, {
//       baseURL: process.env.API_BASE_URL,
//       method: 'GET',
//     });

//     return res as Category;
//   },
//   ['slug'],
//   { tags: ['categories'] },
// );

export const getCategoriesCatch = unstable_cache(
  async (params?: CategoryParams): Promise<{ items: Category[]; pager: Pager }> => {
    const res = await ofetch(`/category`, {
      baseURL: process.env.API_BASE_URL,
      method: 'GET',
      query: { ...params },
    });

    return {
      items: res.items,
      pager: res.pager,
    };
  },
  ['categories'],
  { tags: ['categories'] },
);
