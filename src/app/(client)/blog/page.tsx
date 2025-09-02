import { Suspense } from 'react';
import { loadSearchParams } from '@/utils/loadSearchParams';
import { SearchParams } from 'nuqs';
import { getBlogs } from '@/service/blogService';
import { BLOG_SORT_OPTIONS, BlogParams } from '@/types/blogType';
import SearchInput from '@/components/features/filter/SearchInput';
import SortBar from '@/components/features/filter/SortBar';
import MobileFilter from '@/components/features/filter/MobileFilter';
import MobileSort from '@/components/features/filter/MobileSort';
import BlogListBlogClient from '@/components/features/blog/BlogListClient';
import MobileSortDrawer from '@/components/features/filter/MobileSortDrawer';

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

  const { items, pager } = await getBlogs(query);

  return (
    <>
      <div className="mb-4 flex flex-col gap-4 md:hidden">
        <div className="rounded-lg bg-muted shadow-base">
          <SearchInput />
        </div>

        <div className="flex items-center justify-center gap-x-4">
          <MobileFilter totalCount={pager.totalCount} type="BLOG" />
          <MobileSortDrawer options={BLOG_SORT_OPTIONS} />
        </div>
      </div>
      <div className="grid grid-cols-12 grid-rows-[60px_min(500px,_1fr)] gap-4">
        <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
          <div className="py-1 rounded-lg bg-muted shadow-base">
            <SearchInput />
          </div>
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
