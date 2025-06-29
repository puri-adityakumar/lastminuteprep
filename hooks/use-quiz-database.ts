'use client'

import { useState, useEffect } from 'react'
import { quizDatabase } from '@/lib/database/quiz'
import { Database } from '@/lib/supabase/database.types'

type UserStats = Database['public']['Tables']['user_stats']['Row']
type QuizSession = Database['public']['Tables']['quiz_sessions']['Row']

export function useQuizDatabase() {
  const [stats, setStats] = useState<UserStats | null>(null)
  const [recentSessions, setRecentSessions] = useState<QuizSession[]>([])
  const [achievements, setAchievements] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)

      const [userStats, sessions, userAchievements] = await Promise.all([
        quizDatabase.getUserStats(),
        quizDatabase.getRecentQuizSessions(10),
        quizDatabase.getUserAchievements()
      ])

      setStats(userStats)
      setRecentSessions(sessions)
      setAchievements(userAchievements)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const createSession = async (title: string, type: string, totalQuestions: number) => {
    try {
      const sessionId = await quizDatabase.createQuizSession({
        quiz_title: title,
        quiz_type: type,
        total_questions: totalQuestions
      })
      return sessionId
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create session')
      throw err
    }
  }

  const completeSession = async (
    sessionId: string,
    totalQuestions: number,
    correctAnswers: number,
    timeSpentSeconds: number
  ) => {
    try {
      await quizDatabase.completeQuizSession(sessionId, totalQuestions, correctAnswers, timeSpentSeconds)
      // Refresh data after completion
      await fetchData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete session')
      throw err
    }
  }

  return {
    stats,
    recentSessions,
    achievements,
    loading,
    error,
    createSession,
    completeSession,
    refreshData: fetchData
  }
}