'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code2, LogOut, Menu } from 'lucide-react';
import { useUser, useAuth } from '@/firebase';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';
import { ThemeToggle } from './theme-toggle';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Evaluate', href: '/evaluate' },
  { name: 'Leaderboard', href: '/leaderboard' },
  { name: 'CP Tracker', href: '/cp-tracker' },
  { name: 'Chatbot', href: '/chatbot' },
  { name: 'Profile', href: '/profile' },
];

export default function Header() {
  const pathname = usePathname();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (auth) {
      auth.signOut();
    }
  };

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          onClick={() => setIsMobileMenuOpen(false)}
          className={cn(
            'relative transition-colors hover:text-primary',
            'md:py-2',
            pathname === item.href ? 'text-foreground font-semibold' : 'text-muted-foreground',
            'after:content-[""] after:absolute after:left-0 after:bottom-0 md:after:-bottom-1.5 after:h-[2px] after:w-full after:bg-primary after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100',
            pathname === item.href && 'after:scale-x-100'
          )}
        >
          {item.name}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 flex flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Code2 className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline inline-block text-lg">
              ALL IN
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <NavLinks />
          </nav>
        </div>
        <div className="flex items-center justify-end gap-2.5">
          <ThemeToggle />
          {!isUserLoading && (
            <>
              {user ? (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="hover:bg-primary/10 hover:text-primary transition-all duration-200"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              ) : (
                <Button
                  asChild
                  size="sm"
                  className="hidden sm:flex bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-md shadow-primary/20 hover:scale-105 transition-all duration-200"
                >
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </>
          )}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden hover:bg-accent/20">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-r border-border/60 bg-card/95 backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="flex items-center space-x-2">
                  <Code2 className="h-6 w-6 text-primary" />
                  <span className="font-bold font-headline inline-block text-lg">ALL IN</span>
                </Link>
              </div>
              <nav className="flex flex-col gap-4 text-lg">
                <NavLinks />
                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground font-medium">Theme</span>
                  <ThemeToggle />
                </div>
                 {!isUserLoading && !user && (
                    <Button asChild size="sm" className="mt-4 bg-primary text-primary-foreground font-semibold">
                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                    </Button>
                )}
                 {!isUserLoading && user && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="mt-4 border-primary/30 text-primary hover:bg-primary/10"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </Button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
