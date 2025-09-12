import { useAppSelector } from '@/store/hooks';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useBoolean } from '@/hooks/use-boolean';
import { ChevronLeft } from 'lucide-react';
import CommentForm from './CommentForm';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/store/slices/authDialogSlice';
import MobileDrawer from '@/components/common/Drawer';
import Dialog from '@/components/common/Dialog';
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
    else dispatch(openDialog());
  };

  const handleSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const commentButtonLabel = 'پاسخ';
  const commentFormTitle = 'پاسخ به دیدگاه: ' + commentTitle;

  if (isDesktop) {
    return (
      <Dialog
        open={commentControl.value}
        onOpenChange={commentControl.onToggle}
        title={commentFormTitle}
        actions={
          <PrimaryButton onClick={handleSubmit} disabled={isCreateCommentLoading} isLoading={isCreateCommentLoading} className="flex-1">
            ثبت پاسخ
          </PrimaryButton>
        }
        trigger={
          <Button variant="ghost" onClick={handleReplyComment} className="cursor-pointer">
            {commentButtonLabel}
            <ChevronLeft />
          </Button>
        }
      >
        <CommentForm
          ref={formRef}
          productId={productId}
          parentId={parentId}
          onSuccess={commentControl.onFalse}
          createComment={createComment}
        />
      </Dialog>
    );
  }

  return (
    <MobileDrawer
      open={commentControl.value}
      onOpenChange={commentControl.onToggle}
      title="پاسخ به دیدگاه"
      actions={
        <PrimaryButton onClick={handleSubmit} disabled={isCreateCommentLoading} isLoading={isCreateCommentLoading} className="flex-1">
          ثبت پاسخ
        </PrimaryButton>
      }
      trigger={
        <Button variant="ghost" onClick={handleReplyComment} className="cursor-pointer">
          {commentButtonLabel}
          <ChevronLeft />
        </Button>
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
    </MobileDrawer>
  );
}

export default ReplyComment;
