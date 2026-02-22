import { cn } from '@/lib/utils';
import { ButtonHTMLAttributes } from 'react';
import { Button } from '../ui/button';
import { Ellipsis } from 'lucide-react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  variant?: 'link' | 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
}

export default function PrimaryButton({
  children,
  isLoading = false,
  className,
  disabled,
  variant = 'default',
  ...props
}: PrimaryButtonProps) {
  return (
    <Button className={cn('flex justify-center items-center', className)} disabled={disabled || isLoading} variant={variant} {...props}>
      {isLoading ? (
        <Ellipsis className="!w-9 !h-9 animate-side-to-side" />
      ) : (
        <span className="transition-opacity duration-200">{children}</span>
      )}
    </Button>
  );
}
