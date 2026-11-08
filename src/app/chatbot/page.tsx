import { ChatInterface } from '@/components/chatbot/chat-interface';
import { Bot, Sparkles } from 'lucide-react';

export default function ChatbotPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-dustyPink/25 text-xs font-semibold uppercase tracking-wider text-primary mb-4 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-dustyPink-500" />
          <span>Interactive AI Coding Mentor</span>
        </div>
        <h1 className="font-headline text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
          AI Chatbot
        </h1>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Your personal 24/7 competitive programming mentor powered by Gemini AI. Ask for conceptual hints, algorithm walkthroughs, and code debugging.
        </p>
      </header>
      <ChatInterface />
    </div>
  );
}
