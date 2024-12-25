'use client';

import { useEffect, useState } from 'react';
import { useQuizStore } from '@/lib/store';

export function QuizTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { startTime, isComplete } = useQuizStore();

  useEffect(() => {
    if (!startTime || isComplete) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, isComplete]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="text-sm font-mono text-muted-foreground">
      Time: {formatTime(elapsedTime)}
    </div>
  );
}