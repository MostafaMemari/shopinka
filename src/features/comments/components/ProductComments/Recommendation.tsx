import { cn } from '@/lib/utils';
import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface RecommendationProps {
  isRecommended: boolean;
}

const Recommendation = ({ isRecommended }: RecommendationProps) => {
  return (
    <div
      className={cn('flex items-center gap-x-2 text-sm', {
        'text-emerald-600': isRecommended,
        'text-red-500 dark:text-red-400': !isRecommended,
      })}
    >
      {isRecommended ? <ThumbsUp className="h-5 w-5" /> : <ThumbsDown className="h-5 w-5" />}
      {isRecommended ? 'پیشنهاد میکنم' : 'پیشنهاد نمیکنم'}
    </div>
  );
};

export default Recommendation;
