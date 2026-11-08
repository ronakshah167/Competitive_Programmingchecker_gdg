'use client';

import * as React from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
  variant?: 'ghost' | 'outline' | 'default' | 'secondary';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export function CopyButton({
  text,
  label,
  className,
  variant = 'ghost',
  size = 'icon',
}: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard', err);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleCopy}
      className={cn(
        'group relative transition-all duration-200 hover:scale-105 active:scale-95',
        copied
          ? 'text-emerald-500 hover:text-emerald-600 bg-emerald-500/10'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/20',
        className
      )}
      title={copied ? 'Copied to clipboard!' : 'Copy to clipboard'}
      aria-label={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="h-4 w-4 text-emerald-400 animate-in zoom-in-75 duration-200" />
      ) : (
        <Copy className="h-4 w-4 transition-transform group-hover:scale-110" />
      )}
      {label && <span className="ml-1.5 text-xs font-medium">{copied ? 'Copied!' : label}</span>}
      <span className="sr-only">{copied ? 'Copied' : 'Copy'}</span>
    </Button>
  );
}
