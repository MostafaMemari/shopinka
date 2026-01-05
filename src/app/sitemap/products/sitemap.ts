import type { MetadataRoute } from 'next';

const BASE_URL = process.env.SITE_URL || 'https://shopinka.ir';
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.shopinka.ir/api/v1';
const TAKE = 200;

export async function generateSitemaps() {
  const res = await fetch(`${API_BASE_URL}/product?page=1&take=1`, {
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) return [];

  const data = await res.json();
  const totalCount = data.pager.totalCount;
  const totalFiles = Math.ceil(totalCount / TAKE);

  return Array.from({ length: totalFiles }, (_, i) => ({
    id: i,
  }));
}

export default async function sitemap(props: { id: Promise<string> }): Promise<MetadataRoute.Sitemap> {
  const id = Number(await props.id);
  const page = id + 1;

  const res = await fetch(`${API_BASE_URL}/product?page=${page}&take=${TAKE}`);

  if (!res.ok) return [];

  const data = await res.json();

  return data.items.map((product: any) => ({
    url: `${BASE_URL}/product/${encodeURIComponent(product.slug)}`,
    lastModified: new Date(product.updatedAt),
  }));
}
