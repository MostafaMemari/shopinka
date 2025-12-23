import AddressSection from '@/features/address/components/AddressSection';
import DeliverySection from '@/features/checkout/components/delivery/DeliverySection';
import { ShippingItem } from '@/features/shippings/ShippingType';
import { Card } from '@/components/ui/card';

interface Props {
  onAddressSelect: (id: number | null) => void;
  onShippingSelect: (item: ShippingItem | null) => void;
}

function CheckoutMainSection({ onAddressSelect, onShippingSelect }: Props) {
  const handleAddressShippingSelect = (id: number | null) => {
    if (id !== null) {
      onShippingSelect(null);
    } else {
      onShippingSelect(null);
    }
  };

  return (
    <div className="col-span-12 lg:col-span-9">
      <Card className="p-4">
        <AddressSection onAddressSelect={onAddressSelect} onShippingSelect={handleAddressShippingSelect} />
        <DeliverySection onShippingSelect={onShippingSelect} />
      </Card>
    </div>
  );
}

export default CheckoutMainSection;
