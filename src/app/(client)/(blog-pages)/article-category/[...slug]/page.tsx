import { SearchParams } from 'nuqs';

import { getCategories } from '@/features/categories/cartService';
import CategoryChildrenGrid from '@/features/categories/components/CategoryListGrid';
import CategoryOverview from '@/features/categories/components/CategoryOverview';
import BlogList from '@/features/blogs/components/Blog/BlogList';
import { BlogParams } from '@/features/blogs/BlogType';
import { getBlogs } from '@/features/blogs/blogsService';
import SearchInput from '@/features/filter/SearchInput';
import { Card } from '@/components/ui/card';
import CategorySelector from '@/features/categories/components/CategorySelector';
import { loadSearchParams, parseArrayParam } from '@/lib/utils';

type PageProps = {
  searchParams: Promise<SearchParams>;
  params: Promise<{ slug: string[] }>;
};

export default async function BlogPage({ searchParams, params }: PageProps) {
  const queryParams = await loadSearchParams(searchParams);
  const { slug } = await params;
  const lastSlug = slug[slug.length - 1];

  const query: BlogParams = {
    page: queryParams.page ?? 1,
    take: queryParams.perPage ?? 10,
    categoryIds: parseArrayParam(queryParams.categoryIds ?? undefined),
    search: queryParams.search,
    includeMainImage: true,
    sortBy: queryParams.sortBy && ['newest'].includes(queryParams.sortBy) ? (queryParams.sortBy as BlogParams['sortBy']) : undefined,
  };

  const resCategory = await getCategories({
    type: 'BLOG',
    slug: lastSlug,
    includeOnlyTopLevel: false,
    includeThumbnailImage: true,
    includeChildren: true,
    childrenDepth: 3,
  });

  if (!resCategory.success) return;

  const resBlog = await getBlogs({
    ...query,
    categoryIds: query.categoryIds ? query.categoryIds : [resCategory.data.items[0].id],
  });

  if (!resBlog.success) return;

  const { items: blogs, pager } = resBlog.data;

  const category = resCategory.data.items[0];

  return (
    <>
      <CategoryChildrenGrid name={category.name} basePath={`article-category/${category.slug}`} categories={category.children} />

      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <div className="col-span-4 row-span-2 hidden md:flex md:flex-col lg:col-span-3 gap-4">
          <SearchInput />
          {category && category.children.length > 0 && (
            <Card className="px-3 py-0">
              <CategorySelector title="فیلتر بر اساس دسته‌بندی" categories={category.children} />
            </Card>
          )}
        </div>
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <BlogList
            initialBlogs={blogs}
            initialQuery={{
              ...query,
              categoryIds: query.categoryIds ? query.categoryIds : [category.id],
            }}
            pager={pager}
          />
        </div>
      </div>

      <CategoryOverview name={category.name} description={category.description || ''} thumbnailImage={category.thumbnailImage} />
    </>
  );
}
