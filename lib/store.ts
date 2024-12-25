'use client';

import { create } from 'zustand';
import { QuizFile, QuizState } from './types';

interface QuizStore extends QuizState {
  setQuiz: (quiz: QuizFile) => void;
  submitAnswer: (answer: number) => void;
  nextQuestion: () => void;
  resetQuiz: () => void;
  cancelQuiz: () => void;
}

export const useQuizStore = create<QuizStore>((set, get) => ({
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: [],
  score: 0,
  isComplete: false,
  startTime: null,
  endTime: null,
  questionTimes: [],

  setQuiz: (quiz) => {
    set({
      currentQuiz: quiz,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      isComplete: false,
      startTime: Date.now(),
      endTime: null,
      questionTimes: [],
    });
  },

  submitAnswer: (answer) => {
    const { currentQuiz, currentQuestionIndex, answers, score, startTime, questionTimes } = get();
    if (!currentQuiz || !startTime) return;

    const isCorrect = currentQuiz.questions[currentQuestionIndex].correctAnswer === answer;
    const currentTime = Date.now();
    const questionTime = currentTime - (questionTimes.length > 0 ? startTime + questionTimes.reduce((a, b) => a + b, 0) : startTime);

    set({
      answers: [...answers, answer],
      score: isCorrect ? score + 1 : score,
      questionTimes: [...questionTimes, questionTime],
    });
  },

  nextQuestion: () => {
    const { currentQuiz, currentQuestionIndex } = get();
    if (!currentQuiz) return;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      set({ currentQuestionIndex: currentQuestionIndex + 1 });
    } else {
      set({ 
        isComplete: true,
        endTime: Date.now(),
      });
    }
  },

  resetQuiz: () => {
    set({
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      isComplete: false,
      startTime: null,
      endTime: null,
      questionTimes: [],
    });
  },

  cancelQuiz: () => {
    set({
      currentQuiz: null,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      isComplete: false,
      startTime: null,
      endTime: null,
      questionTimes: [],
    });
  },
}));