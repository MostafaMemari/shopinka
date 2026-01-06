import { MetadataRoute } from 'next';

const BASE_URL = process.env.SITE_URL || 'https://shopinka.ir';
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.shopinka.ir/api/v1';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${API_BASE_URL}/blog?page=1&take=200`, {
    next: { revalidate: 12 * 60 * 60 }, // 12 hours
  });

  if (!res.ok) return [];

  const data = await res.json();

  return data.items.map((article: any) => ({
    url: `${BASE_URL}/article/${article.slug}`,
    lastModified: article.updatedAt ? new Date(article.updatedAt) : undefined,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));
}
