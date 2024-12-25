'use client';

import { useQuizStore } from '@/lib/store';
import { AlertCircle } from 'lucide-react';

interface QuizExplanationProps {
  questionIndex: number;
  isAnswered: boolean;
}

export function QuizExplanation({ questionIndex, isAnswered }: QuizExplanationProps) {
  const { currentQuiz } = useQuizStore();
  if (!currentQuiz || !isAnswered) return null;

  const explanation = currentQuiz.questions[questionIndex].explanation;
  if (!explanation) return null;

  return (
    <div className="mt-4 p-4 bg-secondary/50 rounded-lg">
      <div className="flex items-start gap-2">
        <AlertCircle className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-semibold">Explanation</p>
          <p className="text-sm text-muted-foreground">{explanation}</p>
        </div>
      </div>
    </div>
  );
}