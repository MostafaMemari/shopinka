import { getPageBySlug } from '@/features/page/pageService';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SectionHeader } from '@/components/common/SectionHeader';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const res = await getPageBySlug(slug);

  if (res?.status === 404 || !res) return notFound();

  const { description, name } = res;

  return (
    <Card>
      <CardHeader>
        <SectionHeader title={name} />
      </CardHeader>

      <CardContent>
        <div
          className="prose prose-lg prose-custom max-w-none space-y-6 text-foreground/90"
          style={{ lineHeight: '1.8', letterSpacing: '.01em' }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </CardContent>
    </Card>
  );
}
