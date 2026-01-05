export const BASE_URL = process.env.SITE_URL || 'https://shopinka.ir';
const API_BASE_URL = process.env.API_BASE_URL || 'https://api.shopinka.ir/api/v1';
export const TAKE = 200;

export async function fetchSitemapItems(type: 'product' | 'category' | 'tag', page = 1, take = TAKE) {
  const url = `${API_BASE_URL}/${type}?page=${page}&take=${take}`;
  const res = await fetch(url, {
    next: { revalidate: 60 * 60 },
  });

  if (!res.ok) {
    console.error(`[SITEMAP] Failed to fetch ${type} page ${page}`);
    return { items: [], pager: { totalCount: 0 } };
  }

  return res.json();
}

export async function getTotalPages(type: 'product' | 'category' | 'tag') {
  const data = await fetchSitemapItems(type, 1, 1);
  const totalCount = data.pager?.totalCount || data.items.length || 0;
  return Math.ceil(totalCount / TAKE);
}

export async function getItemsForPage(type: 'product' | 'category' | 'tag', page: number) {
  const data = await fetchSitemapItems(type, page, TAKE);
  return data.items;
}
