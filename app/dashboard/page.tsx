import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // This check is redundant since middleware handles it, but keeping for safety
  if (!user) {
    redirect('/auth/signin')
  }

  return <DashboardOverview user={user} />
}