import { useAuth } from '@/hooks/reactQuery/auth/useAuth';

import { usePathname, useRouter } from 'next/navigation';
import React, { useRef, useState } from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui';
import { MapPinPlus } from 'lucide-react';
import CommentForm from './CommentForm';

function CreateComment({ productId }: { productId: number }) {
  const [modalState, setModalState] = useState<boolean>(false);

  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const formRef = useRef<HTMLFormElement>(null);

  const pathname = usePathname();
  const { isLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = () => {
    if (formRef.current) formRef.current.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  // const actions = (
  //   <PrimaryButton type="button" onClick={handleSubmit} isLoading={isCreateCommentLoading} disabled={isCreateCommentLoading}>
  //     ارسال دیدگاه
  //   </PrimaryButton>
  // );

  const handleAddComment = () => {
    if (isLogin) setModalState(true);
    else router.push(`/login/?backUrl=${pathname}`);
  };

  const handleSuccess = () => {
    setOpen(false);
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <MapPinPlus /> ثبت آدرس جدید
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>افزون آدرس جدید</DialogTitle>
          </DialogHeader>
          <CommentForm productId={productId} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>
          <MapPinPlus /> ثبت آدرس جدید
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>افزون آدرس جدید</DrawerTitle>
        </DrawerHeader>

        <CommentForm productId={productId} onSuccess={handleSuccess} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateComment;
