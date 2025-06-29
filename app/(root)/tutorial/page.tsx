'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileJson, MessagesSquare, Save, Play, Sparkles, LucideIcon } from 'lucide-react';
import Link from 'next/link';

// Internal Components
interface TutorialStepProps {
  icon: LucideIcon;
  title: string;
  step: number;
  children: React.ReactNode;
}

function TutorialStep({ icon: Icon, title, step, children }: TutorialStepProps) {
  return (
    <Card className="p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h2 className="text-lg sm:text-xl font-mono font-semibold">
          {step}. {title}
        </h2>
      </div>
      <div className="space-y-4 pl-11">
        {children}
      </div>
    </Card>
  );
}

interface CodeBlockProps {
  title?: string;
  code: string;
}

function CodeBlock({ title, code }: CodeBlockProps) {
  return (
    <div className="space-y-2">
      {title && <p className="font-semibold">{title}</p>}
      <Card className="bg-muted/50 p-3 sm:p-4">
        <pre className="text-xs sm:text-sm whitespace-pre-wrap overflow-x-auto">
          <code>{code}</code>
        </pre>
      </Card>
    </div>
  );
}

// Constants
const jsonSchema = `{
  "title": "Your Quiz Title",
  "description": "Optional description of your quiz",
  "questions": [
    {
      "id": "q1",
      "question": "Your question text here?",
      "options": [
        "Option A",
        "Option B",
        "Option C",
        "Option D"
      ],
      "correctAnswer": 0,
      "explanation": "Optional explanation of the correct answer"
    }
  ]
}`;

const aiPrompt = `Please help me create a multiple choice quiz with the following requirements:

1. Follow this JSON schema exactly:
${jsonSchema}

2. Guidelines:
- Create clear, unambiguous questions
- Each question should have 4 options
- Include explanations for correct answers
- Make sure correctAnswer index matches the correct option (0-3)
- Generate at least 10 questions
- Keep questions focused on a single topic

3. Topic: [Your topic here]

Please format the response as a valid JSON file that I can directly use.`;

// Main Component
export default function TutorialPage() {
  return (
    <main className="flex-1 bg-[#F1F0E8] dark:bg-black">
      <div className="container px-4 sm:px-6 py-8 sm:py-16">
        <div className="max-w-3xl mx-auto space-y-8 sm:space-y-12">
          <div className="space-y-3 sm:space-y-4">
            <h1 className="text-3xl sm:text-4xl font-mono font-bold">Tutorial to Get Started</h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              Learn how to create quizzes using our AI generator or by uploading your own files.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <TutorialStep 
              icon={Sparkles} 
              title="AI Quiz Generation (Recommended)" 
              step={1}
            >
              <p className="text-muted-foreground">
                The easiest way to create a quiz! Our AI can generate questions on any topic:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Click "Generate AI Quiz" on the home page</li>
                <li>Enter your desired topic (e.g., "JavaScript", "World History")</li>
                <li>Choose number of questions (5-25)</li>
                <li>Select difficulty level (Easy, Medium, Hard)</li>
                <li>Let AI create a custom quiz for you!</li>
              </ul>
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Note:</strong> You'll need a Gemini API key for AI quiz generation. 
                  Get one free at <a href="https://makersuite.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="underline">Google AI Studio</a>.
                </p>
              </div>
            </TutorialStep>

            <TutorialStep 
              icon={MessagesSquare} 
              title="Manual Quiz Creation" 
              step={2}
            >
              <p className="text-muted-foreground">
                Prefer to create your own questions? Follow these steps:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Prepare your multiple-choice questions</li>
                <li>Each question should have 4 answer options</li>
                <li>Identify the correct answer</li>
                <li>Optionally add explanations</li>
              </ul>
            </TutorialStep>

            <TutorialStep 
              icon={FileJson} 
              title="Format Questions as JSON" 
              step={3}
            >
              <p className="text-muted-foreground">
                Use AI tools like ChatGPT to format your questions according to our JSON schema:
              </p>
              <CodeBlock code={jsonSchema} />
              <CodeBlock 
                title="Use this prompt with ChatGPT:" 
                code={aiPrompt} 
              />
            </TutorialStep>

            <TutorialStep 
              icon={Save} 
              title="Save and Upload" 
              step={4}
            >
              <p className="text-muted-foreground">
                Save your formatted questions and upload them:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Save the JSON as a .json file on your computer</li>
                <li>Click "Generate Quiz Room" on the home page</li>
                <li>Upload your JSON file</li>
                <li>Choose the number of questions to practice</li>
              </ul>
            </TutorialStep>

            <TutorialStep 
              icon={Play} 
              title="Start Practicing" 
              step={5}
            >
              <p className="text-muted-foreground">
                You&apos;re ready to start practicing! Your quiz will include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Interactive multiple-choice questions</li>
                <li>Instant feedback on your answers</li>
                <li>Explanations for correct answers</li>
                <li>Progress tracking and timing</li>
                <li>Final results with performance metrics</li>
              </ul>
              <div className="pt-4">
                <Link href="/">
                  <Button className="w-full font-mono">
                    Try It Now
                  </Button>
                </Link>
              </div>
            </TutorialStep>
          </div>
        </div>
      </div>
    </main>
  );
}