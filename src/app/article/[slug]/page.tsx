import { notFound } from 'next/navigation';
import { getBlogBySlug } from '@/features/blogs/blogsService';
import Sidebar from '@/features/blogs/components/Sidebar';
import { Category } from '@/features/categories/CategoryType';
import type { Metadata } from 'next';
import { generateBlogMetadata } from './metadata';
import Image from '@/components/common/UnoptimizedImage';
import { NoImage } from '@/types/noImageEnum';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, Timer, User2 } from 'lucide-react';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  return generateBlogMetadata({ slug });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const res = await getBlogBySlug(slug);

  if (!res.success || !res.data) notFound();

  const blog = res.data;

  const title = blog.title ?? 'بدون عنوان';
  const content = blog.content ?? '';
  const createdAt = blog.createdAt ?? new Date().toISOString();
  const image = blog.mainImage?.fileUrl ?? NoImage.BLOG;
  const username = blog.user?.fullName ?? 'نامشخص';
  const readingTime = blog.readingTime ?? null;

  const categoryIds = blog.categories?.map((c: Category) => c.id) ?? [];

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 md:col-span-8 lg:col-span-9 space-y-4">
        <Card className="shadow-md">
          <CardContent className="space-y-4">
            <h1 className="text-xl md:text-2xl font-semibold leading-relaxed">{title}</h1>

            <Separator />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-muted-foreground w-full">
              <div className="flex flex-wrap items-center justify-between gap-4 w-full">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <User2 className="w-3 h-3 xl:w-4 xl:h-4" />

                    <span className="text-xs xl:text-sm">{username}</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 xl:w-4 xl:h-4" />
                    <span className="text-xs xl:text-sm">
                      {new Date(createdAt).toLocaleDateString('fa-IR', { year: 'numeric', month: '2-digit', day: '2-digit' })}
                    </span>
                  </div>
                </div>

                {readingTime && (
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <Timer className="w-3 h-3 xl:w-4 xl:h-4" />
                    <span className="text-xs xl:text-sm">{readingTime} دقیقه مطالعه</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <Image src={image} alt={title} width={800} height={500} className="w-full rounded-xl object-cover" />
            </div>

            <div className="prose max-w-full" style={{ lineHeight: '1.8', letterSpacing: '.01em' }}>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </CardContent>
        </Card>
      </div>

      <Sidebar categoryIds={categoryIds} />
    </div>
  );
}
