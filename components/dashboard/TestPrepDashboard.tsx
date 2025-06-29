'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Target, 
  Calendar, 
  Clock, 
  Trophy,
  BookOpen,
  Brain,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Play
} from 'lucide-react'

export function TestPrepDashboard() {
  const [upcomingExams] = useState([
    {
      id: 1,
      name: 'JavaScript Certification',
      date: '2024-02-15',
      daysLeft: 12,
      progress: 75,
      status: 'on-track'
    },
    {
      id: 2,
      name: 'React Developer Exam',
      date: '2024-03-01',
      daysLeft: 26,
      progress: 45,
      status: 'behind'
    },
    {
      id: 3,
      name: 'Node.js Assessment',
      date: '2024-03-20',
      daysLeft: 45,
      progress: 20,
      status: 'early'
    }
  ])

  const [studyPlan] = useState([
    {
      id: 1,
      topic: 'JavaScript Fundamentals',
      completed: 8,
      total: 10,
      timeSpent: 120,
      lastStudied: '2 hours ago'
    },
    {
      id: 2,
      topic: 'React Hooks',
      completed: 5,
      total: 8,
      timeSpent: 90,
      lastStudied: '1 day ago'
    },
    {
      id: 3,
      topic: 'Async Programming',
      completed: 3,
      total: 6,
      timeSpent: 60,
      lastStudied: '2 days ago'
    }
  ])

  const [practiceTests] = useState([
    {
      id: 1,
      name: 'JavaScript Mock Exam #1',
      score: 85,
      date: '2 days ago',
      questions: 50,
      timeSpent: 45
    },
    {
      id: 2,
      name: 'React Components Quiz',
      score: 92,
      date: '1 week ago',
      questions: 25,
      timeSpent: 20
    },
    {
      id: 3,
      name: 'ES6 Features Test',
      score: 78,
      date: '1 week ago',
      questions: 30,
      timeSpent: 25
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'behind': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'early': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return <CheckCircle className="h-4 w-4" />
      case 'behind': return <AlertCircle className="h-4 w-4" />
      case 'early': return <Clock className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-mono font-bold flex items-center gap-2">
          <Target className="h-8 w-8" />
          Test Prep
        </h1>
        <p className="text-muted-foreground">
          Prepare for your exams with structured study plans and practice tests
        </p>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="study-plan">Study Plan</TabsTrigger>
          <TabsTrigger value="practice">Practice Tests</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Upcoming Exams */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Upcoming Exams
              </CardTitle>
              <CardDescription>
                Track your exam schedule and preparation progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <h3 className="font-medium">{exam.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(exam.date).toLocaleDateString()} • {exam.daysLeft} days left
                        </p>
                      </div>
                      <Badge className={getStatusColor(exam.status)}>
                        {getStatusIcon(exam.status)}
                        <span className="ml-1 capitalize">{exam.status.replace('-', ' ')}</span>
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Preparation Progress</span>
                        <span>{exam.progress}%</span>
                      </div>
                      <Progress value={exam.progress} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Exams</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <p className="text-xs text-muted-foreground">
                  2 on track, 1 behind
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24h</div>
                <p className="text-xs text-muted-foreground">
                  This week
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Practice Tests</CardTitle>
                <Brain className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Completed
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                <Trophy className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">85%</div>
                <p className="text-xs text-muted-foreground">
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                  +3% from last week
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="study-plan" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Study Plan Progress
              </CardTitle>
              <CardDescription>
                Track your progress through each study topic
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {studyPlan.map((topic) => (
                  <div key={topic.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h3 className="font-medium">{topic.topic}</h3>
                        <p className="text-sm text-muted-foreground">
                          {topic.completed}/{topic.total} lessons • {topic.timeSpent} minutes • Last studied {topic.lastStudied}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Play className="mr-2 h-4 w-4" />
                        Continue
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{Math.round((topic.completed / topic.total) * 100)}%</span>
                      </div>
                      <Progress value={(topic.completed / topic.total) * 100} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Start Practice Test</CardTitle>
                <CardDescription>
                  Take a practice test to assess your knowledge
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-3">
                  <Button className="h-16 flex flex-col gap-1">
                    <Brain className="h-5 w-5" />
                    <span>JavaScript Mock Exam</span>
                    <span className="text-xs opacity-75">50 questions • 60 minutes</span>
                  </Button>
                  
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <Target className="h-5 w-5" />
                    <span>React Components Quiz</span>
                    <span className="text-xs opacity-75">25 questions • 30 minutes</span>
                  </Button>
                  
                  <Button variant="outline" className="h-16 flex flex-col gap-1">
                    <BookOpen className="h-5 w-5" />
                    <span>Custom Practice Set</span>
                    <span className="text-xs opacity-75">Create your own test</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Practice Tests</CardTitle>
                <CardDescription>
                  Your practice test history and scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {practiceTests.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium text-sm">{test.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {test.questions} questions • {test.timeSpent} min • {test.date}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge variant={test.score >= 80 ? "default" : "secondary"}>
                          {test.score}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Trends</CardTitle>
                <CardDescription>
                  Your test scores over time
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
                <CardTitle>Subject Strengths</CardTitle>
                <CardDescription>
                  Performance by topic area
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>JavaScript Basics</span>
                    <span>92%</span>
                  </div>
                  <Progress value={92} />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>React Components</span>
                    <span>88%</span>
                  </div>
                  <Progress value={88} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Async Programming</span>
                    <span>75%</span>
                  </div>
                  <Progress value={75} />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>DOM Manipulation</span>
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