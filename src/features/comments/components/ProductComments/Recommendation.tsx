import { ThumbsDown, ThumbsUp } from 'lucide-react';

interface RecommendationProps {
  isRecommended: boolean;
}

const Recommendation = ({ isRecommended }: RecommendationProps) => {
  return (
    <div className={`flex items-center gap-x-2 ${isRecommended ? 'text-emerald-600' : 'text-red-500 dark:text-red-400'}`}>
      {isRecommended ? <ThumbsUp className="h-5 w-5" /> : <ThumbsDown className="h-5 w-5" />}
      {isRecommended ? 'پیشنهاد میکنم' : 'پیشنهاد نمیکنم'}
    </div>
  );
};

export default Recommendation;
