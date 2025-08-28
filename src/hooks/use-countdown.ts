import { useRef, useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useCountdownDate(date: string) {
  const [countdown, setCountdown] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    setNewTime();
    const interval = setInterval(setNewTime, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setNewTime = () => {
    const startTime = new Date(date);

    const endTime = new Date();

    const distanceToNow = startTime.valueOf() - endTime.valueOf();

    const getDays = Math.floor(distanceToNow / (1000 * 60 * 60 * 24));

    const getHours = `0${Math.floor((distanceToNow % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}`.slice(-2);

    const getMinutes = `0${Math.floor((distanceToNow % (1000 * 60 * 60)) / (1000 * 60))}`.slice(-2);

    const getSeconds = `0${Math.floor((distanceToNow % (1000 * 60)) / 1000)}`.slice(-2);

    setCountdown({
      days: getDays < 10 ? `0${getDays}` : `${getDays}`,
      hours: getHours,
      minutes: getMinutes,
      seconds: getSeconds,
    });
  };

  return countdown;
}

// Usage
// const countdown = useCountdown(new Date('07/07/2022 21:30'));

// ----------------------------------------------------------------------

export function useCountdownSeconds(initCountdown: number) {
  const [countdown, setCountdown] = useState(initCountdown);
  const [counting, setCounting] = useState(false);

  const intervalIdRef = useRef<NodeJS.Timeout | null>(null);
  const remainingSecondsRef = useRef(initCountdown);

  const startCountdown = useCallback(() => {
    if (intervalIdRef.current) return;

    setCounting(true);
    remainingSecondsRef.current = initCountdown;
    setCountdown(initCountdown);

    intervalIdRef.current = setInterval(() => {
      remainingSecondsRef.current -= 1;
      setCountdown(remainingSecondsRef.current);

      if (remainingSecondsRef.current <= 0) {
        clearInterval(intervalIdRef.current!);
        intervalIdRef.current = null;
        setCounting(false);
      }
    }, 1000);
  }, [initCountdown]);

  return {
    counting,
    countdown,
    startCountdown,
  };
}

// Usage
// const { countdown, startCountdown, counting } = useCountdownSeconds(30);
