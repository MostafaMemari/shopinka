'use client';

import { useEffect, useState, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import Pagination from '@/features/shopPage/shop/Pagination';
import { Pager } from '@/types/pagerType';
import { useSearchParams } from 'next/navigation';
import { BlogItem, BlogParams } from '../../BlogType';
import LoadingDots from './LoadingDots';
import { getBlogs } from '../../blogsService';
import BlogCard from '../CarouselBlog/BlogCard';

interface BlogListProps {
  initialBlogs: BlogItem[];
  initialQuery: BlogParams;
  pager: Pager;
}

export default function BlogList({ initialBlogs, initialQuery, pager }: BlogListProps) {
  const [blogs, setBlogs] = useState<BlogItem[]>(initialBlogs);
  const [page, setPage] = useState(pager.currentPage);
  const searchParams = useSearchParams();
  const pageQuery = searchParams.get('page');

  const isPageQueryPresent = Boolean(pageQuery);

  const [hasMore, setHasMore] = useState(!isPageQueryPresent && pager.hasNextPage && page < 10);
  const [showPagination, setShowPagination] = useState(isPageQueryPresent || page >= 10);

  useEffect(() => {
    setBlogs(initialBlogs);
    setPage(pager.currentPage);
    setHasMore(!isPageQueryPresent && pager.hasNextPage && pager.currentPage < 10);
    setShowPagination(isPageQueryPresent || pager.currentPage >= 10);
  }, [initialBlogs, pager.currentPage, pager.hasNextPage, isPageQueryPresent]);

  const fetchMore = useCallback(async () => {
    try {
      const nextPage = page + 1;
      const res = await getBlogs({
        ...initialQuery,
        page: nextPage,
        take: initialQuery.take ?? 20,
      });

      if (res.success) {
        const { items: newBlogs, pager: newPager } = res.data;

        setBlogs((prev) => {
          const all = [...prev, ...newBlogs];
          const unique = Array.from(new Map(all.map((p) => [p.id, p])).values());
          return unique;
        });

        setPage(nextPage);

        if (!newPager.hasNextPage || nextPage >= 10) {
          setHasMore(false);
          setShowPagination(true);
        }
      }
    } catch {
      setHasMore(false);
      setShowPagination(true);
    }
  }, [page, initialQuery]);

  return (
    <>
      {hasMore ? (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={blogs.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={<LoadingDots />}
        >
          <div className="grid grid-cols-2 gap-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </InfiniteScroll>
      ) : (
        <div className="grid grid-cols-2 gap-2 xs:gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {showPagination && <Pagination currentPage={page} totalPages={pager.totalPages} />}
    </>
  );
}
