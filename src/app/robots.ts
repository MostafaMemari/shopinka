import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const SITE_URL = process.env.SITE_URL || 'https://shopinka.ir';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout/', '/profile/', '/login/', '/register/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
