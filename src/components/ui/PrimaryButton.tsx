import { cn } from '@/utils/utils';
import { Loader2Icon } from 'lucide-react';
import { ButtonHTMLAttributes } from 'react';
import { BeatLoader } from 'react-spinners';
import { Button } from './button';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PrimaryButton({ children, isLoading = false, disabled, onClick, className, ...props }: PrimaryButtonProps) {
  return (
    <Button className="cursor-pointer w-full min-h-[48px]" onClick={onClick} disabled={disabled || isLoading} {...props}>
      {isLoading ? <Loader2Icon className="animate-spin" /> : children}
    </Button>
  );
}
