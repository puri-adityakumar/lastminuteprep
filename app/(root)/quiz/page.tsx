'use client';

import { QuizSetup } from '@/components/quiz/QuizSetup';
import { QuizQuestion } from '@/components/quiz/QuizQuestion';
import { QuizResults } from '@/components/quiz/QuizResults';
import { useQuizStore } from '@/lib/store';

export default function QuizPage() {
  const { currentQuiz, isComplete } = useQuizStore();

  if (!currentQuiz) {
    return <QuizSetup />;
  }

  if (isComplete) {
    return <QuizResults />;
  }

  return <QuizQuestion />;
}