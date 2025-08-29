import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui';
import { Drawer, DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui';
import { MessageCirclePlus } from 'lucide-react';
import CommentForm from './CommentForm';
import { useBoolean } from '@/hooks/use-boolean';

function CreateComment({ productId }: { productId: number }) {
  const commentControl = useBoolean(false);

  const isDesktop = useMediaQuery('(min-width: 768px)');

  const commentButtonLabel = 'ثبت دیدگاه جدید';
  const commentFormTitle = 'افزودن دیدگاه جدید';

  if (isDesktop) {
    return (
      <Dialog open={commentControl.value} onOpenChange={commentControl.onToggle}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">
            <MessageCirclePlus /> {commentButtonLabel}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{commentFormTitle}</DialogTitle>
          </DialogHeader>
          <CommentForm className="pt-2" productId={productId} onSuccess={commentControl.onFalse} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={commentControl.value} onOpenChange={commentControl.onToggle} modal repositionInputs={false}>
      <DrawerTrigger asChild>
        <Button>
          <MessageCirclePlus /> {commentButtonLabel}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="!h-auto">
        <DrawerHeader className="text-left">
          <DrawerTitle>{commentFormTitle}</DrawerTitle>
        </DrawerHeader>

        <CommentForm className="px-4" productId={productId} onSuccess={commentControl.onFalse} />

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
