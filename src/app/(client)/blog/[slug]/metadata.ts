import { getBlogBySlug } from '@/service/blogService';
import type { Metadata } from 'next';

type Params = {
  slug: string;
};

export async function generateBlogMetadata({ slug }: Params): Promise<Metadata> {
  const res = await getBlogBySlug(slug);
  const blog = res?.data;

  if (!blog || res.status !== 200) {
    return {
      title: 'مقاله پیدا نشد',
      description: 'مقاله مورد نظر یافت نشد.',
      robots: 'noindex, nofollow',
    };
  }

  const seo = blog.seoMeta;

  const title = seo?.title || blog.name;
  const description = seo?.description || `خواندن مقاله ${blog.name} در فروشگاه اینترنتی شاپینکا`;
  const ogTitle = seo?.ogTitle || title;
  const ogDescription = seo?.ogDescription || description;
  const imageUrl = seo?.ogImageId ? blog.mainImage?.fileUrl : blog.mainImage?.fileUrl || 'https://shopinka.ir/default-og-image.jpg';

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
    keywords: seo?.keywords?.replace(/[^آ-یa-zA-Z0-9،,\s\-]/g, '') || '',
  };
}
