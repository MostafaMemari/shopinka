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
    <Button className={cn('relative', className)} disabled={disabled || isLoading} {...props}>
      {isLoading && <Loader2Icon className="absolute left-2 h-4 w-4 animate-spin" />}
      <span className={cn(isLoading && 'opacity-0')}>{children}</span>
    </Button>
  );
}
