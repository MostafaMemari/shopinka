'use server';

import { shopApiFetch } from '@/service/api';
import { CommentFormType, CommentItem, CommentParams, CommentResponse } from '@/types/commentType';
import { unwrap } from '@/utils/api-helpers';

export const getComments = async (params?: CommentParams): Promise<CommentResponse> => {
  const res = await shopApiFetch(`/comment`, {
    query: { repliesDepth: 1, includeReplies: true, ...params },
  });

  return unwrap(res);
};

export const createComment = async (data: CommentFormType): Promise<{ message: string; comment: CommentItem }> => {
  const res = await shopApiFetch('/comment', { method: 'POST', body: { ...data } });

  return unwrap(res);
};
