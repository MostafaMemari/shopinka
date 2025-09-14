import { ReactNode } from 'react';
import { Alert as AlertShadcn, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from 'lucide-react';

type AlertProps = {
  variant?: 'default' | 'destructive';
  icon?: 'success' | 'error' | 'info';
  title: string;
  description?: ReactNode;
};

const iconMap = {
  success: <CheckCircle2Icon className="h-5 w-5" />,
  error: <AlertCircleIcon className="h-5 w-5" />,
  info: <PopcornIcon className="h-5 w-5" />,
};

export function Alert({ variant = 'default', icon = 'info', title, description }: AlertProps) {
  return (
    <AlertShadcn variant={variant}>
      {iconMap[icon]}
      <div>
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
      </div>
    </AlertShadcn>
  );
}
