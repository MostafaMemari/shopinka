import { Card } from '@/components/ui/card';
import { BlogItem } from '@/features/blogs/BlogType';
import { NoImage } from '@/types/noImageEnum';
import Image from '@/components/common/UnoptimizedImage';
import Link from 'next/link';
import { FC } from 'react';

interface RelatedPosts {
  postCount: number;
  posts: BlogItem[];
}

const RelatedPosts: FC<RelatedPosts> = ({ posts }) => {
  return (
    <Card className="mb-8 px-2 py-3 xl:px-4">
      <p className="mb-5 text-center text-sm font-medium xl:text-base">مقاله های مرتبط</p>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`${post.slug}`} className="flex items-start gap-x-4">
              <div className="flex gap-x-2 xl:gap-x-4">
                <div className="min-w-fit">
                  <Image
                    src={post.mainImage?.fileUrl ?? NoImage.BLOG}
                    alt="blog"
                    width={64}
                    height={64}
                    className="w-16 rounded-xl xl:w-20"
                  />
                </div>
                <div className="flex flex-col gap-y-2">
                  <p className="line-clamp-2 text-sm text-text/90 xl:text-base">{post.title}</p>
                  <p className="text-xs text-text/60 xl:text-sm">{post.createdAt}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
};

export default RelatedPosts;
