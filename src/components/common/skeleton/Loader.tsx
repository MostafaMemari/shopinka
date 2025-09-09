import { Ellipsis } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Loader({ className }: { className?: string }) {
  return <Ellipsis className={cn('h-12 w-12 text-primary animate-pulse', className)} />;
}
