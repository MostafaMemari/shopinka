import { Ellipsis } from 'lucide-react';

export default function Loading() {
  return (
    <div className="fixed inset-0 z-55 flex items-center justify-center bg-background backdrop-blur-sm">
      <Ellipsis className="h-12 w-12 text-primary animate-pulse" />
    </div>
  );
}
