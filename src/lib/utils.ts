import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createLoader } from 'nuqs/server';
import { coordinatesSearchParams } from '../config/searchParamsConfig';

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

export function parseArrayParam(param: string | string[] | undefined): number[] | undefined {
  if (!param) return undefined;
  const str = Array.isArray(param) ? param[0] : param;
  return str
    .split(',')
    .map(Number)
    .filter((n) => !isNaN(n));
}

export const calculateDiscount = (oldPrice?: number | null, newPrice?: number | null): number => {
  if (!oldPrice || !newPrice || oldPrice <= newPrice) {
    return 0;
  }
  return Math.round(((oldPrice - newPrice) / oldPrice) * 100);
};

export function cleanObject<T extends Record<string, any>>(obj: T): Partial<T> {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== undefined && value !== null && value !== '')) as Partial<T>;
}

export const formatPrice = (price: number) => price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const getRemainingTime = (date: string) => Math.ceil((new Date(date).getTime() - new Date().getTime()) / 60000);

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fa-IR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatAmount = (amount: number) => {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' تومان';
};

export const loadSearchParams = createLoader(coordinatesSearchParams);

export function sanitizeInput(v: string) {
  v = v.replace(/^\n+/, '');

  v = v.replace(/\n{2,}/g, '\n');

  v = v.replace(/\n+$/, '\n');

  return v;
}
