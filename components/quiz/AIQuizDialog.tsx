'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QuizFileSchema } from '@/lib/types';
import { useQuizStore } from '@/lib/store';

export function AIQuizDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const router = useRouter();
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const { toast } = useToast();

  const handleGenerateQuiz = async () => {
    if (!topic.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a topic for the quiz',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: topic.trim(),
          numQuestions,
          difficulty,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate quiz');
      }

      const quizData = await response.json();
      const quiz = QuizFileSchema.parse(quizData);

      setQuiz(quiz);
      setOpen(false);
      router.push('/quiz');

      toast({
        title: 'Success',
        description: `Generated ${quiz.questions.length} questions about ${topic}!`,
      });
    } catch (error) {
      console.error('Error generating quiz:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to generate quiz',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="font-mono text-lg px-8 hover:scale-105 transition-transform">
          <Sparkles className="mr-2 h-5 w-5" />
          Generate AI Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-mono flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Quiz Generator
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="topic">Quiz Topic</Label>
            <Input
              id="topic"
              placeholder="e.g., JavaScript, World History, Biology..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="questions">Number of Questions</Label>
            <Input
              id="questions"
              type="number"
              min="5"
              max="25"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty Level</Label>
            <Select value={difficulty} onValueChange={(value: 'easy' | 'medium' | 'hard') => setDifficulty(value)} disabled={loading}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button 
            className="w-full font-mono"
            onClick={handleGenerateQuiz}
            disabled={loading || !topic.trim()}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Quiz
              </>
            )}
          </Button>

          {!process.env.NEXT_PUBLIC_GEMINI_API_KEY && (
            <p className="text-xs text-muted-foreground text-center">
              Note: Gemini API key required for AI quiz generation
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}