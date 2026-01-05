import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.SITE_URL || 'https://shopinka.ir';
  const API_BASE_URL = process.env.API_BASE_URL || 'https://api.shopinka.ir/api/v1';
  const TAKE = 200;

  const res = await fetch(`${API_BASE_URL}/product?page=1&take=1`, {
    next: { revalidate: 6 * 60 * 60 }, // 6 hours
  });

  if (!res.ok) return [];

  const data = await res.json();
  const totalCount = data.pager.totalCount;
  const totalFiles = Math.ceil(totalCount / TAKE);

  const productSitemaps = Array.from({ length: totalFiles }, (_, i) => ({
    url: `${BASE_URL}/sitemap/products/sitemap/${i}.xml`,
  }));

  return [{ url: `${BASE_URL}/sitemap/categories/sitemap.xml` }, { url: `${BASE_URL}/sitemap/articles/sitemap.xml` }, ...productSitemaps];
}
