import { getBlogs } from '@/features/blogs/blogsService';
import { BlogParams } from '@/features/blogs/BlogType';
import { QueryKeys } from '@/types/query-keys';
import { useQuery } from '@tanstack/react-query';

export function useBlogs({
  enabled = true,
  params = {},
  staleTime = 1 * 60 * 1000,
}: {
  enabled?: boolean;
  staleTime?: number;
  params?: BlogParams;
  keepPreviousData?: boolean;
}) {
  return useQuery<any, Error>({
    queryKey: [QueryKeys.Blogs, params],
    queryFn: () => getBlogs(params),
    enabled,
    staleTime,
    refetchOnWindowFocus: false,
  });
}
