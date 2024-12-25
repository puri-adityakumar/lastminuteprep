'use client';

import { useQuizStore } from '@/lib/store';
import { QuizTimer } from './QuizTimer';

export function QuizProgress() {
  const { currentQuiz, currentQuestionIndex } = useQuizStore();
  if (!currentQuiz) return null;

  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;

  return (
    <div className="flex justify-between items-center">
      <div className="space-y-2 flex-1">
        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
        </p>
      </div>
      <QuizTimer />
    </div>
  );
}