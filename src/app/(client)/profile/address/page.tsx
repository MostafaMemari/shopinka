import AddressesActions from '@/components/features/profile/Address/AddressesActions';
import { CreateAddressDialogDrawer } from '@/components/features/address/CreateAddressDialogDrawer';
import DashboardHeader from '@/components/features/profile/DashboardHeader';

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
