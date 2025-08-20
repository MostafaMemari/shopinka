import { cn } from '@/utils/utils';
import { Loader2Icon } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';
import { Button } from '../ui/button';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PrimaryButton({ children, isLoading = false, disabled, onClick, className, ...props }: PrimaryButtonProps) {
  return (
    <Button className={cn('cursor-pointer w-full min-h-[42px]', className)} onClick={onClick} disabled={disabled || isLoading} {...props}>
      {isLoading ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
}
