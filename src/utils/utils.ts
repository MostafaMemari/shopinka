import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function extractTimeFromText(text: string): string | null {
  const match = text.match(/(\d{2}:\d{2})/);
  return match ? match[1] : null;
}

export function secondsToTime(seconds: number): {
  hours: number;
  minutes: number;
  seconds: number;
} {
  if (seconds < 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(seconds / 3600);
  const remainingSeconds = seconds % 3600;
  const minutes = Math.floor(remainingSeconds / 60);
  const finalSeconds = remainingSeconds % 60;

  return {
    hours,
    minutes,
    seconds: finalSeconds,
  };
}
