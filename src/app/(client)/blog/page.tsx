import { Suspense } from 'react';
import { loadSearchParams } from '@/utils/loadSearchParams';
import { SearchParams } from 'nuqs';
import { getBlogs } from '@/features/blogs/blogsService';
import { BLOG_SORT_OPTIONS, BlogParams } from '@/features/blogs/BlogType';
import SearchInput from '@/features/filter/SearchInput';
import SortBar from '@/features/filter/SortBar';
import MobileFilter from '@/features/filter/MobileFilter';
import BlogListBlogClient from '@/features/blogs/components/BlogListClient';
import MobileSortDrawer from '@/features/filter/MobileSortDrawer';

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function BlogPage({ searchParams }: PageProps) {
  const params = await loadSearchParams(searchParams);

  const query: BlogParams = {
    page: params.page ?? 1,
    take: params.perPage ?? 20,
    search: params.search ?? '',
    includeMainImage: params.includeMainImage ?? false,
    sortBy: params.sortBy && ['updatedAt'].includes(params.sortBy) ? (params.sortBy as BlogParams['sortBy']) : undefined,
  };

  const res = await getBlogs(query);

  if (!res.success) return;

  const { items, pager } = res.data;

  return (
    <>
      <div className="mb-4 flex flex-col gap-4 md:hidden">
        <SearchInput />

        <div className="flex items-center justify-center gap-x-4">
          <MobileFilter totalCount={pager.totalCount} type="BLOG" />
          <MobileSortDrawer options={BLOG_SORT_OPTIONS} />
        </div>
      </div>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
          <SearchInput />
        </div>
        <div className="col-span-12 space-y-4 md:col-span-8 lg:col-span-9">
          <SortBar options={BLOG_SORT_OPTIONS} queryKey="sortBy" />
          <Suspense fallback={<div>Loading...</div>}>
            <BlogListBlogClient query={query} initialBlogs={items || []} pager={pager} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
