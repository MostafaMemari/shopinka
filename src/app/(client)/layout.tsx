import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="container pb-14 mt-4">
        <div className="col-span-12 lg:col-span-9">{children}</div>
      </main>
      <Footer />
    </>
  );
}
