'use client';

import React from 'react';
import { CommentItem } from '@/types/commentType';
import Recommendation from './Recommendation';
import { useComment } from '@/features/comments/hooks/useComment';
import ReplyComment from '../AddReplyComment/ReplyComment';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBoolean } from '@/hooks/use-boolean';
import { UserCircle } from 'lucide-react';
import AppDrawer from '@/components/wrappers/AppDrawer';

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
      <AppDrawer open={drawerHandlers.value} onOpenChange={onOpenChange} title="دیدگاه ها">
        <p className="text-center text-text/60 py-10">در حال بارگذاری دیدگاه ها...</p>
      </AppDrawer>
    );
  }

  if (!comments.length) {
    return (
      <AppDrawer open={drawerHandlers.value} onOpenChange={onOpenChange} title="دیدگاه ها">
        <p className="text-center text-text/60 py-10">دیدگاهی برای نمایش وجود ندارد.</p>
      </AppDrawer>
    );
  }

  return (
    <AppDrawer open={drawerHandlers.value} onOpenChange={onOpenChange} title="دیدگاه ها">
      <ul className="space-y-5 pb-8 mx-4">
        {comments.map((comment) => (
          <li key={comment.id}>
            <Card className="flex flex-col p-4 shadow-md">
              <CardHeader className="flex items-center justify-between mb-3 p-0">
                <div className="flex items-center gap-2">
                  <UserCircle className="text-gray-400 dark:text-zinc-500 w-7 h-7" />
                  <span
                    className={`text-xs font-semibold rounded-full px-2 py-0.5
                    ${comment.userId ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}
                  >
                    کاربر
                  </span>
                </div>
                <Recommendation isRecommended={comment.isRecommended} />
                <div>
                  <ReplyComment productId={comment.productId} parentId={comment.id} commentTitle={comment.title} />
                </div>
              </CardHeader>

              <CardContent className="p-0 mb-3 flex flex-col gap-3">
                <CardTitle className="flex justify-between">
                  {comment.title}

                  <span className="text-xs text-text/60">{new Date(comment.createdAt).toLocaleDateString('fa-IR')}</span>
                </CardTitle>
                <p className="line-clamp-4 text-sm text-text/90">{comment.content}</p>
              </CardContent>

              {comment.replies && comment.replies.length > 0 && <ReplyList replies={comment.replies} />}
            </Card>
          </li>
        ))}
      </ul>
    </AppDrawer>
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
            <Card className="flex flex-col p-3 bg-gray-50 dark:bg-zinc-800">
              <CardHeader className="flex items-center justify-between mb-2 p-0">
                <div className="flex items-center gap-2">
                  <UserCircle className="text-gray-400 dark:text-zinc-500 w-5 h-5" />
                  <span
                    className={`text-xs rounded-full px-2 py-0.5 font-semibold
                    ${reply.userId ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'}`}
                  >
                    کاربر
                  </span>
                </div>

                <span className="text-[10px] text-text/60 mt-auto">{new Date(reply.createdAt).toLocaleDateString('fa-IR')}</span>
              </CardHeader>
              <h6 className="text-xs font-bold text-primary mb-1 truncate">{reply.title}</h6>
              <p className="line-clamp-4 text-xs text-text/90 mb-1">{reply.content}</p>
            </Card>
          </li>
        ))}
    </ul>
  );
}

export default CommentsDrawer;
