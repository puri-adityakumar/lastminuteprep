import { NextRequest, NextResponse } from 'next/server';
import { generateQuizWithGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { topic, numQuestions, difficulty } = await request.json();

    console.log('API called with:', { topic, numQuestions, difficulty });

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'Gemini API key is not configured. Please add GEMINI_API_KEY to your environment variables.' },
        { status: 500 }
      );
    }

    const validNumQuestions = Math.min(Math.max(parseInt(numQuestions) || 10, 5), 25);
    const validDifficulty = ['easy', 'medium', 'hard'].includes(difficulty) ? difficulty : 'medium';

    console.log('Generating quiz with validated params:', { 
      topic: topic.trim(), 
      numQuestions: validNumQuestions, 
      difficulty: validDifficulty 
    });

    const quiz = await generateQuizWithGemini(
      topic.trim(),
      validNumQuestions,
      validDifficulty
    );

    console.log('Successfully generated quiz:', quiz.title);
    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error in generate-quiz API:', error);
    
    let errorMessage = 'Failed to generate quiz. Please try again.';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}