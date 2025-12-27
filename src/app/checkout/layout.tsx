import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { AuthGuard } from '@/auth/guard/auth-guard';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <AuthGuard>
      <Header />

      <main className="pb-14 mt-2">
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
