'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileJson, MessagesSquare, Save, Play, LucideIcon } from 'lucide-react';
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
              Follow these simple steps to create and use your own quiz rooms.
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <TutorialStep 
              icon={MessagesSquare} 
              title="Collect Your Questions" 
              step={1}
            >
              <p className="text-muted-foreground">
                Prepare your multiple-choice questions. Each question should have:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Clear question text</li>
                <li>Four answer options</li>
                <li>One correct answer</li>
                <li>Optional explanation</li>
              </ul>
            </TutorialStep>

            <TutorialStep 
              icon={FileJson} 
              title="Format Questions" 
              step={2}
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
              title="Save as JSON" 
              step={3}
            >
              <p className="text-muted-foreground">
                Save the formatted questions as a .json file on your computer. Make sure the file:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Has a .json extension</li>
                <li>Contains valid JSON format</li>
                <li>Follows our schema exactly</li>
              </ul>
            </TutorialStep>

            <TutorialStep 
              icon={Play} 
              title="Start Practicing" 
              step={4}
            >
              <p className="text-muted-foreground">
                You&apos;re ready to start practicing! Follow these steps:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Click &quot;Generate Quiz Room&quot; on the home page</li>
                <li>Upload your JSON file</li>
                <li>Choose the number of questions</li>
                <li>Start the quiz and track your progress</li>
              </ol>
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