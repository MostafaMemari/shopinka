import { BlogItem, BlogParams, BlogResponse } from '@/features/blogs/BlogType';
import { ApiResponse, shopApiFetch } from '@/service/api';

export const getBlogs = async (params: BlogParams): Promise<ApiResponse<BlogResponse>> => {
  return await shopApiFetch('/blog', { method: 'GET', query: { ...params, includeMainImage: true } });
};

export const getBlogBySlug = async (slug: string) => {
  return await shopApiFetch(`/blog/by-slug/${slug}`, { method: 'GET' });
};

export const getBlogById = async (id: string): Promise<ApiResponse<BlogItem>> => {
  return await shopApiFetch(`/blog/${id}`, { method: 'GET' });
};
