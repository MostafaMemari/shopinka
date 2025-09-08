import AddressesActions from '@/features/profile/Address/AddressesActions';
import { CreateAddressDialogDrawer } from '@/features/address/components/CreateAddressDialogDrawer';
import DashboardHeader from '@/features/profile/DashboardHeader';

export default function Page() {
  return (
    <>
      <div className="mb-10 flex flex-col items-center justify-between gap-y-8 xs:flex-row">
        <DashboardHeader title="آدرس تحویل سفارش" />
        <CreateAddressDialogDrawer />
      </div>
      <AddressesActions />
    </>
  );
}
