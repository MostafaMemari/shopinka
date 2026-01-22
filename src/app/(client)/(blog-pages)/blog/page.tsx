import { loadSearchParams } from '@/lib/utils';
import { SearchParams } from 'nuqs';
import { getCategories } from '@/features/categories/cartService';
import CategoryChildrenGrid from '@/features/categories/components/CategoryListGrid';
import BlogList from '@/features/blogs/components/Blog/BlogList';
import { BlogParams } from '@/features/blogs/BlogType';
import { getBlogs } from '@/features/blogs/blogsService';
import SearchInput from '@/features/filter/SearchInput';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function BlogPage({ searchParams }: PageProps) {
  const queryParams = await loadSearchParams(searchParams);

  const query: BlogParams = {
    page: queryParams.page ?? 1,
    take: queryParams.perPage ?? 10,
    search: queryParams.search,
    includeMainImage: true,
    sortBy: queryParams.sortBy && ['newest'].includes(queryParams.sortBy) ? (queryParams.sortBy as BlogParams['sortBy']) : undefined,
  };

  const resCategory = await getCategories({
    type: 'BLOG',
    includeThumbnailImage: true,
    includeChildren: true,
    childrenDepth: 3,
  });

  const resBlog = await getBlogs({ ...query });

  if (!resBlog.success || !resCategory.success) return;

  const { items: blogs, pager } = resBlog.data;

  return (
    <>
      <CategoryChildrenGrid basePath="article-category" name="دسته‌بندی ها" categories={resCategory.data.items} />

      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <div className="col-span-4 row-span-2 hidden md:flex md:flex-col lg:col-span-3 gap-4">
          <SearchInput />
        </div>
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <BlogList initialBlogs={blogs} initialQuery={query} pager={pager} />
        </div>
      </div>
    </>
  );
}
