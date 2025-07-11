import { getPageBySlug } from '@/service/pageService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const res = await getPageBySlug(slug);

  if (res?.status === 404 || !res) return notFound();

  const { description, name } = res;

  return (
    <div className="container rounded-2xl bg-muted/70 shadow-lg border border-border/60 p-8 transition-all duration-200">
      <div className="mb-8 flex items-center">
        <h1 className="relative select-none text-2xl font-bold tracking-tight text-primary drop-shadow-md md:text-3xl">
          {name}
          <span className="absolute -bottom-2 left-0 h-1 w-3/5 rounded-full bg-primary/80 transition-all duration-300 animate-pulse"></span>
        </h1>
      </div>
      <div
        className="prose prose-lg prose-custom max-w-none space-y-6 text-foreground/90"
        style={{ lineHeight: '1.8', letterSpacing: '.01em' }}
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
