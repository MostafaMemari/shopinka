import { useAppSelector } from '@/store/hooks';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useBoolean } from '@/hooks/use-boolean';
import { ChevronLeft } from 'lucide-react';
import CommentForm from './CommentForm';
import { useDispatch } from 'react-redux';
import { openAuthDialog } from '@/store/slices/authDialogSlice';
import AppDrawer from '@/components/wrappers/AppDrawer';
import AppDialog from '@/components/wrappers/AppDialog';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useCreateComment } from '../../hooks/useCreateComment';
import { useRef } from 'react';

interface ReplyCommentProps {
  productId: number;
  parentId: number;
  commentTitle: string;
}

function ReplyComment({ productId, parentId, commentTitle }: ReplyCommentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const dispatch = useDispatch();
  const commentControl = useBoolean(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { createComment, isCreateCommentLoading } = useCreateComment();

  const { isLogin } = useAppSelector((state) => state.auth);

  const handleReplyComment = () => {
    if (isLogin) commentControl.onTrue();
    else dispatch(openAuthDialog());
  };

  const handleSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const commentButtonLabel = 'پاسخ';
  const commentFormTitle = 'پاسخ به دیدگاه: ' + commentTitle;

  return (
    <>
      <button onClick={handleReplyComment} className="flex justify-center items-center gap-2 text-sm cursor-pointer">
        {commentButtonLabel}
        <ChevronLeft className="w-4 h-4" />
      </button>
      {isDesktop ? (
        <AppDialog
          open={commentControl.value}
          onOpenChange={commentControl.onToggle}
          title={commentFormTitle}
          actions={
            <PrimaryButton onClick={handleSubmit} disabled={isCreateCommentLoading} isLoading={isCreateCommentLoading} className="flex-1">
              ثبت پاسخ
            </PrimaryButton>
          }
        >
          <CommentForm
            ref={formRef}
            productId={productId}
            parentId={parentId}
            onSuccess={commentControl.onFalse}
            createComment={createComment}
          />
        </AppDialog>
      ) : (
        <AppDrawer
          open={commentControl.value}
          onOpenChange={commentControl.onToggle}
          title="پاسخ به دیدگاه"
          actions={
            <PrimaryButton onClick={handleSubmit} disabled={isCreateCommentLoading} isLoading={isCreateCommentLoading} className="flex-1">
              ثبت پاسخ
            </PrimaryButton>
          }
        >
          <CommentForm
            className="p-4"
            ref={formRef}
            productId={productId}
            parentId={parentId}
            onSuccess={commentControl.onFalse}
            createComment={createComment}
          />
        </AppDrawer>
      )}
    </>
  );
}

export default ReplyComment;
