import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import MobileLayout from '@/components/common/MobileLayout/MobileLayout';
import { AuthGuard } from '@/auth/guard/auth-guard';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <Header />
      <MobileLayout showHeader={true} showNav={false} />

      <main className="pb-14 pt-22 lg:pt-36">
        <div className="container">
          <div className="relative">
            <div className="grid grid-cols-12 gap-2">{children}</div>
          </div>
        </div>
      </main>

      <Footer />
    </AuthGuard>
  );
}
