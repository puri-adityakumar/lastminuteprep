import { Brain, BookOpen, Zap, Target, Users, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#F1F0E8] dark:bg-black">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
            <Brain className="w-12 h-12 animate-pulse" />
          </div>
          
          <h1 className="text-6xl font-mono font-bold tracking-tight">
            Last Minute Prep
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your ultimate companion for exam preparation. Master multiple-choice questions, 
            track your progress, and boost your confidence with our intelligent practice platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link href="/generate-mcq">
              <Button size="lg" className="font-mono text-lg px-8 hover:scale-105 transition-transform">
                <Zap className="mr-2 h-5 w-5" />
                Start Practicing
              </Button>
            </Link>
            <Link href="/tutorial">
              <Button variant="outline" size="lg" className="font-mono text-lg px-8 hover:scale-105 transition-transform">
                <BookOpen className="mr-2 h-5 w-5" />
                Learn How
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-mono font-bold text-center mb-12">
            Why Choose Last Minute Prep?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <CardTitle className="font-mono">AI-Powered Generation</CardTitle>
                <CardDescription>
                  Generate custom quizzes on any topic using advanced AI technology
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="font-mono">Instant Feedback</CardTitle>
                <CardDescription>
                  Get immediate explanations and track your progress in real-time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <CardTitle className="font-mono">Custom Content</CardTitle>
                <CardDescription>
                  Upload your own question sets or use our sample quizzes
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <CardTitle className="font-mono">Lightning Fast</CardTitle>
                <CardDescription>
                  Quick setup and instant quiz generation for last-minute study sessions
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <CardTitle className="font-mono">Performance Tracking</CardTitle>
                <CardDescription>
                  Monitor your scores, timing, and improvement over time
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="font-mono">Study Anywhere</CardTitle>
                <CardDescription>
                  Responsive design works perfectly on desktop, tablet, and mobile
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-mono font-bold">
            Ready to Ace Your Exams?
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of students who have improved their test scores with Last Minute Prep
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/generate-mcq">
              <Button size="lg" className="font-mono text-lg px-8 hover:scale-105 transition-transform">
                Get Started Now
              </Button>
            </Link>
            <Link href="/tutorial">
              <Button variant="outline" size="lg" className="font-mono text-lg px-8 hover:scale-105 transition-transform">
                View Tutorial
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}