import { cn } from '@/utils/utils';
import { Loader2Icon } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';
import { Button } from '../ui/button';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function PrimaryButton({ children, isLoading = false, className, disabled, ...props }: PrimaryButtonProps) {
  return (
    <Button className={cn('relative flex justify-center items-center p-0', className)} disabled={disabled || isLoading} {...props}>
      {isLoading && <Loader2Icon className="absolute inset-0 m-auto h-5 w-5 animate-spin text-white" />}
      <span className={cn(isLoading && 'opacity-0 transition-opacity duration-200')}>{children}</span>
    </Button>
  );
}
