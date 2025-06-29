import { GoogleGenerativeAI } from '@google/generative-ai';
import { QuizFile } from './types';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateQuizWithGemini(
  topic: string,
  numQuestions: number = 10,
  difficulty: 'easy' | 'medium' | 'hard' = 'medium'
): Promise<QuizFile> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `Generate a multiple choice quiz about "${topic}" with exactly ${numQuestions} questions at ${difficulty} difficulty level.

You must respond with ONLY valid JSON in this exact format:

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
- Return ONLY valid JSON, no markdown formatting, no additional text

Topic: ${topic}
Difficulty: ${difficulty}
Number of questions: ${numQuestions}`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw AI response:', text);
    
    // Clean the response to extract JSON
    let cleanedText = text.trim();
    
    // Remove markdown code blocks if present
    cleanedText = cleanedText.replace(/```json\s*/g, '').replace(/```\s*/g, '');
    
    // Find JSON object
    const jsonMatch = cleanedText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('No JSON found in response:', text);
      throw new Error('No valid JSON found in AI response');
    }
    
    const jsonText = jsonMatch[0];
    console.log('Extracted JSON:', jsonText);
    
    let quiz;
    try {
      quiz = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      console.error('Failed to parse:', jsonText);
      throw new Error('Invalid JSON format in AI response');
    }
    
    // Validate the structure
    if (!quiz.title || !quiz.questions || !Array.isArray(quiz.questions)) {
      console.error('Invalid quiz structure:', quiz);
      throw new Error('Invalid quiz structure from AI');
    }
    
    // Ensure we have the right number of questions
    if (quiz.questions.length !== numQuestions) {
      console.warn(`Expected ${numQuestions} questions, got ${quiz.questions.length}`);
      // Trim or pad questions as needed
      if (quiz.questions.length > numQuestions) {
        quiz.questions = quiz.questions.slice(0, numQuestions);
      }
    }
    
    // Validate and fix each question
    quiz.questions.forEach((q: any, index: number) => {
      if (!q.id) q.id = `q${index + 1}`;
      if (!q.question || typeof q.question !== 'string') {
        throw new Error(`Invalid question at index ${index}`);
      }
      if (!Array.isArray(q.options) || q.options.length !== 4) {
        throw new Error(`Invalid options at index ${index}`);
      }
      if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 0 || q.correctAnswer > 3) {
        console.warn(`Invalid correctAnswer at index ${index}, defaulting to 0`);
        q.correctAnswer = 0;
      }
      if (!q.explanation || typeof q.explanation !== 'string') {
        q.explanation = 'No explanation provided.';
      }
    });
    
    console.log('Successfully generated quiz:', quiz);
    return quiz as QuizFile;
  } catch (error) {
    console.error('Error generating quiz:', error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to generate quiz. Please try again.');
  }
}