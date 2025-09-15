import { unwrap } from '@/utils/api-helpers';
import { shopApiFetch } from '../../service/api';

export async function getPageBySlug(slug: string) {
  const res = await shopApiFetch(`/page/by-slug/${slug}`, { next: { revalidate: 60 } });

  return unwrap(res);
}
