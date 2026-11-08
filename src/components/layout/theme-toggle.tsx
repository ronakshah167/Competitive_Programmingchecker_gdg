'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      if (stored === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to dark mode as preferred
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={`h-9 w-9 rounded-full border border-border/60 ${className ?? ''}`}
        aria-label="Toggle theme"
      >
        <Moon className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={`relative h-9 w-9 rounded-full border border-border/60 hover:bg-accent/20 hover:text-accent hover:border-accent/40 transition-all duration-300 ${className ?? ''}`}
      title={theme === 'dark' ? 'Switch to Cream Light mode' : 'Switch to Burgundy Dark mode'}
      aria-label="Toggle theme"
    >
      <Sun
        className={`h-4 w-4 text-amber-500 transition-all duration-300 ${
          theme === 'dark' ? 'scale-0 rotate-90 opacity-0 absolute' : 'scale-100 rotate-0 opacity-100'
        }`}
      />
      <Moon
        className={`h-4 w-4 text-dustyPink-400 transition-all duration-300 ${
          theme === 'dark' ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0 absolute'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
