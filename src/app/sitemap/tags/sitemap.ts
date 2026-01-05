import { MetadataRoute } from 'next';

const BASE_URL = process.env.SITE_URL || 'https://shopinka.ir';
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.shopinka.ir/api/v1';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${API_BASE_URL}/tag?page=1&take=1000`, {
    next: { revalidate: 12 * 60 * 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();

  return data.items.map((tag: any) => ({
    url: `${BASE_URL}/tag/${tag.slug}`,
    lastModified: new Date(tag.updatedAt),
  }));
}
