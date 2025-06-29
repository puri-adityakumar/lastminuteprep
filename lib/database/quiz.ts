import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'

type QuizSession = Database['public']['Tables']['quiz_sessions']['Row']
type QuizSessionInsert = Database['public']['Tables']['quiz_sessions']['Insert']
type QuizResult = Database['public']['Tables']['quiz_results']['Insert']
type UserStats = Database['public']['Tables']['user_stats']['Row']

export class QuizDatabase {
  private supabase = createClient()

  async createQuizSession(data: Omit<QuizSessionInsert, 'user_id'>): Promise<string> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { data: session, error } = await this.supabase
      .from('quiz_sessions')
      .insert({
        ...data,
        user_id: user.id
      })
      .select('id')
      .single()

    if (error) {
      throw new Error(`Failed to create quiz session: ${error.message}`)
    }

    return session.id
  }

  async updateQuizSession(sessionId: string, updates: Partial<QuizSessionInsert>) {
    const { error } = await this.supabase
      .from('quiz_sessions')
      .update(updates)
      .eq('id', sessionId)

    if (error) {
      throw new Error(`Failed to update quiz session: ${error.message}`)
    }
  }

  async saveQuizResult(sessionId: string, result: Omit<QuizResult, 'session_id'>) {
    const { error } = await this.supabase
      .from('quiz_results')
      .insert({
        ...result,
        session_id: sessionId
      })

    if (error) {
      throw new Error(`Failed to save quiz result: ${error.message}`)
    }
  }

  async completeQuizSession(
    sessionId: string, 
    totalQuestions: number, 
    correctAnswers: number, 
    timeSpentSeconds: number
  ) {
    const scorePercentage = (correctAnswers / totalQuestions) * 100

    const { error } = await this.supabase
      .from('quiz_sessions')
      .update({
        questions_answered: totalQuestions,
        correct_answers: correctAnswers,
        score_percentage: scorePercentage,
        time_spent_seconds: timeSpentSeconds,
        completed_at: new Date().toISOString(),
        is_completed: true
      })
      .eq('id', sessionId)

    if (error) {
      throw new Error(`Failed to complete quiz session: ${error.message}`)
    }
  }

  async getUserStats(): Promise<UserStats | null> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      return null
    }

    const { data, error } = await this.supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw new Error(`Failed to get user stats: ${error.message}`)
    }

    return data
  }

  async getRecentQuizSessions(limit: number = 10): Promise<QuizSession[]> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      return []
    }

    const { data, error } = await this.supabase
      .from('quiz_sessions')
      .select('*')
      .eq('user_id', user.id)
      .eq('is_completed', true)
      .order('completed_at', { ascending: false })
      .limit(limit)

    if (error) {
      throw new Error(`Failed to get recent quiz sessions: ${error.message}`)
    }

    return data || []
  }

  async getUserAchievements() {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      return []
    }

    const { data, error } = await this.supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', user.id)
      .order('earned_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to get user achievements: ${error.message}`)
    }

    return data || []
  }
}

export const quizDatabase = new QuizDatabase()