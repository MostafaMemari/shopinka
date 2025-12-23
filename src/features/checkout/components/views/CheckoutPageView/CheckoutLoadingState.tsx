import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Card } from '@/components/ui/card';

function CheckoutLoadingState() {
  return (
    <div className="col-span-12">
      <Card className="min-h-[300px] flex items-center justify-center">
        <LoadingSpinner />
      </Card>
    </div>
  );
}

export default CheckoutLoadingState;
