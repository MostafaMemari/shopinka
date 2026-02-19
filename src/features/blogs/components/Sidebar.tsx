import { FC } from 'react';
import RelatedPosts from './RelatedPosts';
import { getBlogs } from '@/features/blogs/blogsService';

interface SidebarProps {
  categoryIds: number[];
}

const Sidebar: FC<SidebarProps> = async ({ categoryIds }) => {
  const res = await getBlogs({ categoryIds, includeMainImage: true, take: 5 });

  if (!res.success) return;

  const { pager, items } = res.data;

  return (
    <div className="col-span-4 row-span-2 hidden md:block lg:col-span-3">
      <div className="mb-4 overflow-hidden">
        <RelatedPosts postCount={pager.totalCount} posts={items} />
      </div>

      {/* <ShareButton /> */}
    </div>
  );
};

export default Sidebar;
