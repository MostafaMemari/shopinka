import { AuthGuard } from '@/auth/guard/auth-guard';
import MobileLayout from '@/components/common/MobileLayout/MobileLayout';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { Card } from '@/components/ui/card';
import ProfileMenuDrawer from '@/features/profile/MobileMenu/ProfileMenuCard';
import ProfileHeader from '@/features/profile/ProfileHeader';
import ProfileMenu from '@/features/profile/ProfileMenu';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AuthGuard>
        <Header />
        <MobileLayout />
        <div className="container pb-14 pt-22 lg:pt-36">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 lg:col-span-3">
              <Card className="hidden w-full overflow-hidden p-0 lg:block">
                <div className="p-4">
                  <ProfileHeader />
                </div>
                <ProfileMenu />
              </Card>
            </div>
            <div className="col-span-12 lg:col-span-9">
              <ProfileMenuDrawer />
              <div className="col-span-12 lg:col-span-9">
                <Card className="p-5">{children}</Card>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </AuthGuard>
    </>
  );
}
