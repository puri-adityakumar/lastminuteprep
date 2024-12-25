'use client';

import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useQuizStore } from '@/lib/store';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface QuizActionsProps {
  selectedAnswer: number | null;
  isAnswered: boolean;
  onAnswer: () => void;
  onNext: () => void;
}

export function QuizActions({ selectedAnswer, isAnswered, onAnswer, onNext }: QuizActionsProps) {
  const router = useRouter();
  const { currentQuiz, currentQuestionIndex, cancelQuiz } = useQuizStore();
  if (!currentQuiz) return null;

  const handleCancel = () => {
    cancelQuiz();
    router.push('/');
  };

  return (
    <div className="flex justify-between items-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-destructive hover:text-destructive/90 hover:bg-destructive/10"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel Quiz
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel the quiz? Your progress will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Quiz</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleCancel}
              className="bg-destructive hover:bg-destructive/90"
            >
              Yes, Cancel Quiz
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <div className="flex gap-2">
        {!isAnswered ? (
          <Button onClick={onAnswer} disabled={selectedAnswer === null}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={onNext}>
            {currentQuestionIndex === currentQuiz.questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </Button>
        )}
      </div>
    </div>
  );
}