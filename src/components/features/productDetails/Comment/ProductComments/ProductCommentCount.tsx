'use client';

import { useComment } from '@/hooks/reactQuery/comment/useComment';
import React, { useState } from 'react';
import CommentsDrawer from './CommentsDrawer';
import useIsMdUp from '@/hooks/useIsMdUp';

interface ProductCommentCountProps {
  productId: number;
}

function ProductCommentCount({ productId }: ProductCommentCountProps) {
  const { data, isLoading } = useComment({
    params: { productId, page: 1 },
  });
  const isMdUp = useIsMdUp();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const drawerHandlers = {
    onOpen: () => setIsOpenDrawer(true),
    onClose: () => setIsOpenDrawer(false),
  };

  const CommentCount = data?.pager.totalCount || 0;

  return (
    <>
      {isLoading ? (
        <div className="animate-pulse rounded-lg bg-gray-200 h-6 w-24" />
      ) : isMdUp ? (
        <div>
          <span>{CommentCount} دیدگاه</span>
        </div>
      ) : (
        <div>
          <span onClick={drawerHandlers.onOpen}>{CommentCount} دیدگاه</span>

          <CommentsDrawer isOpen={isOpenDrawer} onOpen={drawerHandlers.onOpen} onClose={drawerHandlers.onClose} productId={productId} />
        </div>
      )}
    </>
  );
}

export default ProductCommentCount;
