'use client';

import * as React from 'react';
import { ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ScrollToTop() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 transition-all duration-300 pointer-events-none',
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4'
      )}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-11 w-11 rounded-full shadow-xl bg-gradient-to-br from-primary via-burgundy-600 to-dustyPink-700 text-primary-foreground border border-dustyPink-400/40 hover:scale-110 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 transition-all duration-300 group"
        aria-label="Scroll back to top"
        title="Back to top"
      >
        <ArrowUp className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
      </Button>
    </div>
  );
}
