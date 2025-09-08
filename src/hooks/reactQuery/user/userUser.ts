import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '@/types/query-keys';
import { updateFullName } from '@/service/userService';

export function useChangeFullName() {
  const queryClient = useQueryClient();

  const createMutation = useMutation({ mutationFn: updateFullName });

  return {
    changeFullName: (data: { fullName: string }, onSuccess?: () => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QueryKeys.User] });
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isChangeFullNameLoading: createMutation.isPending,
  };
}
