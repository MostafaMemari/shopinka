import Dialog from '@/components/ui/Dialog';
import { useAuth } from '@/hooks/reactQuery/auth/useAuth';
import { useCreateComment } from '@/hooks/reactQuery/comment/useCreateComment';
import useIsMdUp from '@/hooks/useIsMdUp';
import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { AiOutlineComment } from 'react-icons/ai';
import CommentForm, { CommentFormikType } from './CommentForm';
import MobileDrawer from '@/components/ui/MobileDrawer';
import PrimaryButton from '@/components/ui/PrimaryButton';

function CreateComment({ productId }: { productId: number }) {
  const isMdUp = useIsMdUp();
  const [modalState, setModalState] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);
  const { createComment, isCreateCommentLoading } = useCreateComment();

  const pathname = usePathname();
  const { isLogin } = useAuth();
  const router = useRouter();

  const handleFormSubmit = async (values: CommentFormikType) => {
    createComment(
      { ...values, productId },
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

  const handleAddComment = () => {
    if (isLogin) setModalState(true);
    else router.push(`/login/?backUrl=${pathname}`);
  };

  return (
    <>
      <button
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary-600 focus:outline-none focus:ring focus:ring-primary-300 cursor-pointer"
        onClick={handleAddComment}
      >
        <AiOutlineComment className="h-6 w-6" />
        <span>ثبت دیدگاه جدید</span>
      </button>

      {isMdUp ? (
        <Dialog isOpen={modalState} onClose={() => setModalState(false)} title="افزودن نظر جدید" actions={actions} size="xl">
          <div className="mt-4">
            <CommentForm onSubmit={handleFormSubmit} ref={formRef} />
          </div>
        </Dialog>
      ) : (
        <MobileDrawer
          title="افزودن نظر جدید"
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

export default CreateComment;
