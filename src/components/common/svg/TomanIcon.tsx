import Image from '@/components/common/UnoptimizedImage';

interface Props {
  className?: string;
  width?: number;
  height?: number;
}

const TomanIcon = ({ className = 'w-4 h-4', width = 16, height = 16 }: Props) => {
  return (
    <Image src="/svg/toman.svg" alt="تومان" width={width} height={height} className={`${className} select-none pointer-events-none`} />
  );
};

export default TomanIcon;
