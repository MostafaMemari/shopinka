'use client';

import { FC } from 'react';
import { toast } from 'sonner';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ShareButton: FC = () => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success('لینک مقاله با موفقیت کپی شد');
    } catch {
      toast.error('مشکلی در کپی لینک پیش آمد');
    }
  };

  return (
    <Button
      type="button"
      variant="ghost"
      onClick={handleCopyLink}
      className="btn-primary-nobg flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg"
    >
      <Share2 className="h-5 w-5" />
      اشتراک گذاری
    </Button>
  );
};

export default ShareButton;
