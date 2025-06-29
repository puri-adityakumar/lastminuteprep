'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  BookOpen,
  Zap,
  Calendar,
  Award,
  BarChart3,
  Sparkles,
  MessageSquare,
  FileText
} from 'lucide-react'
import Link from 'next/link'

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
  created_at: string
}

interface DashboardOverviewProps {
  user: User | null
}

export function DashboardOverview({ user }: DashboardOverviewProps) {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0,
    streak: 0,
    timeSpent: 0,
    summariesGenerated: 0,
    pdfsProcessed: 0
  })

  useEffect(() => {
    // Mock data - in real app, fetch from database
    setStats({
      totalQuizzes: 12,
      totalQuestions: 156,
      correctAnswers: 124,
      averageScore: 79.5,
      streak: 5,
      timeSpent: 240,
      summariesGenerated: 8,
      pdfsProcessed: 3
    })
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-mono font-bold">
          {getGreeting()}, {userName}! 👋
        </h1>
        <p className="text-muted-foreground">
          Welcome to your learning dashboard. Here's your progress overview.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/dashboard/quiz">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Quiz Practice</CardTitle>
              <Brain className="h-4 w-4 text-blue-600 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
              <p className="text-xs text-muted-foreground">
                Quizzes completed
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/ai-summary">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">AI Summary</CardTitle>
              <Sparkles className="h-4 w-4 text-purple-600 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.summariesGenerated}</div>
              <p className="text-xs text-muted-foreground">
                Summaries generated
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/pdf-chat">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">PDF Chat</CardTitle>
              <MessageSquare className="h-4 w-4 text-green-600 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pdfsProcessed}</div>
              <p className="text-xs text-muted-foreground">
                PDFs processed
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dashboard/test-prep">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Test Prep</CardTitle>
              <Target className="h-4 w-4 text-orange-600 group-hover:scale-110 transition-transform" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Average score
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Questions Answered</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuestions}</div>
            <p className="text-xs text-muted-foreground">
              {stats.correctAnswers} correct
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.streak} days</div>
            <p className="text-xs text-muted-foreground">
              Keep it up! 🔥
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Studied</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.floor(stats.timeSpent / 60)}h {stats.timeSpent % 60}m</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accuracy</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +5.2% improvement
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress and Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
            <CardDescription>
              Your learning progress this week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Quiz Goal</span>
                <span>8/10 completed</span>
              </div>
              <Progress value={80} />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Study Time Goal</span>
                <span>4h/6h this week</span>
              </div>
              <Progress value={67} />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Accuracy Target</span>
                <span>79.5%/80%</span>
              </div>
              <Progress value={99} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Your latest learning activities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <Brain className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Completed JavaScript Quiz</p>
                <p className="text-xs text-muted-foreground">Scored 85% • 2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Generated AI Summary</p>
                <p className="text-xs text-muted-foreground">React Hooks documentation • 1 day ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">PDF Chat Session</p>
                <p className="text-xs text-muted-foreground">Computer Science textbook • 2 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Jump into your favorite learning activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link href="/dashboard/quiz">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Brain className="h-6 w-6" />
                <span>Start Quiz</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/ai-summary">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Sparkles className="h-6 w-6" />
                <span>AI Summary</span>
              </Button>
            </Link>
            
            <Link href="/dashboard/pdf-chat">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <MessageSquare className="h-6 w-6" />
                <span>Chat with PDF</span>
              </Button>
            </Link>

            <Link href="/dashboard/test-prep">
              <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                <Target className="h-6 w-6" />
                <span>Test Prep</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}