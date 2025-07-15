import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/service/blogService';
import { NoImage } from '@/types/noImageEnum';
import BlogDetailsView from '@/components/features/blog/BlogDetailsView';
import Sidebar from '@/components/features/blog/Sidebar';
import { Category } from '@/types/categoryType';
import { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
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
    keywords: seo.keywords?.replace(/[^آ-یa-zA-Z0-9،,\s\-]/g, ''),
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const res = await getBlogBySlug(slug);
  const blog = res?.data;

  if (!blog || res.status !== 200) return notFound();

  return (
    <div className="grid grid-cols-12 grid-rows-[60px_min(500px,1fr)] gap-4">
      <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
        <BlogDetailsView
          title={blog.title}
          content={blog.content ?? ''}
          createdAt={blog.createdAt}
          image={blog.mainImage?.fileUrl ? blog.mainImage?.fileUrl : NoImage.BLOG}
          username={blog.user.fullName ?? 'نامشخص'}
        />
      </div>
      <Sidebar categoryIds={blog.categories?.map((category: Category) => category.id) || []} />
    </div>
  );
}
