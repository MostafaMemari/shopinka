'use client';

import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Share2 } from 'lucide-react';

function ProductShareIcon({ className }: { className?: string }) {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (!isDesktop && navigator.share) {
        await navigator.share({
          title: document.title,
          text: 'این محصول رو ببین 👇',
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

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Share2
            size={22}
            onClick={handleShare}
            className={cn('text-gray-700 hover:text-blue-500 dark:text-white transition-colors duration-200', className)}
          />
        </TooltipTrigger>
        {isDesktop && <TooltipContent>اشتراک‌گذاری</TooltipContent>}
      </Tooltip>
    </TooltipProvider>
  );
}

export default ProductShareIcon;
