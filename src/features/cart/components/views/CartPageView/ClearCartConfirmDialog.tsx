import ConfirmDialog from '@/components/common/ConfirmDialog';

interface Props {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ClearCartConfirmDialog({ open, loading, onClose, onConfirm }: Props) {
  return (
    <ConfirmDialog
      open={open}
      isConfirmLoading={loading}
      onOpenChange={onClose}
      title="حذف محصولات"
      description="آیا مطمئن هستید؟"
      onConfirm={onConfirm}
    />
  );
}
