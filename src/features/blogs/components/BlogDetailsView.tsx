import { FC } from 'react';
import Image from 'next/image';
import { NoImage } from '@/types/noImageEnum';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, User, Book } from 'lucide-react';
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
    <Card className="rounded-2xl shadow-md">
      <CardContent>
        <h1 className="mb-6 font-semibold text-xl md:text-2xl leading-relaxed">{title}</h1>

        <div className="mb-6">
          <Image src={image || NoImage.BLOG} alt="blog" width={800} height={500} className="w-full rounded-xl object-cover" unoptimized />
        </div>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-muted-foreground border-b pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${username}`} />
                <AvatarFallback>{username[0]}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{username}</span>
            </div>

            <Separator orientation="vertical" className="hidden sm:block h-5" />

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
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
                <Separator orientation="vertical" className="hidden sm:block h-5" />
                <div className="flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  <span>{readingTime}</span>
                </div>
              </>
            )}
          </div>

          <ShareButton />
        </div>

        <div
          className="prose prose-neutral dark:prose-invert prose-sm max-w-none text-foreground leading-relaxed"
          style={{ lineHeight: '2', letterSpacing: '.01em' }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
    </Card>
  );
};

export default BlogDetailsView;
