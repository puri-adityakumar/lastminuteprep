'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/lib/store';
import { RefreshCw, Home, Clock } from 'lucide-react';
import Link from 'next/link';

export function QuizResults() {
  const { currentQuiz, score, resetQuiz, startTime, endTime, questionTimes } = useQuizStore();

  if (!currentQuiz || !startTime || !endTime) return null;

  const totalQuestions = currentQuiz.questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const totalTime = (endTime - startTime) / 1000; // in seconds
  const averageTime = totalTime / totalQuestions;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-[#F1F0E8] dark:bg-black py-16">
      <Card className="max-w-md mx-auto p-6 space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-mono font-bold">Quiz Complete!</h2>
          <p className="text-muted-foreground">Here's how you did:</p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <span className="text-5xl font-mono font-bold">{percentage}%</span>
            <p className="text-sm text-muted-foreground mt-2">
              {score} correct out of {totalQuestions} questions
            </p>
          </div>

          <div className="space-y-2 border rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4" />
              <span className="font-mono">Total Time: {formatTime(totalTime)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span className="font-mono">Average Time per Question: {formatTime(averageTime)}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Button onClick={resetQuiz} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
          <Link href="/generate-mcq" className="w-full">
            <Button variant="outline" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Practice
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}