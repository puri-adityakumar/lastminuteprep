import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizFile } from './types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateQuizWithGemini(
  topic: string,
  numQuestions: number = 10,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): Promise<QuizFile> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `Generate a multiple choice quiz about "${topic}" with exactly ${numQuestions} questions at ${difficulty} difficulty level.

Please follow this exact JSON format:
{
  "title": "Quiz about ${topic}",
  "description": "A ${difficulty} level quiz covering various aspects of ${topic}",
  "questions": [
    {
      "id": "q1",
      "question": "Your question here?",
      "options": [
        "Option A",
        "Option B", 
        "Option C",
        "Option D"
      ],
      "correctAnswer": 0,
      "explanation": "Brief explanation of why this is correct"
    }
  ]
}

Requirements:
- Generate exactly ${numQuestions} questions
- Each question must have exactly 4 options
- correctAnswer should be the index (0-3) of the correct option
- Include helpful explanations for each answer
- Make questions ${difficulty} difficulty level
- Ensure questions are diverse and cover different aspects of the topic
- Return only valid JSON, no additional text

Topic: ${topic}
Difficulty: ${difficulty}
Number of questions: ${numQuestions}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the response to extract JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No valid JSON found in response');
    }
    
    const jsonText = jsonMatch[0];
    const quiz = JSON.parse(jsonText);
    
    // Validate the structure
    if (!quiz.title || !quiz.questions || !Array.isArray(quiz.questions)) {
      throw new Error('Invalid quiz structure');
    }
    
    // Ensure we have the right number of questions
    if (quiz.questions.length !== numQuestions) {
      throw new Error(`Expected ${numQuestions} questions, got ${quiz.questions.length}`);
    }
    
    // Validate each question
    quiz.questions.forEach((q: any, index: number) => {
      if (!q.id) q.id = `q${index + 1}`;
      if (!q.question || !Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Invalid question structure at index ${index}`);
      }
      if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
        throw new Error(`Invalid correctAnswer at index ${index}`);
      }
    });
    
    return quiz as QuizFile;
  } catch (error) {
    console.error('Error generating quiz:', error);
    throw new Error('Failed to generate quiz. Please try again.');
  }
}