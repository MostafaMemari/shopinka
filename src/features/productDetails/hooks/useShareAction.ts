'use client';
import { useMediaQuery } from '@/hooks/use-media-query';
import { toast } from 'sonner';

export const useShareAction = ({ productName }: { productName: string }) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (!isDesktop && navigator.share) {
        await navigator.share({
          title: document.title,
          text: `${productName} \n`,
          url,
        });
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
        toast.success('لینک محصول با موفقیت کپی شد');
      } else {
        const input = document.createElement('input');
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
        toast.success('لینک محصول با موفقیت کپی شد');
      }
    } catch {
      toast.error('خطا در اشتراک‌گذاری');
    }
  };

  return { handleShare };
};
