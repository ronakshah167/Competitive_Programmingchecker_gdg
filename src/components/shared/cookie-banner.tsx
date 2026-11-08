'use client';

import * as React from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function CookieBanner() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const consent = localStorage.getItem('allin-cookie-consent');
    if (!consent) {
      // Small timeout to give smooth entrance after initial mount
      const timer = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'essential') => {
    localStorage.setItem('allin-cookie-consent', choice);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className={cn(
        'fixed bottom-4 left-4 right-4 md:left-8 md:max-w-lg z-50 animate-in fade-in slide-in-from-bottom-8 duration-500'
      )}
    >
      <div className="relative rounded-2xl border border-dustyPink/30 bg-card/95 backdrop-blur-md p-5 shadow-2xl shadow-burgundy-950/20 dark:shadow-black/60">
        <button
          onClick={() => handleConsent('essential')}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-muted/40"
          aria-label="Close cookie banner"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex items-start gap-3.5 pr-6">
          <div className="rounded-xl bg-primary/10 p-2.5 text-primary ring-1 ring-dustyPink/20 flex-shrink-0">
            <Cookie className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-headline font-semibold text-foreground text-sm flex items-center gap-1.5">
              <span>We value your privacy</span>
              <ShieldCheck className="h-3.5 w-3.5 text-dustyPink-500" />
            </h3>
            <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
              We use minimal cookies and local storage to personalize code feedback, save your dark/light mode preference, and improve your developer experience.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2.5 pt-2 border-t border-border/40">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleConsent('essential')}
            className="text-xs hover:bg-muted/50 text-muted-foreground hover:text-foreground h-8"
          >
            Essential Only
          </Button>
          <Button
            size="sm"
            onClick={() => handleConsent('accepted')}
            className="text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm shadow-primary/20 hover:scale-105 transition-all duration-200 h-8 px-4"
          >
            Accept All
          </Button>
        </div>
      </div>
    </div>
  );
}
