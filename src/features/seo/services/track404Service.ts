export type Seo404Payload = {
  path: string;
  referrer?: string;
  userAgent?: string;
};

export const trackSeo404 = async (data: Seo404Payload) => {
  try {
    await fetch('/api/seo-404-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {}
};
