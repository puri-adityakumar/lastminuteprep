'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import { useQuizStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { QuizFileSchema } from '@/lib/types';

export function SampleQuiz() {
  const [open, setOpen] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const router = useRouter();
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const { toast } = useToast();

  const handleStartSampleQuiz = async () => {
    try {
      const response = await fetch('/sample-quiz.json');
      const json = await response.json();
      const quiz = QuizFileSchema.parse(json);
      
      const randomizedQuestions = [...quiz.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, numQuestions);

      setQuiz({ ...quiz, questions: randomizedQuestions });
      setOpen(false);
      router.push('/quiz');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load sample quiz',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="link" 
          className="text-muted-foreground hover:text-primary"
        >
          Try sample quiz →
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono">Sample Quiz Setup</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="questions">Number of Questions</Label>
            <Input
              id="questions"
              type="number"
              min="1"
              max="25"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
            />
          </div>

          <Button 
            className="w-full font-mono"
            onClick={handleStartSampleQuiz}
          >
            Start Sample Quiz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}