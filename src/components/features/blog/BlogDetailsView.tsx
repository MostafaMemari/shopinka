import { FC } from 'react';
import { BiTime, BiUser } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import { NoImage } from '@/types/noImageEnum';
import Image from 'next/image';
import ShareButton from './ShareButton';

interface BlogDetailsViewProps {
  title: string;
  username: string;
  createdAt: string;
  image: string;
  content: string;
  readingTime?: string;
}

const BlogDetailsView: FC<BlogDetailsViewProps> = ({ title, username, createdAt, image, content, readingTime }) => {
  return (
    <div className="rounded-lg bg-muted p-3 shadow-base md:p-5">
      <h1 className="mb-6 font-semibold text-lg md:text-xl leading-relaxed">{title}</h1>

      {/* تصویر بلاگ */}
      <div className="mb-6">
        <Image src={image || NoImage.BLOG} alt="blog" width={600} height={400} className="w-full rounded-xl" unoptimized />
      </div>

      {/* اطلاعات متا: نویسنده، تاریخ، زمان مطالعه */}
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-text/80 border-b border-border pb-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* نویسنده */}
          <div className="flex items-center gap-x-1">
            <BiUser className="w-4 h-4" />
            <span className="font-medium">{username}</span>
          </div>

          {/* جداکننده */}
          <span className="hidden sm:block h-4 w-px bg-border rounded-full"></span>

          {/* تاریخ انتشار */}
          <div className="flex items-center gap-x-1">
            <BiTime className="w-4 h-4" />
            <span>
              {new Date(createdAt).toLocaleDateString('fa-IR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              })}
            </span>
          </div>

          {readingTime && (
            <>
              <span className="hidden sm:block h-4 w-px bg-border rounded-full"></span>
              <div className="flex items-center gap-x-1">
                <BsBook className="w-4 h-4" />
                <span>{readingTime}</span>
              </div>
            </>
          )}
        </div>

        <ShareButton />
      </div>

      <div
        className="leading-loose prose prose-sm max-w-none p-2 text-text/90"
        style={{ lineHeight: '2', letterSpacing: '.01em' }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};

export default BlogDetailsView;
