import { FC } from 'react';
import Link from 'next/link';
import { BlogItem } from '@/features/blogs/types';
import { NoImage } from '@/types/noImageEnum';
import BlogImage from './BlogImage';

import { Card } from '@/components/ui/card';

interface Props {
  blog: BlogItem;
}

const BlogCard: FC<Props> = ({ blog }) => {
  return (
    <Card className="p-px mb-0.5">
      <Link href={`/blog/${blog.slug}`}>
        <div className="p-2">
          <div className="mb-2 md:mb-5" draggable={false}>
            <BlogImage src={blog?.mainImage?.fileUrl ?? NoImage.BLOG} alt={blog.title} />
          </div>
          <div className="mb-2">
            <p className="line-clamp-2 h-10 text-sm md:h-12 md:text-base">{blog.title}</p>
          </div>
          <div className="flex justify-end">
            <p className="text-xs text-primary xs:text-sm">
              {new Date(blog.createdAt).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </p>
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default BlogCard;
