/*
  # Create Quiz and User Statistics Tables

  1. New Tables
    - `quiz_sessions` - Track individual quiz sessions
    - `quiz_results` - Store quiz results and scores
    - `user_stats` - Aggregate user statistics
    - `achievements` - User achievements and badges

  2. Security
    - Enable RLS on all tables
    - Add policies for users to access their own data

  3. Features
    - Track quiz performance over time
    - Store user achievements
    - Calculate statistics and progress
*/

-- Quiz Sessions Table
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  quiz_title text NOT NULL,
  quiz_type text NOT NULL DEFAULT 'custom', -- 'custom', 'ai_generated', 'sample'
  total_questions integer NOT NULL,
  questions_answered integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  score_percentage decimal(5,2),
  time_spent_seconds integer,
  started_at timestamptz DEFAULT now() NOT NULL,
  completed_at timestamptz,
  is_completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Quiz Results Table (detailed question-by-question results)
CREATE TABLE IF NOT EXISTS quiz_results (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id uuid REFERENCES quiz_sessions(id) ON DELETE CASCADE NOT NULL,
  question_index integer NOT NULL,
  question_text text NOT NULL,
  user_answer integer,
  correct_answer integer NOT NULL,
  is_correct boolean NOT NULL,
  time_spent_seconds integer,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- User Statistics Table
CREATE TABLE IF NOT EXISTS user_stats (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  total_quizzes integer DEFAULT 0,
  total_questions integer DEFAULT 0,
  total_correct_answers integer DEFAULT 0,
  total_time_spent_seconds integer DEFAULT 0,
  average_score decimal(5,2) DEFAULT 0,
  current_streak_days integer DEFAULT 0,
  longest_streak_days integer DEFAULT 0,
  last_quiz_date timestamptz,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Achievements Table
CREATE TABLE IF NOT EXISTS user_achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  achievement_type text NOT NULL,
  achievement_name text NOT NULL,
  achievement_description text,
  earned_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(user_id, achievement_type)
);

-- Enable RLS on all tables
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- Policies for quiz_sessions
CREATE POLICY "Users can view own quiz sessions"
  ON quiz_sessions
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own quiz sessions"
  ON quiz_sessions
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own quiz sessions"
  ON quiz_sessions
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for quiz_results
CREATE POLICY "Users can view own quiz results"
  ON quiz_results
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM quiz_sessions 
      WHERE quiz_sessions.id = quiz_results.session_id 
      AND quiz_sessions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own quiz results"
  ON quiz_results
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM quiz_sessions 
      WHERE quiz_sessions.id = quiz_results.session_id 
      AND quiz_sessions.user_id = auth.uid()
    )
  );

-- Policies for user_stats
CREATE POLICY "Users can view own stats"
  ON user_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own stats"
  ON user_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stats"
  ON user_stats
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for user_achievements
CREATE POLICY "Users can view own achievements"
  ON user_achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own achievements"
  ON user_achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Function to update user stats when quiz is completed
CREATE OR REPLACE FUNCTION update_user_stats_on_quiz_completion()
RETURNS trigger AS $$
DECLARE
  user_record uuid;
  quiz_date date;
  prev_quiz_date date;
  streak_days integer;
