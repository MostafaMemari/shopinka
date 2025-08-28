import { shopApiFetch } from './api';

export async function getPageBySlug(slug: string) {
  return await shopApiFetch(`/page/by-slug/${slug}`, { next: { revalidate: 60 } });
}
