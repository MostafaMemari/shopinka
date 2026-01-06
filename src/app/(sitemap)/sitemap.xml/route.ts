const BASE_URL = process.env.SITE_URL!;
const API_BASE_URL = process.env.API_BASE_URL!;
const TAKE = 1000;

async function getDynamicProductSitemaps() {
  const res = await fetch(`${API_BASE_URL}/product?page=1&take=${TAKE}`, { next: { revalidate: 6 * 60 * 60 } });

  if (!res.ok) return '';

  const data = await res.json();
  const totalPages = Math.ceil(data.pager.totalCount / TAKE);

  return Array.from(
    { length: totalPages },
    (_, id) => `
    <sitemap>
      <loc>${BASE_URL}/sitemap/products/sitemap/${id}.xml</loc>
    </sitemap>
  `,
  ).join('');
}

export async function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

  <sitemap>
    <loc>${BASE_URL}/sitemap/categories/sitemap.xml</loc>
  </sitemap>

  <sitemap>
    <loc>${BASE_URL}/sitemap/articles/sitemap.xml</loc>
  </sitemap>

  ${await getDynamicProductSitemaps()}

</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml; charset=utf-8',
    },
  });
}
