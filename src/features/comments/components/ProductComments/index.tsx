'use client';

import React, { useState } from 'react';
import MobileCommentsSwiper from './MobileCommentsSwiper';
import Pagination from '@/components/common/Pagination';
import DesktopComments from './DesktopComments';
import { CommentItem } from '@/types/commentType';
import { useComment } from '@/features/comments/hooks/useComment';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import CreateComment from '../AddReplyComment/CreateComment';
import { useBoolean } from '@/hooks/use-boolean';
import { ChevronLeftCircle } from 'lucide-react';

interface Props {
  productId: number;
}

export default function ProductComments({ productId }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const drawerHandlers = useBoolean();

  const { data, isLoading, error } = useComment({
    params: { productId, page: currentPage },
  });

  const comments: CommentItem[] = data?.items || [];
  const commentPager = data?.pager ?? { totalCount: 0, totalPages: 1 };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (comments?.length === 0) {
    return (
      <div className="mb-6">
        <div className="text-center text-gray-600 dark:text-gray-300 mt-10">
          <p className="mb-4">دیدگاهی برای این محصول ثبت نشده است.</p>
          <div className="flex justify-center">
            <CreateComment productId={productId} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2" id="comments">
      {isLoading ? (
        <LoadingSpinner loadingMessage="در حال بارگذاری دیدگاه‌ها..." />
      ) : (
        <div className="mb-6">
          <div className="flex items-center justify-between gap-x-2 pb-4">
            <div className="hidden md:block">
              <CreateComment productId={productId} />
            </div>
            <div className="md:hidden flex justify-between items-center w-full">
              <div>
                <CreateComment productId={productId} />
              </div>
              <div onClick={drawerHandlers.onTrue} className="text-sm flex items-center gap-x-1 text-primary cursor-pointer">
                {`مشاهده ${comments.length} دیدگاه`} <ChevronLeftCircle className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      )}

      {comments?.length !== 0 && (
        <MobileCommentsSwiper comments={comments.slice(0, 5)} productId={productId} drawerHandlers={drawerHandlers} />
      )}

      {error && (
        <div className="text-center text-red-500 py-4">
          <p>خطا در بارگذاری دیدگاه‌ها: {error}</p>
        </div>
      )}

      <div>
        <div className="order-first col-span-12 mb-10 md:order-last md:col-span-8 lg:col-span-9" id="commentsContainer">
          <div className="hidden md:block">
            <ul className="mb-8 space-y-4 divide-gray-200 dark:divide-white/10">
              {comments.map((comment) => (
                <DesktopComments key={comment.id} comment={comment} />
              ))}
            </ul>

            {commentPager?.totalCount > 0 && commentPager?.totalPages > 1 && (
              <Pagination currentPage={currentPage} totalPages={commentPager?.totalPages} onPageChange={handlePageChange} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
