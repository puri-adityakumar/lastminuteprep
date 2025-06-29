'use client';

import { GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { ThemeSwitcher } from '@/components/theme/ThemeSwitcher';

export function Navbar() {
  return (
    <header className="sticky px-6 top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="flex-1">
          <Link href="/" className="flex items-center space-x-3 pl-2">
            <GraduationCap className="h-6 w-6" />
            <span className="font-mono font-bold text-xl">Last Minute Prep</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/generate-mcq" className="text-sm font-medium transition-colors hover:text-primary">
              Practice
            </Link>
            <Link href="/tutorial" className="text-sm font-medium transition-colors hover:text-primary">
              Tutorial
            </Link>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
}