import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="container pb-14 mt-2">{children}</main>

      <div className="mt-auto">
        <Footer />
      </div>
    </>
  );
}
