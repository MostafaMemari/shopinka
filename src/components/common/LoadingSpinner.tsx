import { Loader2 } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const spinnerVariants = cva('animate-spin text-primary', {
  variants: {
    size: {
      default: 'h-10 w-10',
      sm: 'h-6 w-6',
      lg: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface LoadingSpinnerProps extends VariantProps<typeof spinnerVariants> {
  loadingMessage?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ loadingMessage = 'در حال بارگذاری...', className, size }) => {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-4', className)}>
      <Loader2 className={spinnerVariants({ size })} />
      {loadingMessage && <p className="text-sm text-gray-500 dark:text-gray-400">{loadingMessage}</p>}
    </div>
  );
};

export default LoadingSpinner;
