import { Button } from '@/components/ui/button';

interface LineNavigationButtonsProps {
  isFirstLine: boolean;
  isLastLine: boolean;
  onNextLine: () => void;
  onPrevLine: () => void;
  onFinalize: () => void;
}

export default function LineNavigationButtons({ isFirstLine, isLastLine, onNextLine, onPrevLine, onFinalize }: LineNavigationButtonsProps) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex w-1/2">
        {!isLastLine ? (
          <Button className="flex-1" onClick={onNextLine}>
            خط بعدی
          </Button>
        ) : (
          <Button className="flex-1" onClick={onFinalize}>
            نهایی‌سازی
          </Button>
        )}
      </div>

      {!isFirstLine && (
        <div className="flex w-1/2">
          <Button variant="outline" className="flex-1" onClick={onPrevLine}>
            خط قبلی
          </Button>
        </div>
      )}
    </div>
  );
}
