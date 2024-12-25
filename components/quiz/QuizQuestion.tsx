'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuizStore } from '@/lib/store';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { QuizProgress } from './QuizProgress';
import { QuizExplanation } from './QuizExplanation';
import { QuizActions } from './QuizActions';

export function QuizQuestion() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const { currentQuiz, currentQuestionIndex, submitAnswer, nextQuestion } = useQuizStore();

  if (!currentQuiz) return null;

  const question = currentQuiz.questions[currentQuestionIndex];

  const handleAnswer = () => {
    if (selectedAnswer === null) return;
    submitAnswer(selectedAnswer);
    setIsAnswered(true);
  };

  const handleNext = () => {
    nextQuestion();
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen bg-[#F1F0E8] dark:bg-black py-16">
      <Card className="max-w-2xl mx-auto p-6 space-y-6">
        <QuizProgress />

        <div className="space-y-4">
          <h3 className="text-lg font-mono leading-tight">{question.question}</h3>

          <div className="space-y-3">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-mono',
                  selectedAnswer === index && 'ring-2 ring-primary',
                  isAnswered && index === question.correctAnswer && 'bg-green-100 dark:bg-green-900',
                  isAnswered && selectedAnswer === index && index !== question.correctAnswer && 'bg-red-100 dark:bg-red-900'
                )}
                onClick={() => !isAnswered && setSelectedAnswer(index)}
                disabled={isAnswered}
              >
                {option}
              </Button>
            ))}
          </div>

          <QuizExplanation 
            questionIndex={currentQuestionIndex}
            isAnswered={isAnswered}
          />
        </div>

        <QuizActions
          selectedAnswer={selectedAnswer}
          isAnswered={isAnswered}
          onAnswer={handleAnswer}
          onNext={handleNext}
        />
      </Card>
    </div>
  );
}