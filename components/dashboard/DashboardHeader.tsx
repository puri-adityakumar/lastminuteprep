'use client'

import { GraduationCap, Bell } from 'lucide-react'
import Link from 'next/link'
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher'
import { UserMenu } from '@/components/auth/UserMenu'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface DashboardHeaderProps {
  user: {
    id: string
    email: string
    user_metadata?: {
      full_name?: string
    }
  }
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center px-6">
        <div className="flex-1">
          <Link href="/dashboard" className="flex items-center space-x-3">
            <GraduationCap className="h-6 w-6" />
            <span className="font-mono font-bold text-xl">CramJam</span>
            <Badge variant="secondary" className="text-xs">Dashboard</Badge>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
            >
              3
            </Badge>
          </Button>
          
          <ThemeSwitcher />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  )
}