BEGIN
  -- Only process when quiz is marked as completed
  IF NEW.is_completed = true AND (OLD.is_completed IS NULL OR OLD.is_completed = false) THEN
    user_record := NEW.user_id;
    quiz_date := DATE(NEW.completed_at);
    
    -- Get previous quiz date for streak calculation
    SELECT DATE(completed_at) INTO prev_quiz_date
    FROM quiz_sessions 
    WHERE user_id = user_record 
      AND is_completed = true 
      AND id != NEW.id
    ORDER BY completed_at DESC 
    LIMIT 1;
    
    -- Calculate streak
    IF prev_quiz_date IS NULL THEN
      streak_days := 1;
    ELSIF quiz_date = prev_quiz_date + INTERVAL '1 day' THEN
      SELECT current_streak_days + 1 INTO streak_days
      FROM user_stats WHERE user_id = user_record;
    ELSIF quiz_date = prev_quiz_date THEN
      SELECT current_streak_days INTO streak_days
      FROM user_stats WHERE user_id = user_record;
    ELSE
      streak_days := 1;
    END IF;
    
    -- Insert or update user stats
    INSERT INTO user_stats (
      user_id, 
      total_quizzes, 
      total_questions, 
      total_correct_answers,
      total_time_spent_seconds,
      current_streak_days,
      longest_streak_days,
      last_quiz_date
    ) VALUES (
      user_record,
      1,
      NEW.total_questions,
      NEW.correct_answers,
      COALESCE(NEW.time_spent_seconds, 0),
      streak_days,
      streak_days,
      NEW.completed_at
    )
    ON CONFLICT (user_id) DO UPDATE SET
      total_quizzes = user_stats.total_quizzes + 1,
      total_questions = user_stats.total_questions + NEW.total_questions,
      total_correct_answers = user_stats.total_correct_answers + NEW.correct_answers,
      total_time_spent_seconds = user_stats.total_time_spent_seconds + COALESCE(NEW.time_spent_seconds, 0),
      current_streak_days = streak_days,
      longest_streak_days = GREATEST(user_stats.longest_streak_days, streak_days),
      last_quiz_date = NEW.completed_at,
      updated_at = now();
    
    -- Update average score
    UPDATE user_stats 
    SET average_score = CASE 
      WHEN total_questions > 0 THEN 
        ROUND((total_correct_answers::decimal / total_questions::decimal) * 100, 2)
      ELSE 0 
    END
    WHERE user_id = user_record;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update stats on quiz completion
CREATE TRIGGER update_user_stats_trigger
  AFTER UPDATE ON quiz_sessions
  FOR EACH ROW EXECUTE FUNCTION update_user_stats_on_quiz_completion();

-- Function to award achievements
CREATE OR REPLACE FUNCTION check_and_award_achievements()
RETURNS trigger AS $$
DECLARE
  stats_record user_stats%ROWTYPE;
BEGIN
  -- Get current user stats
  SELECT * INTO stats_record FROM user_stats WHERE user_id = NEW.user_id;
  
  -- First Quiz Achievement
  IF stats_record.total_quizzes = 1 THEN
    INSERT INTO user_achievements (user_id, achievement_type, achievement_name, achievement_description)
    VALUES (NEW.user_id, 'first_quiz', 'First Quiz', 'Completed your first quiz')
    ON CONFLICT (user_id, achievement_type) DO NOTHING;
  END IF;
  
  -- Perfect Score Achievement
  IF NEW.score_percentage = 100 THEN
    INSERT INTO user_achievements (user_id, achievement_type, achievement_name, achievement_description)
    VALUES (NEW.user_id, 'perfect_score', 'Perfect Score', 'Scored 100% on a quiz')
    ON CONFLICT (user_id, achievement_type) DO NOTHING;
  END IF;
  
  -- Speed Demon Achievement (completed in under 2 minutes)
  IF NEW.time_spent_seconds <= 120 THEN
    INSERT INTO user_achievements (user_id, achievement_type, achievement_name, achievement_description)
    VALUES (NEW.user_id, 'speed_demon', 'Speed Demon', 'Completed quiz in under 2 minutes')
    ON CONFLICT (user_id, achievement_type) DO NOTHING;
  END IF;
  
  -- Streak Achievements
  IF stats_record.current_streak_days >= 7 THEN
    INSERT INTO user_achievements (user_id, achievement_type, achievement_name, achievement_description)
    VALUES (NEW.user_id, 'week_streak', 'Consistent Learner', '7-day study streak')
    ON CONFLICT (user_id, achievement_type) DO NOTHING;
  END IF;
  
  -- Quiz Master Achievement (50 quizzes)
  IF stats_record.total_quizzes >= 50 THEN
    INSERT INTO user_achievements (user_id, achievement_type, achievement_name, achievement_description)
    VALUES (NEW.user_id, 'quiz_master', 'Quiz Master', 'Completed 50 quizzes')
    ON CONFLICT (user_id, achievement_type) DO NOTHING;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to check achievements on quiz completion
CREATE TRIGGER check_achievements_trigger
  AFTER UPDATE ON quiz_sessions
  FOR EACH ROW 
  WHEN (NEW.is_completed = true AND (OLD.is_completed IS NULL OR OLD.is_completed = false))
  EXECUTE FUNCTION check_and_award_achievements();

-- Add updated_at trigger to user_stats
CREATE TRIGGER handle_user_stats_updated_at
  BEFORE UPDATE ON user_stats
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();