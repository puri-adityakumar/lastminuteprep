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
  BarChart3
} from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

interface User {
  id: string
  email: string
  user_metadata?: {
    full_name?: string
  }
  created_at: string
}

interface DashboardContentProps {
  user: User
}

export function DashboardContent({ user }: DashboardContentProps) {
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0,
    streak: 0,
    timeSpent: 0
  })

  const supabase = createClient()

  useEffect(() => {
    // In a real app, you'd fetch user stats from the database
    // For now, we'll use mock data
    setStats({
      totalQuizzes: 12,
      totalQuestions: 156,
      correctAnswers: 124,
      averageScore: 79.5,
      streak: 5,
      timeSpent: 240 // minutes
    })
  }, [])

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const userName = user.user_metadata?.full_name || user.email.split('@')[0]
  const memberSince = new Date(user.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })

  return (
    <div className="min-h-screen bg-[#F1F0E8] dark:bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Welcome Header */}
          <div className="space-y-2">
            <h1 className="text-3xl font-mono font-bold">
              {getGreeting()}, {userName}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to continue your learning journey? Let's see how you're doing.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/quiz-practice">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Start Practice</CardTitle>
                  <Zap className="h-4 w-4 text-orange-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Quick Quiz</div>
                  <p className="text-xs text-muted-foreground">
                    Jump into a practice session
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/tutorial">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learn</CardTitle>
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Tutorial</div>
                  <p className="text-xs text-muted-foreground">
                    Learn how to use CramJam
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Member Since</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{memberSince}</div>
                <p className="text-xs text-muted-foreground">
                  Welcome to the community!
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Quizzes</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last week
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
                  {stats.correctAnswers} correct answers
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
                  +5.2% from last month
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
          </div>

          {/* Progress Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Performance Overview
                </CardTitle>
                <CardDescription>
                  Your quiz performance over time
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy Rate</span>
                    <span>{Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%</span>
                  </div>
                  <Progress value={(stats.correctAnswers / stats.totalQuestions) * 100} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Goal</span>
                    <span>8/10 quizzes</span>
                  </div>
                  <Progress value={80} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Study Time</span>
                    <span>{Math.floor(stats.timeSpent / 60)}h {stats.timeSpent % 60}m</span>
                  </div>
                  <Progress value={65} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Recent Achievements
                </CardTitle>
                <CardDescription>
                  Your latest accomplishments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                    <Award className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Perfect Score!</p>
                    <p className="text-xs text-muted-foreground">Scored 100% on JavaScript Quiz</p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Speed Demon</p>
                    <p className="text-xs text-muted-foreground">Completed quiz in under 2 minutes</p>
                  </div>
                  <Badge variant="outline">2 days ago</Badge>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Consistent Learner</p>
                    <p className="text-xs text-muted-foreground">5-day study streak</p>
                  </div>
                  <Badge variant="outline">Active</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Start Section */}
          <Card>
            <CardHeader>
              <CardTitle>Ready to Practice?</CardTitle>
              <CardDescription>
                Choose your preferred way to start learning
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link href="/quiz-practice">
                  <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                    <Brain className="h-6 w-6" />
                    <span>Upload Quiz</span>
                  </Button>
                </Link>
                
                <Link href="/quiz-practice">
                  <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                    <Zap className="h-6 w-6" />
                    <span>AI Generated</span>
                  </Button>
                </Link>
                
                <Link href="/quiz-practice">
                  <Button className="w-full h-20 flex flex-col gap-2" variant="outline">
                    <BookOpen className="h-6 w-6" />
                    <span>Sample Quiz</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}