import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Card } from '@/components/ui/card';

export default function CartLoadingState() {
  return (
    <div className="col-span-12">
      <Card className="p-4 min-h-[300px] flex items-center justify-center">
        <LoadingSpinner />
      </Card>
    </div>
  );
}
