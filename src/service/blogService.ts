import { BlogItem, BlogParams, BlogResponse } from '@/types/blogType';
import { shopApiFetch } from './api';

export const getBlogs = async (params: BlogParams): Promise<BlogResponse> => {
  return await shopApiFetch('/blog', { method: 'GET', query: { ...params, includeMainImage: true } });
};

export const getBlogBySlug = async (slug: string) => {
  return await shopApiFetch(`/blog/by-slug/${slug}`, { method: 'GET' });
};

export const getBlogById = async (id: string): Promise<BlogItem> => {
  return await shopApiFetch(`/blog/${id}`, { method: 'GET' });
};
