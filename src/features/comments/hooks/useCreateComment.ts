import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { CommentFormType } from '@/types/commentType';
import { createComment } from '@/features/comments/services/commentService';
import { toast } from 'sonner';

export function useCreateComment() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({ mutationFn: createComment });

  return {
    createComment: (data: CommentFormType, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.Comments] });
          toast.success('نظر شما با موفقیت ثبت شد');
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isCreateCommentLoading: createMutation.isPending,
  };
}
