import MobileBottomNav from '@/components/common/MobileLayout/MobileBottomNav';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Home } from 'lucide-react';
import NotFoundTracker from '@/features/seo/components/NotFoundTracker';

export default async function NotFound() {
  return (
    <>
      <NotFoundTracker />

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex flex-1 items-center justify-center px-4 my-6">
          <Card className="w-full max-w-2xl py-10">
            <CardContent className="flex flex-col items-center gap-6 text-center">
              <h1 className="text-7xl font-extrabold tracking-tight text-text/90 md:text-9xl">404</h1>

              <h2 className="text-base text-muted-foreground md:text-lg">صفحه‌ای که دنبال آن بودید پیدا نشد!</h2>

              <div className="flex flex-col gap-3">
                <Button asChild variant="outline" className="gap-2 px-6">
                  <Link href="/">
                    <Home className="h-4 w-4" />
                    بازگشت به صفحه اصلی
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>

        <div className="mt-auto">
          <Footer />
        </div>

        <div className="md:hidden">
          <MobileBottomNav />
        </div>
      </div>
    </>
  );
}
