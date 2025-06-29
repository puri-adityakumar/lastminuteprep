'use client';

import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';
import { UserMenu } from '@/components/auth/UserMenu';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';

export function Navbar() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return (
    <header className="sticky px-6 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex-1">
          <Link href="/" className="flex items-center space-x-3 pl-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-mono font-bold text-xl">CramJam</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            {user && (
              <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
            )}
            <Link href="/quiz-practice" className="text-sm font-medium transition-colors hover:text-primary">
              Practice
            </Link>
            <Link href="/tutorial" className="text-sm font-medium transition-colors hover:text-primary">
              Tutorial
            </Link>
          </nav>
          
          {!loading && (
            <>
              {user ? (
                <UserMenu user={user} />
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/auth/signin">
                    <Button variant="ghost" size="sm">
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </>
          )}
          
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}