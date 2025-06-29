import { Brain } from 'lucide-react';
import { QuizDialog } from '@/components/quiz/QuizDialog';
import { AIQuizDialog } from '@/components/quiz/AIQuizDialog';
import { SampleQuiz } from '@/components/quiz/SampleQuiz';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F1F0E8] dark:bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <div className="inline-block p-3 bg-primary/10 rounded-full mb-4">
              <Brain className="w-8 h-8 animate-pulse" />
            </div>
            <h1 className="text-5xl font-mono font-bold tracking-tight">
              MCQ Practice
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Enhance your learning through interactive multiple-choice questions.
              Upload your custom question sets, generate AI-powered quizzes, or try our sample quiz.
            </p>
            <div className="space-y-4 pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <QuizDialog />
                <AIQuizDialog />
              </div>
              <div className="text-sm">
                <SampleQuiz />
              </div>
              <div className="text-sm">
                <Link href="/tutorial" className="text-primary hover:underline">
                  New Here 😌? Check Tutorial
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}