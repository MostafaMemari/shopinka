'use client';

import React, { useState } from 'react';
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

  if (comments.length === 0 && !isLoading) {
    return (
      <div className="mb-6 text-center text-gray-600 dark:text-gray-300 mt-10">
        <p className="mb-4">دیدگاهی برای این محصول ثبت نشده است.</p>
        <div className="flex justify-center">
          <CreateComment productId={productId} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-2" id="comments">
      <div className="mb-6 flex flex-row md:justify-between md:items-center gap-2">
        <CreateComment productId={productId} />
      </div>

      {isLoading && <LoadingSpinner loadingMessage="در حال بارگذاری دیدگاه‌ها..." />}

      {error && (
        <div className="text-center text-red-500 py-4">
          <p>خطا در بارگذاری دیدگاه‌ها: {error}</p>
        </div>
      )}

      {comments.length > 0 && (
        <div id="commentsContainer">
          <ul className="mb-8 space-y-4 divide-gray-200 dark:divide-white/10">
            {comments.map((comment) => (
              <DesktopComments key={comment.id} comment={comment} />
            ))}
          </ul>

          {commentPager.totalCount > 0 && commentPager.totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={commentPager.totalPages} onPageChange={handlePageChange} />
          )}
        </div>
      )}
    </div>
  );
}
