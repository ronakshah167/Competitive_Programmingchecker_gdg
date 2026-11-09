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

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 transition-all duration-300 pointer-events-none',
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'invisible opacity-0 translate-y-4'
      )}
    >
      <Button
        onClick={scrollToTop}
        size="icon"
        className="h-11 w-11 rounded-full border border-primary bg-primary text-primary-foreground shadow-lg hover:bg-primary hover:shadow-xl"
        aria-label="Scroll back to top"
        title="Back to top"
      >
        <ArrowUp className="h-5 w-5" strokeWidth={2.75} aria-hidden="true" />
      </Button>
    </div>
  );
}
