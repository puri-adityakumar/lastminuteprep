import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Simple redirect without complex parameter handling
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  // Redirect to error page on failure
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}