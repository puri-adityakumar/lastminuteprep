import { z } from 'zod';

export const QuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.number(),
  explanation: z.string().optional(),
});

export const QuizFileSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  questions: z.array(QuestionSchema),
});

export type Question = z.infer<typeof QuestionSchema>;
export type QuizFile = z.infer<typeof QuizFileSchema>;

export interface QuizState {
  currentQuiz: QuizFile | null;
  currentQuestionIndex: number;
  answers: number[];
  score: number;
  isComplete: boolean;
  startTime: number | null;
  endTime: number | null;
  questionTimes: number[];
}

export interface QuizStats {
  totalQuizzes: number;
  totalQuestions: number;
  correctAnswers: number;
  averageScore: number;
}