import { toast } from 'sonner';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const showAddToCartToast = (router: ReturnType<typeof useRouter>) => {
  toast('کالا به سبد خرید اضافه شد', {
    action: {
      label: (
        <span className="flex items-center gap-1 text-xs text-gray-700">
          مشاهده سبد خرید
          <ChevronLeft className="w-4 h-4" />
        </span>
      ),
      onClick: () => router.push('/checkout/cart'),
    },
    position: 'bottom-center',
    className: 'mb-16 md:mb-0',
    classNames: {
      title: 'text-green-700 text-xs',
      actionButton: '!bg-transparent !p-0 !text-gray-700 !text-xs',
    },
    duration: 4000,
    style: { backgroundColor: '#D1FAE5', padding: '8px 16px' },
  });
};
