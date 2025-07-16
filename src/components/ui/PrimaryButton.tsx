import { cn } from '@/utils/utils';
import { ButtonHTMLAttributes } from 'react';
import { BeatLoader } from 'react-spinners';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function PrimaryButton({ children, isLoading = false, disabled, onClick, className, ...props }: PrimaryButtonProps) {
  return (
    <button
      className={cn('btn-primary w-full py-3 flex items-center justify-center cursor-pointer min-h-[48px]', className)}
      onClick={onClick}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? <BeatLoader color="#ffffff" size={10} /> : children}
    </button>
  );
}
