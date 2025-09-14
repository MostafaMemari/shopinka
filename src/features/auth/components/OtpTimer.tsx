import { Button } from '@/components/ui/button';

type TimeLeft = { minutes: number; seconds: number };

interface OtpTimerProps {
  timeLeft: TimeLeft;
}

export function OtpTimer({ timeLeft }: OtpTimerProps) {
  const mm = String(timeLeft.minutes ?? 0).padStart(2, '0');
  const ss = String(timeLeft.seconds ?? 0).padStart(2, '0');

  return (
    <Button variant="ghost" disabled className="text-sm text-gray-600 dark:text-gray-300 pointer-events-none">
      {mm}:{ss}
    </Button>
  );
}
