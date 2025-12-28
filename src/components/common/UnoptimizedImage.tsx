import Image, { ImageProps } from 'next/image';

export default function UnoptimizedImage(props: ImageProps) {
  return <Image {...props} unoptimized />;
}
