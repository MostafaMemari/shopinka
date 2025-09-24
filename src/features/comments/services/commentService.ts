'use server';

import { ApiResponse, shopApiFetch } from '@/service/api';
import { CommentFormType, CommentItem, CommentParams, CommentResponse } from '@/types/commentType';

export const getComments = async (params?: CommentParams): Promise<ApiResponse<CommentResponse>> => {
  return await shopApiFetch(`/comment`, {
    auth: true,
    query: { repliesDepth: 1, includeReplies: true, ...params },
  });
};

export const createComment = async (data: CommentFormType): Promise<ApiResponse<{ message: string; comment: CommentItem }>> => {
  return await shopApiFetch('/comment', { method: 'POST', auth: true, body: { ...data } });
};
