import { useAppSelector } from '@/store/hooks';
import React from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useBoolean } from '@/hooks/use-boolean';
import { ChevronLeft } from 'lucide-react';
import CommentForm from './CommentForm';
import { useDispatch } from 'react-redux';
import { openDialog } from '@/store/slices/authDialogSlice';

interface ReplyCommentProps {
  productId: number;
  parentId: number;
  commentTitle: string;
}

function ReplyComment({ productId, parentId, commentTitle }: ReplyCommentProps) {
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const dispatch = useDispatch();
  const commentControl = useBoolean(false);

  const { isLogin } = useAppSelector((state) => state.auth);

  const handleReplyComment = () => {
    if (isLogin) commentControl.onTrue();
    else dispatch(openDialog());
  };

  const commentButtonLabel = 'پاسخ';
  const commentFormTitle = 'پاسخ به دیدگاه: ' + commentTitle;

  if (isDesktop) {
    return (
      <Dialog open={commentControl.value} onOpenChange={commentControl.onToggle}>
        <DialogTrigger asChild>
          <Button variant="ghost" onClick={handleReplyComment} className="cursor-pointer">
            {commentButtonLabel}
            <ChevronLeft />
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{commentFormTitle}</DialogTitle>
          </DialogHeader>
          <CommentForm className="pt-2" productId={productId} parentId={parentId} onSuccess={commentControl.onFalse} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={commentControl.value} onOpenChange={commentControl.onToggle}>
      <DrawerTrigger asChild>
        <Button variant="ghost" onClick={handleReplyComment} className="cursor-pointer">
          {commentButtonLabel}
          <ChevronLeft />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{commentFormTitle}</DrawerTitle>
        </DrawerHeader>

        <CommentForm className="px-4" productId={productId} parentId={parentId} onSuccess={commentControl.onFalse} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">انصراف</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default ReplyComment;
