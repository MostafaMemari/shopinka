import Dialog from '@/components/common/Dialog';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { useCreateComment } from '@/hooks/reactQuery/comment/useCreateComment';
import useIsMdUp from '@/hooks/useIsMdUp';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { AiOutlineLeft } from 'react-icons/ai';
import CommentForm, { CommentFormikType } from './CommentForm';
import MobileDrawer from '@/components/common/MobileDrawer';
import PrimaryButton from '@/components/common/PrimaryButton';

interface ReplyCommentProps {
  productId: number;
  parentId: number;
  commentTitle: string;
}

function ReplyComment({ productId, parentId, commentTitle }: ReplyCommentProps) {
  const isMdUp = useIsMdUp();
  const [modalState, setModalState] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const { createComment, isCreateCommentLoading } = useCreateComment();

  const pathname = usePathname();
  const { isLogin } = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (values: CommentFormikType) => {
    createComment(
      { ...values, productId, parentId },
      () => {
        setModalState(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      },
      (error) => {
        console.error('خطا در ارسال فرم:', error);
      },
    );
  };

  const handleSubmit = () => {
    if (formRef.current) formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  const actions = (
    <PrimaryButton type="button" onClick={handleSubmit} isLoading={isCreateCommentLoading} disabled={isCreateCommentLoading}>
      ارسال دیدگاه
    </PrimaryButton>
  );

  const handleReplyComment = () => {
    if (isLogin) setModalState(true);
    else router.push(`/login/?backUrl=${pathname}`);
  };

  return (
    <>
      <button type="button" onClick={handleReplyComment} className="btn-secondary-nobg cursor-pointer">
        پاسخ
        <AiOutlineLeft className="h-5 w-5" />
      </button>

      {isMdUp ? (
        <Dialog
          isOpen={modalState}
          onClose={() => setModalState(false)}
          title={`پاسخ به دیدگاه "${commentTitle}"`}
          actions={actions}
          size="xl"
        >
          <div className="mt-4">
            <CommentForm onSubmit={handleFormSubmit} ref={formRef} />
          </div>
        </Dialog>
      ) : (
        <MobileDrawer
          title={`پاسخ به دیدگاه "${commentTitle}"`}
          isOpen={modalState}
          onOpen={() => setModalState(true)}
          onClose={() => setModalState(false)}
          footerActions={actions}
        >
          <CommentForm onSubmit={handleFormSubmit} ref={formRef} />
        </MobileDrawer>
      )}
    </>
  );
}

export default ReplyComment;
