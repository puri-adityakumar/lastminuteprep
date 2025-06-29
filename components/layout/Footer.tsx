import { Github } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t mt-auto bg-[#F1F0E8] dark:bg-black">
      <div className="container h-14">
        <div className="h-full flex items-center justify-center gap-6">
          <p className="text-sm text-muted-foreground">
            Made with fear of exams 📚
          </p>
          <Link
            href="https://github.com/puri-adityakumar/cramjam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center space-x-2"
          >
            <Github className="h-4 w-4" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}