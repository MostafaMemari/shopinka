'use client';

import { useComment } from '@/features/comments/hooks/useComment';
import React, { useEffect, useState } from 'react';
import CommentsDrawer from './CommentsDrawer';
import useIsMdUp from '@/hooks/useIsMdUp';
import { useBoolean } from '@/hooks/use-boolean';
import { useMediaQuery } from '@/hooks/use-media-query';
import { COMPONENT_BREAKPOINTS } from '@/constants';

interface ProductCommentCountProps {
  productId: number;
}

function ProductCommentCount({ productId }: ProductCommentCountProps) {
  const { data, isLoading } = useComment({
    params: { productId, page: 1 },
  });
  const isDesktop = useMediaQuery(`(min-width: ${COMPONENT_BREAKPOINTS.DIALOG_DRAWER})`);
  const drawerHandlers = useBoolean();

  useEffect(() => {
    if (isDesktop) drawerHandlers.onFalse();
  }, [isDesktop]);

  const CommentCount = data?.pager.totalCount || 0;

  return (
    <>
      {isLoading ? (
        <div className="animate-pulse rounded-lg bg-gray-200 h-6 w-24" />
      ) : isDesktop ? (
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
