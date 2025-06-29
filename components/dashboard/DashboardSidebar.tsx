'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  LayoutDashboard,
  Brain,
  FileText,
  MessageSquare,
  BookOpen,
  User,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Target,
  Trophy
} from 'lucide-react'

const sidebarItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Dashboard overview'
  },
  {
    title: 'Quiz Practice',
    href: '/dashboard/quiz',
    icon: Brain,
    description: 'MCQ practice sessions'
  },
  {
    title: 'AI Summary',
    href: '/dashboard/ai-summary',
    icon: Sparkles,
    description: 'AI-powered content summaries'
  },
  {
    title: 'PDF Chat',
    href: '/dashboard/pdf-chat',
    icon: MessageSquare,
    description: 'Chat with your PDFs'
  },
  {
    title: 'Test Prep',
    href: '/dashboard/test-prep',
    icon: Target,
    description: 'Exam preparation tools'
  },
  {
    title: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    description: 'Manage your account'
  }
]

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "relative border-r bg-background transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex h-full flex-col">
        {/* Toggle Button */}
        <div className="flex items-center justify-end p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      collapsed ? "px-2" : "px-3"
                    )}
                    title={collapsed ? item.title : undefined}
                  >
                    <item.icon className={cn(
                      "h-4 w-4",
                      collapsed ? "" : "mr-2"
                    )} />
                    {!collapsed && (
                      <span className="truncate">{item.title}</span>
                    )}
                  </Button>
                </Link>
              )
            })}
          </div>
        </ScrollArea>

        {/* Footer */}
        {!collapsed && (
          <div className="p-4 border-t">
            <div className="text-xs text-muted-foreground">
              CramJam Dashboard
            </div>
          </div>
        )}
      </div>
    </div>
  )
}