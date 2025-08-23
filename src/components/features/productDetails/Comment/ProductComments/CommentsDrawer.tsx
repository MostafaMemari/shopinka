'use client';

import React from 'react';
import { CommentItem } from '@/types/commentType';
import Recommendation from './Recommendation';
import { useComment } from '@/hooks/reactQuery/comment/useComment';
import { FaUserCircle } from 'react-icons/fa';
import ReplyComment from '../AddReplyComment/ReplyComment';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui';
import { useBoolean } from '@/hooks/use-boolean';

interface CommentsDrawerProps {
  drawerHandlers: ReturnType<typeof useBoolean>;
  productId: number;
}

function CommentsDrawer({ drawerHandlers, productId }: CommentsDrawerProps) {
  const { data, isLoading } = useComment({
    params: { productId, page: 1 },
  });

  const comments = data?.items || [];

  const onOpenChange = (open: boolean) => {
    if (!open) {
      drawerHandlers.onFalse();
    }
  };

  if (isLoading) {
    return (
      <Drawer open={drawerHandlers.value} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>دیدگاه ها</DrawerTitle>
          </DrawerHeader>

          <p className="text-center text-text/60 py-10">در حال بارگذاری دیدگاه ها...</p>
        </DrawerContent>
      </Drawer>
    );
  }

  if (!comments.length) {
    return (
      <Drawer open={drawerHandlers.value} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader className="text-left">
            <DrawerTitle>دیدگاه ها</DrawerTitle>
          </DrawerHeader>

          <p className="text-center text-text/60 py-10">دیدگاهی برای نمایش وجود ندارد.</p>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Drawer open={drawerHandlers.value} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>دیدگاه ها</DrawerTitle>
        </DrawerHeader>

        <ul className="space-y-5 pb-8">
          {comments.map((comment) => (
            <li key={comment.id}>
              <div className="flex flex-col rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-5 shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FaUserCircle className="text-gray-400 dark:text-zinc-500 w-7 h-7" />
                    <span
                      className={`text-xs font-semibold rounded-full px-2 py-0.5
                    ${comment.userId ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}
                    >
                      {comment.userId ? 'خریدار' : 'کاربر'}
                    </span>
                  </div>
                  <Recommendation isRecommended={comment.isRecommended} />
                  <div>
                    <ReplyComment productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
                  </div>
                </div>
                <h5 className="text-base font-bold text-primary mb-2 truncate">{comment.title}</h5>
                <p className="line-clamp-4 text-sm text-text/90 mb-3">{comment.content}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-700">
                  <span className="text-xs text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</span>
                </div>
                {comment.replies && comment.replies.length > 0 && <ReplyList replies={comment.replies} />}
              </div>
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}

function ReplyList({ replies }: { replies: CommentItem[] }) {
  if (!replies?.length) return null;
  return (
    <ul className="mt-3 space-y-3 border-r pr-3">
      {replies
        .filter((reply) => reply.isActive)
        .map((reply) => (
          <li key={reply.id}>
            <div className="flex flex-col rounded-lg border border-zinc-100 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 px-3 py-3 shadow-sm relative mr-4">
              <div className="flex items-center gap-2 mb-2">
                <FaUserCircle className="text-gray-400 dark:text-zinc-500 w-5 h-5" />
                <span
                  className={`text-xs rounded-full px-2 py-0.5 font-semibold
                    ${reply.userId ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}
                >
                  {reply.userId ? 'خریدار' : 'کاربر'}
                </span>
              </div>
              <h6 className="text-xs font-bold text-primary mb-1 truncate">{reply.title}</h6>
              <p className="line-clamp-4 text-xs text-text/90 mb-1">{reply.content}</p>
              <span className="text-[10px] text-text/60 mt-auto">{new Date(reply.createdAt).toLocaleDateString('fa-IR')}</span>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentsDrawer;
