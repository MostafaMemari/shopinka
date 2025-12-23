import { Card } from '@/components/ui/card';
import ErrorState from '@/features/profile/ErrorState';

export default function CartErrorState({ message }: { message: string }) {
  return (
    <div className="col-span-12">
      <Card className="p-4 min-h-[300px] flex items-center justify-center">
        <ErrorState message={message} />
      </Card>
    </div>
  );
}
