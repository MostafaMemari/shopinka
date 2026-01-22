import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

import { MessageCirclePlus } from 'lucide-react';
import CommentForm from './CommentForm';
import { useBoolean } from '@/hooks/use-boolean';
import AppDialog from '@/components/wrappers/AppDialog';
import PrimaryButton from '@/components/common/PrimaryButton';
import { useCreateComment } from '@/features/comments/hooks/useCreateComment';
import { Button } from '@/components/ui/button';
import AppDrawer from '@/components/wrappers/AppDrawer';
import { useAppSelector } from '@/store/hooks';
import { useDispatch } from 'react-redux';
import { openAuthDialog } from '@/store/slices/authDialogSlice';

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
    else dispatch(openAuthDialog());
  };

  return (
    <>
      <Button onClick={handleButtonClick} className="cursor-pointer">
        <MessageCirclePlus /> {commentButtonLabel}
      </Button>
      {isDesktop ? (
        <AppDialog
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
        </AppDialog>
      ) : (
        <AppDrawer open={commentControl.value} onOpenChange={commentControl.onToggle} title={commentFormTitle} showClose={false}>
          <CommentForm
            className="px-4 mb-4"
            ref={formRef}
            createComment={createComment}
            productId={productId}
            onSuccess={commentControl.onFalse}
          />
          <PrimaryButton
            onClick={handleSubmit}
            disabled={isCreateCommentLoading}
            isLoading={isCreateCommentLoading}
            className="w-full flex-1 mb-2"
          >
            ثبت دیدگاه
          </PrimaryButton>
        </AppDrawer>
      )}
    </>
  );
}

export default CreateComment;
