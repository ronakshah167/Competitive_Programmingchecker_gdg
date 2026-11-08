'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Bot, User, Send, Sparkles, Trash2, Code2, ArrowUpRight } from 'lucide-react';
import { aiCodingAssistant } from '@/ai/flows/ai-coding-assistant';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CopyButton } from '@/components/shared/copy-button';

const chatSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty.'),
});

type ChatFormValues = z.infer<typeof chatSchema>;

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

const starterPrompts = [
  'How do I optimize Two Sum to O(N) using a Hash Map?',
  'Explain recursion vs iteration with a simple Python example',
  'What is the difference between BFS and DFS?',
  'Tips for debugging Time Limit Exceeded (TLE) in Codeforces',
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Hello! I am your AI Coding Assistant powered by Google Gemini. Ask me about algorithms, data structures, code debugging, or competitive programming concepts.',
      timestamp: 'Just now',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  const form = useForm<ChatFormValues>({
    resolver: zodResolver(chatSchema),
    defaultValues: { message: '' },
  });

  useEffect(() => {
    if (scrollViewportRef.current) {
      const { scrollHeight } = scrollViewportRef.current;
      scrollViewportRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMessage: Message = { role: 'user', content: text.trim(), timestamp: timeStr };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    form.reset({ message: '' });

    try {
      const result = await aiCodingAssistant({ query: text.trim() });
      const assistantMessage: Message = {
        role: 'assistant',
        content: result.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: 'assistant',
        content:
          'Sorry, I encountered an issue connecting to the AI service. Please make sure the API key is active or try asking again.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(values: ChatFormValues) {
    sendMessage(values.message);
  }

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Chat cleared! How can I assist you with your code today?',
        timestamp: 'Just now',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-[75vh] max-h-[800px] rounded-2xl border border-dustyPink/30 bg-card/85 shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 backdrop-blur-md overflow-hidden">
      {/* Chat Header Bar */}
      <div className="flex items-center justify-between px-6 py-3.5 border-b border-border/50 bg-muted/20">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-9 w-9 rounded-xl bg-primary/15 border border-dustyPink/30 flex items-center justify-center text-primary">
              <Bot className="h-5 w-5" />
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-background" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-semibold text-foreground font-headline">Gemini Coding Assistant</h2>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-dustyPink/20">
                Gemini 3.5 Active
              </span>
            </div>
            <p className="text-xs text-muted-foreground">Always ready to evaluate and guide</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {messages.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearChat}
              className="text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors h-8"
              title="Clear conversation"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Messages Scroll Area */}
      <ScrollArea className="flex-1" viewportClassName="p-6" viewportRef={scrollViewportRef}>
        <div className="space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                'flex items-start gap-3.5 animate-in fade-in slide-in-from-bottom-3 duration-300',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <Avatar className="h-9 w-9 border border-dustyPink/30 shrink-0 mt-0.5 shadow-sm">
                  <AvatarFallback className="bg-primary/15 text-primary">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="group relative max-w-[85%] sm:max-w-[75%] flex flex-col">
                <div
                  className={cn(
                    'rounded-2xl px-4 py-3 text-sm shadow-sm transition-all duration-200',
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-primary via-burgundy-700 to-burgundy-800 text-primary-foreground rounded-tr-sm shadow-primary/20'
                      : 'bg-card border border-border/70 text-card-foreground rounded-tl-sm hover:border-dustyPink/30'
                  )}
                >
                  <div className="whitespace-pre-wrap font-body leading-relaxed text-[13.5px] sm:text-sm">
                    {message.content}
                  </div>
                </div>

                {/* Message footer & copy button */}
                <div
                  className={cn(
                    'flex items-center gap-2 mt-1 px-1 text-[11px] text-muted-foreground',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.timestamp && <span>{message.timestamp}</span>}
                  <CopyButton
                    text={message.content}
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>

              {message.role === 'user' && (
                <Avatar className="h-9 w-9 border border-border/60 shrink-0 mt-0.5 shadow-sm">
                  <AvatarFallback className="bg-secondary text-foreground">
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-start gap-3.5 animate-in fade-in duration-300">
              <Avatar className="h-9 w-9 border border-dustyPink/30 shrink-0 shadow-sm">
                <AvatarFallback className="bg-primary/15 text-primary">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-card border border-dustyPink/30 shadow-sm flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 rounded-full bg-dustyPink-500 animate-bounce [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 rounded-full bg-primary/70 animate-bounce" />
                </div>
                <span className="text-xs text-muted-foreground font-medium">Gemini is writing...</span>
              </div>
            </div>
          )}
        </div>

        {/* Starter Prompts chips when conversation is fresh */}
        {messages.length === 1 && !isLoading && (
          <div className="mt-8 pt-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-3 px-1">
              <Sparkles className="h-3.5 w-3.5 text-dustyPink-500" />
              <span>Try asking about:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {starterPrompts.map((prompt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  className="group flex items-center justify-between text-left p-3 rounded-xl border border-border/60 bg-muted/20 hover:bg-primary/10 hover:border-dustyPink/50 transition-all duration-200 text-xs text-foreground hover:text-primary"
                >
                  <span className="line-clamp-2 leading-relaxed">{prompt}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0 ml-2" />
                </button>
              ))}
            </div>
          </div>
        )}
      </ScrollArea>

      {/* Input Bar */}
      <div className="border-t border-border/50 p-4 bg-card/90 backdrop-blur-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      placeholder="Ask a coding question, hint, or debugging assistance..."
                      autoComplete="off"
                      className="bg-muted/30 border-border/70 focus-visible:ring-dustyPink-400 focus-visible:border-primary text-sm h-11 px-4 rounded-xl transition-all"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !form.watch('message')?.trim()}
              className="h-11 w-11 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground shadow-md shadow-primary/20 hover:scale-105 active:scale-95 transition-all duration-200 shrink-0"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
