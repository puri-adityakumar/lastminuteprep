'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Trophy, 
  Clock, 
  Target, 
  Play,
  Upload,
  Sparkles,
  BookOpen,
  TrendingUp,
  Calendar,
  BarChart3
} from 'lucide-react'
import Link from 'next/link'

export function QuizDashboard() {
  const [recentQuizzes] = useState([
    { id: 1, title: 'JavaScript Fundamentals', score: 85, date: '2 hours ago', questions: 20 },
    { id: 2, title: 'React Hooks', score: 92, date: '1 day ago', questions: 15 },
    { id: 3, title: 'CSS Grid Layout', score: 78, date: '2 days ago', questions: 12 },
    { id: 4, title: 'Node.js Basics', score: 88, date: '3 days ago', questions: 18 },
  ])

  const [stats] = useState({
    totalQuizzes: 24,
    averageScore: 84.5,
    totalQuestions: 312,
    correctAnswers: 264,
    timeSpent: 180,
    streak: 7
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-mono font-bold flex items-center gap-2">
          <Brain className="h-8 w-8" />
          Quiz Dashboard
        </h1>
        <p className="text-muted-foreground">
          Track your quiz performance and start new practice sessions
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
            <Brain className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">
              +3 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +2.3% from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.correctAnswers} correct ({Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%)
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak} days</div>
            <p className="text-xs text-muted-foreground">
              Keep going! 🔥
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="start" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="start">Start Quiz</TabsTrigger>
          <TabsTrigger value="history">Quiz History</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="start" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/quiz-practice">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Upload Quiz</CardTitle>
                  <CardDescription>
                    Upload your own JSON quiz file and start practicing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload & Start
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/quiz-practice">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>AI Generated</CardTitle>
                  <CardDescription>
                    Generate custom quizzes on any topic using AI
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Quiz
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/quiz-practice">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Sample Quiz</CardTitle>
                  <CardDescription>
                    Try our pre-made sample quiz to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Start Sample
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quizzes</CardTitle>
              <CardDescription>
                Your quiz history and performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{quiz.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {quiz.questions} questions • {quiz.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant={quiz.score >= 80 ? "default" : "secondary"}>
                        {quiz.score}%
                      </Badge>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Trends
                </CardTitle>
                <CardDescription>
                  Your quiz performance over time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>This Week</span>
                    <span>87% average</span>
                  </div>
                  <Progress value={87} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Last Week</span>
                    <span>82% average</span>
                  </div>
                  <Progress value={82} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Two Weeks Ago</span>
                    <span>79% average</span>
                  </div>
                  <Progress value={79} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Subject Performance
                </CardTitle>
                <CardDescription>
                  Performance by quiz category
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>JavaScript</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>React</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>CSS</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Node.js</span>
                    <span>81%</span>
                  </div>
                  <Progress value={81} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}