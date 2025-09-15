import { BlogItem, BlogParams, BlogResponse } from '@/features/blogs/BlogType';
import { shopApiFetch } from '@/service/api';
import { unwrap } from '@/utils/api-helpers';

export const getBlogs = async (params: BlogParams): Promise<BlogResponse> => {
  const res = await shopApiFetch('/blog', { method: 'GET', query: { ...params, includeMainImage: true } });

  return unwrap(res);
};

export const getBlogBySlug = async (slug: string) => {
  const res = await shopApiFetch(`/blog/by-slug/${slug}`, { method: 'GET' });

  return unwrap(res);
};

export const getBlogById = async (id: string): Promise<BlogItem> => {
  const res = await shopApiFetch(`/blog/${id}`, { method: 'GET' });

  return unwrap(res);
};
