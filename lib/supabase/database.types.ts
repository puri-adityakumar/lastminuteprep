export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          website: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      quiz_sessions: {
        Row: {
          id: string
          user_id: string
          quiz_title: string
          quiz_type: string
          total_questions: number
          questions_answered: number
          correct_answers: number
          score_percentage: number | null
          time_spent_seconds: number | null
          started_at: string
          completed_at: string | null
          is_completed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          quiz_title: string
          quiz_type?: string
          total_questions: number
          questions_answered?: number
          correct_answers?: number
          score_percentage?: number | null
          time_spent_seconds?: number | null
          started_at?: string
          completed_at?: string | null
          is_completed?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          quiz_title?: string
          quiz_type?: string
          total_questions?: number
          questions_answered?: number
          correct_answers?: number
          score_percentage?: number | null
          time_spent_seconds?: number | null
          started_at?: string
          completed_at?: string | null
          is_completed?: boolean
          created_at?: string
        }
      }
      quiz_results: {
        Row: {
          id: string
          session_id: string
          question_index: number
          question_text: string
          user_answer: number | null
          correct_answer: number
          is_correct: boolean
          time_spent_seconds: number | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          question_index: number
          question_text: string
          user_answer?: number | null
          correct_answer: number
          is_correct: boolean
          time_spent_seconds?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          question_index?: number
          question_text?: string
          user_answer?: number | null
          correct_answer?: number
          is_correct?: boolean
          time_spent_seconds?: number | null
          created_at?: string
        }
      }
      user_stats: {
        Row: {
          id: string
          user_id: string
          total_quizzes: number
          total_questions: number
          total_correct_answers: number
          total_time_spent_seconds: number
          average_score: number
          current_streak_days: number
          longest_streak_days: number
          last_quiz_date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          total_quizzes?: number
          total_questions?: number
          total_correct_answers?: number
          total_time_spent_seconds?: number
          average_score?: number
          current_streak_days?: number
          longest_streak_days?: number
          last_quiz_date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          total_quizzes?: number
          total_questions?: number
          total_correct_answers?: number
          total_time_spent_seconds?: number
          average_score?: number
          current_streak_days?: number
          longest_streak_days?: number
          last_quiz_date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      user_achievements: {
        Row: {
          id: string
          user_id: string
          achievement_type: string
          achievement_name: string
          achievement_description: string | null
          earned_at: string
        }
        Insert: {
          id?: string
          user_id: string
          achievement_type: string
          achievement_name: string
          achievement_description?: string | null
          earned_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          achievement_type?: string
          achievement_name?: string
          achievement_description?: string | null
          earned_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}