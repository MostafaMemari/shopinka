'use server';

import { shopApiFetch } from '@/service/api';
import { CommentFormType, CommentItem, CommentParams, CommentResponse } from '@/types/commentType';

export const getComments = async (params?: CommentParams): Promise<CommentResponse> => {
  return await shopApiFetch(`/comment`, {
    query: { repliesDepth: 1, includeReplies: true, ...params },
  });
};

export const createComment = async (data: CommentFormType): Promise<{ message: string; comment: CommentItem }> => {
  return await shopApiFetch('/comment', { method: 'POST', body: { ...data } });
};
