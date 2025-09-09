import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

import { MessageCirclePlus } from 'lucide-react';
import CommentForm from './CommentForm';
import { useBoolean } from '@/hooks/use-boolean';
import Dialog from '@/components/common/Dialog';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useCreateComment } from '@/features/comments/hooks/useCreateComment';
import { Button } from '@/components/ui/button';
import MobileDrawer from '@/components/common/Drawer';
import { useAppSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/store/slices/authDialogSlice';

function CreateComment({ productId }: { productId: number }) {
  const commentControl = useBoolean(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const { createComment, isCreateCommentLoading } = useCreateComment();
  const isLogin = useAppSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const commentButtonLabel = 'ثبت دیدگاه جدید';
  const commentFormTitle = 'افزودن دیدگاه جدید';

  const handleSubmit = () => {
    formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const handleButtonClick = () => {
    if (isLogin) commentControl.onTrue();
    else dispatch(openDialog());
  };

  return (
    <>
      <Button onClick={handleButtonClick} className="cursor-pointer">
        <MessageCirclePlus /> {commentButtonLabel}
      </Button>
      {isDesktop ? (
        <Dialog
          open={commentControl.value}
          onOpenChange={commentControl.onToggle}
          title={commentFormTitle}
          actions={
            <PrimaryButton onClick={handleSubmit} disabled={isCreateCommentLoading} isLoading={isCreateCommentLoading} className="flex-1">
              ثبت دیدگاه
            </PrimaryButton>
          }
        >
          <CommentForm
            className="px-4"
            ref={formRef}
            createComment={createComment}
            productId={productId}
            onSuccess={commentControl.onFalse}
          />
        </Dialog>
      ) : (
        <MobileDrawer
          open={commentControl.value}
          onOpenChange={commentControl.onToggle}
          title={commentFormTitle}
          actions={
            <PrimaryButton onClick={handleSubmit} disabled={isCreateCommentLoading} isLoading={isCreateCommentLoading} className="flex-1">
              ثبت دیدگاه
            </PrimaryButton>
          }
        >
          <CommentForm
            className="px-4"
            ref={formRef}
            createComment={createComment}
            productId={productId}
            onSuccess={commentControl.onFalse}
          />
        </MobileDrawer>
      )}
    </>
  );
}

export default CreateComment;
