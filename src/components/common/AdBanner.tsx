import Link from 'next/link';

export function AdBanner({ href, image, alt }: { href: string; image: string; alt: string }) {
  return (
    <Link href={href} className="block overflow-hidden rounded-2xl shadow-md">
      <div className="relative w-full aspect-[16/6] md:aspect-[16/5]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover shadow-md"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 50vw"
          unoptimized
        />
      </div>
    </Link>
  );
}
