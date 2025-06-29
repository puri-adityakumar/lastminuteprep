import { createClient } from '@/lib/supabase/server'
import { ProfileDashboard } from '@/components/dashboard/ProfileDashboard'

export default async function ProfilePage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <ProfileDashboard user={user} />
}