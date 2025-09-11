'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import CommentsDrawer from './CommentsDrawer';
import { CommentItem } from '@/types/commentType';
import Recommendation from './Recommendation';
import { useBoolean } from '@/hooks/use-boolean';
import { ChevronLeft, UserCircle } from 'lucide-react';

interface Props {
  comments: CommentItem[];
  productId: number;
  drawerHandlers: ReturnType<typeof useBoolean>;
}

export default function MobileCommentsCarousel({ comments, productId, drawerHandlers }: Props) {
  return (
    <div className="md:hidden" dir="rtl">
      <Carousel
        opts={{
          align: 'start',
          direction: 'rtl',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="flex gap-2">
          {comments
            .filter((comment) => comment.isActive)
            .map((comment) => (
              <CarouselItem key={comment.id} className="basis-[85%] sm:basis-[45%] lg:basis-[30%]">
                <Card className="h-56 rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md transition hover:shadow-lg">
                  <CardContent className="p-4 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <UserCircle className="text-gray-400 dark:text-zinc-500 w-6 h-6" />
                        <span className="bg-gray-100 text-xs rounded-full px-2 py-0.5 flex items-center gap-1">{'کاربر'}</span>
                      </div>
                      <Recommendation isRecommended={comment.isRecommended} />
                    </div>
                    <h5 className="text-base font-bold text-primary mb-1 truncate">{comment.title}</h5>
                    <p className="line-clamp-4 text-sm text-text/90 mb-2">{comment.content}</p>
                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                      <span className="text-xs text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</span>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}

          <CarouselItem className="basis-[85%] sm:basis-[45%] lg:basis-[30%]">
            <Card className="h-56 rounded-xl flex items-center justify-center border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-md transition hover:shadow-lg">
              <CardContent className="flex flex-col items-center justify-center gap-y-2 text-primary">
                <button
                  type="button"
                  onClick={drawerHandlers.onTrue}
                  className="flex flex-col items-center justify-center gap-y-2 text-primary"
                >
                  <div className="rounded-full border border-primary p-2 bg-primary/10">
                    <ChevronLeft className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-semibold">مشاهده بیشتر</div>
                </button>
              </CardContent>
            </Card>
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <CommentsDrawer drawerHandlers={drawerHandlers} productId={productId} />
    </div>
  );
}
