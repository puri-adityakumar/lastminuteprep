'use client';

import { useState } from 'react';
import { Upload, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QuizFileSchema } from '@/lib/types';
import { useQuizStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';

export function QuizSetup() {
  const [loading, setLoading] = useState(false);
  const [numQuestions, setNumQuestions] = useState(10);
  const [file, setFile] = useState<File | null>(null);
  const setQuiz = useQuizStore((state) => state.setQuiz);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setFile(file);
  };

  const handleStartQuiz = async () => {
    if (!file) {
      toast({
        title: 'Error',
        description: 'Please upload a question file first',
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const quiz = QuizFileSchema.parse(json);
      
      // Randomize and limit questions
      const randomizedQuestions = [...quiz.questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, numQuestions);

      setQuiz({ ...quiz, questions: randomizedQuestions });

      toast({
        title: 'Success',
        description: 'Quiz loaded successfully!',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid quiz file format',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F0E8] dark:bg-black py-16">
      <Card className="max-w-md mx-auto p-6 space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-mono font-bold">Quiz Setup</h1>
          <p className="text-muted-foreground">Configure your quiz settings</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file">Question File</Label>
            <div className="flex items-center gap-2">
              <Input
                id="file"
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => document.getElementById('file')?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {file ? file.name : 'Upload JSON File'}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="questions">Number of Questions</Label>
            <Input
              id="questions"
              type="number"
              min="1"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
            />
          </div>

          <Button 
            className="w-full font-mono"
            onClick={handleStartQuiz}
            disabled={loading || !file}
          >
            <Play className="mr-2 h-4 w-4" />
            Start Quiz
          </Button>
        </div>
      </Card>
    </div>
  );
}