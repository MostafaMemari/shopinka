import { fetchProductBySlug } from '@/service/productService';
import type { Metadata } from 'next';

type Params = {
  slug: string;
};

export async function generateProductMetadata({ slug }: Params): Promise<Metadata> {
  const res = await fetchProductBySlug(slug);
  const product = res?.data;

  if (!product || res.status !== 200) {
    return {
      title: 'محصول پیدا نشد',
      description: 'محصول مورد نظر یافت نشد.',
      robots: 'noindex, nofollow',
    };
  }

  const seo = product.seoMeta;

  const title = seo?.title || product.name;
  const description = seo?.description || `خرید ${product.name} با بهترین قیمت از فروشگاه اینترنتی شاپینکا`;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const imageUrl =
    seo?.ogImageId && product.mainImage?.fileUrl
      ? product.mainImage.fileUrl
      : product.mainImage?.fileUrl || 'https://shopinka.ir/default-og-image.jpg';

  const keywords = typeof seo?.keywords === 'string' ? seo.keywords.replace(/[^آ-یa-zA-Z0-9،,\s\-]/g, '') : '';

  return {
    title,
    description,
    alternates: {
      canonical: seo?.canonicalUrl,
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: seo?.canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    robots: seo?.robotsTag || 'index, follow',
    keywords,
  };
}
