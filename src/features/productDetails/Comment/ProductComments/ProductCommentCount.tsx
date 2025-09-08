'use client';

import { useComment } from '@/features/comments/hooks/useComment';
import React, { useState } from 'react';
import CommentsDrawer from './CommentsDrawer';
import useIsMdUp from '@/hooks/useIsMdUp';
import { useBoolean } from '@/hooks/use-boolean';

interface ProductCommentCountProps {
  productId: number;
}

function ProductCommentCount({ productId }: ProductCommentCountProps) {
  const { data, isLoading } = useComment({
    params: { productId, page: 1 },
  });
  const isMdUp = useIsMdUp();
  const drawerHandlers = useBoolean();

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
          <span onClick={drawerHandlers.onTrue}>{CommentCount} دیدگاه</span>

          <CommentsDrawer drawerHandlers={drawerHandlers} productId={productId} />
        </div>
      )}
    </>
  );
}

export default ProductCommentCount;
