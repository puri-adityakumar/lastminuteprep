import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'

type Profile = Database['public']['Tables']['profiles']['Row']
type ProfileUpdate = Database['public']['Tables']['profiles']['Update']

export class ProfileDatabase {
  private supabase = createClient()

  async getProfile(): Promise<Profile | null> {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      return null
    }

    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      throw new Error(`Failed to get profile: ${error.message}`)
    }

    return data
  }

  async updateProfile(updates: Omit<ProfileUpdate, 'id' | 'created_at' | 'updated_at'>) {
    const { data: { user } } = await this.supabase.auth.getUser()
    
    if (!user) {
      throw new Error('User not authenticated')
    }

    const { error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (error) {
      throw new Error(`Failed to update profile: ${error.message}`)
    }
  }

  async createProfile(profile: Omit<Profile, 'created_at' | 'updated_at'>) {
    const { error } = await this.supabase
      .from('profiles')
      .insert(profile)

    if (error) {
      throw new Error(`Failed to create profile: ${error.message}`)
    }
  }
}

export const profileDatabase = new ProfileDatabase()