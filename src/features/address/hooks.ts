import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAddress, deleteAddress, getAddress, setDefaultAddress, updateAddress } from '@/features/address/api';
import { AddressFormValues, AddressItem } from '@/features/address/types';
import { QueryOptions } from '@/types/queryOptions';
import { QueryKeys } from '@/types/query-keys';
import { toast } from 'sonner';
import { pager } from '@/types/paginationType';

export function useAddress({ enabled = true, staleTime = 60_000 }: QueryOptions) {
  const queryClient = useQueryClient();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: [QueryKeys.Address] });

  const { data, isLoading, error, refetch } = useQuery<{ items: AddressItem[]; pager: pager }>({
    queryKey: [QueryKeys.Address],
    queryFn: getAddress,
    enabled,
    staleTime,
  });

  const createMutation = useMutation({
    mutationFn: createAddress,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AddressFormValues }) => updateAddress(id, data),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAddress,
  });

  const setDefault = useMutation({
    mutationFn: setDefaultAddress,
  });

  return {
    data,
    isLoading,
    error,
    refetch,

    createAddress: (data: AddressFormValues, onSuccess?: (created: AddressItem) => void, onError?: (error: any) => void) => {
      createMutation.mutate(data, {
        onSuccess: (response) => {
          invalidate();
          toast.success('ثبت آدرس با موفقیت انجام شد');
          onSuccess?.(response.address);
        },
        onError: (error) => {
          toast.error(error.message);
          onError?.(error);
        },
      });
    },

    updateAddress: (id: number, data: AddressFormValues, onSuccess?: () => void, onError?: (error: any) => void) => {
      updateMutation.mutate(
        { id, data },
        {
          onSuccess: () => {
            invalidate();
            toast.success('آدرس با موفقیت ویرایش شد');
            onSuccess?.();
          },
          onError: (error) => {
            toast.error(error.message);
            onError?.(error);
          },
        },
      );
    },

    deleteAddress: (id: number, onSuccess?: () => void, onError?: (error: any) => void) => {
      deleteMutation.mutate(id, {
        onSuccess: () => {
          invalidate();
          toast.success('آدرس با موفقیت حذف شد');
          onSuccess?.();
        },
        onError: (error) => {
          toast.error('خطا در حذف آدرس');
          onError?.(error);
        },
      });
    },

    setDefaultAddress: (id: number, onSuccess?: () => void, onError?: (error: any) => void) => {
      setDefault.mutate(id, {
        onSuccess: () => {
          invalidate();
          onSuccess?.();
        },
        onError: (error) => {
          onError?.(error);
        },
      });
    },

    isCreateAddressLoading: createMutation.isPending,
    isUpdateAddressLoading: updateMutation.isPending,
    isDeleteAddressLoading: deleteMutation.isPending,
    isSetDefaultAddressLoading: setDefault.isPending,
  };
}
