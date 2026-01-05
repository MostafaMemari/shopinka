import { MetadataRoute } from 'next';

const BASE_URL = process.env.SITE_URL || 'https://shopinka.ir';
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.shopinka.ir/api/v1';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(`${API_BASE_URL}/category/sitemap`, {
    next: { revalidate: 12 * 60 * 60 }, // 12 hours
  });

  if (!res.ok) return [];

  const data = await res.json();
  const urls: MetadataRoute.Sitemap = [];

  function traverse(category: any) {
    urls.push({
      url: `${BASE_URL}/${category.type === 'BLOG' ? 'article' : 'product'}-category/${category.slugParent}`,
      lastModified: category.updatedAt ? new Date(category.updatedAt) : undefined,
      changeFrequency: 'weekly',
      priority: category.type === 'BLOG' ? 0.7 : 0.8,
    });

    if (category.children?.length) {
      category.children.forEach(traverse);
    }
  }

  data.forEach(traverse);

  return urls;
}
