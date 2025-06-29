import { NextRequest, NextResponse } from 'next/server';
import { generateQuizWithGemini } from '@/lib/gemini';

export async function POST(request: NextRequest) {
  try {
    const { topic, numQuestions, difficulty } = await request.json();

    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return NextResponse.json(
        { error: 'Topic is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: 'Gemini API key is not configured' },
        { status: 500 }
      );
    }

    const quiz = await generateQuizWithGemini(
      topic.trim(),
      numQuestions || 10,
      difficulty || 'medium'
    );

    return NextResponse.json(quiz);
  } catch (error) {
    console.error('Error in generate-quiz API:', error);
    return NextResponse.json(
      { error: 'Failed to generate quiz. Please try again.' },
      { status: 500 }
    );
  }
}