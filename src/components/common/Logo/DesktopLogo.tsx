import Image from '@/components/common/UnoptimizedImage';
import Link from 'next/link';

export default function DesktopLogo() {
  return (
    <Link href="/">
      <Image src="/images/logo-shopinka.webp" alt="" width={176} height={63} className="w-36 text-red-700" />
    </Link>
  );
}
