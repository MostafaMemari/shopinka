import AddressesActions from '@/shared/components/profile/Address/AddressesActions';
import { mockAddresses } from '@/mock/addresses';

export default function Page() {
  return (
    <div className="col-span-12 lg:col-span-9">
      <AddressesActions addresses={mockAddresses} />
    </div>
  );
}
